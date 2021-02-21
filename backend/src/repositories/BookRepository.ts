import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import dbClient from '../clients/dbClient';
import * as uuid from 'uuid';
import { Actions, Activity, Book, GetActivitiesResponse, ScanResponse, SearchParamGeneratorResponse, SearchResults, SearchTypeValues, Status } from '../models/Book';

export default class BookRepository {
    constructor(
        private readonly documentClient: DocumentClient = dbClient(),
        private readonly irmaTable = process.env.IRMA_DDB_TABLE,
        private readonly irmaActivitiesTable = process.env.IRMA_ACTIVITIES_DDB_TABLE
    ) { }

    async scan(lastEvaluatedKey?: string): Promise<ScanResponse> {
        let params: DocumentClient.ScanInput = {
            TableName: this.irmaTable,
            Limit: 6
        }

        // If we receive a lastEvaluatedKey, we include it in params
        // as starting point of the scan for pagination.
        if (lastEvaluatedKey) {
            params = { ...params, ExclusiveStartKey: { id: lastEvaluatedKey } }
        }

        const result = await this.documentClient.scan(params).promise();

        return {
            LastEvaluatedKey: result.LastEvaluatedKey,
            Books: result.Items as Book[]
        }
    }

    async getActivities(bookId: string): Promise<GetActivitiesResponse> {
        const params: DocumentClient.QueryInput = {
            TableName: this.irmaActivitiesTable,
            IndexName: 'BookIdIndex',
            KeyConditionExpression: "bookId = :bookId",
            ExpressionAttributeValues: {
                ":bookId": bookId
            },
            Limit: 1000,
            Select: 'ALL_ATTRIBUTES'
        }

        const result = await this.documentClient.query(params).promise();

        return {
            LastEvaluatedKey: result.LastEvaluatedKey,
            Activities: result.Items as Activity[]
        };
    }

    async searchBooks(searchString: string, searchType: SearchTypeValues): Promise<Book[]> {
        const params: SearchParamGeneratorResponse = this.searchBookQueryParamGenerator(searchString, searchType);
        let result = await this.documentClient.query(params.queryParams).promise();
        if (!result.Items?.length) {
            result = await this.documentClient.scan(params.scanParams).promise();
        }

        return result.Items as Book[]
    }

    async put(book: Book, activity: Activity): Promise<Book> {
        await this.createActivityForBook(activity);

        await this.documentClient.put({
            TableName: this.irmaTable,
            Item: book
        }).promise();

        return book;
    }

    async update(id: string, action: Actions): Promise<Book | AWS.AWSError> {
        const newStatus: Status = action === "check-in" ? "available" : "checked-out";

        const book = await (await this.getBookById(id)).Items[0] as Book;

        const { title, isbn } = book;
        const activityId = uuid.v4();

        const activity: Activity = {
            id: activityId,
            bookId: id,
            title,
            isbn,
            date: new Date().toUTCString(),
            action
        }

        await this.createActivityForBook(activity);

        const params: DocumentClient.UpdateItemInput = {
            TableName: this.irmaTable,
            Key: { 'id': id },
            UpdateExpression: 'SET #st = :value',
            ConditionExpression: '#st = :status',
            ExpressionAttributeValues: {
                ':value': newStatus,
                ':status': action === "check-in" ? "checked-out" : "available" // confirm the user can take action on this book
            },
            ExpressionAttributeNames: {
                "#st": "status"
            },
            ReturnValues: 'ALL_NEW'
        }

        let updated = null as PromiseResult<AWS.DynamoDB.DocumentClient.UpdateItemOutput, AWS.AWSError>

        try {
            updated = await this.documentClient.update(params).promise();
        } catch (error) {
            return error as AWS.AWSError;
        }

        return updated.Attributes as Book;
    }

    async delete(id: string): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput | AWS.AWSError> {
        return this.documentClient.delete({
            TableName: this.irmaTable,
            Key: { 'id': id }
        }).promise();
    }

    private getBookById(id: string) {
        const params: SearchParamGeneratorResponse = this.searchBookQueryParamGenerator(id, "id");

        return this.documentClient.query(params.queryParams).promise();
    }

    private createActivityForBook(activity: Activity) {
        return this.documentClient.put({
            TableName: this.irmaActivitiesTable,
            Item: activity
        }).promise();
    }

    private searchBookQueryParamGenerator(searchString: string, searchType: SearchTypeValues): SearchParamGeneratorResponse {
        const baseParams: DocumentClient.QueryInput = {
            TableName: this.irmaTable,
            Limit: 1000,
            Select: 'ALL_ATTRIBUTES'
        }

        let queryParams = {};
        let scanParams = {};
        switch (searchType) {
            case "author":
                queryParams = {
                    IndexName: 'AuthorIndex',
                    KeyConditionExpression: 'author = :author',
                    ExpressionAttributeValues: {
                        ':author': searchString
                    },
                }
                scanParams = {
                    FilterExpression: "contains(#author, :author_name)",
                    ExpressionAttributeNames: {
                        "#author": "author",
                    },
                    ExpressionAttributeValues: {
                        ":author_name": searchString,
                    }
                }
                break;

            case "id":
                queryParams = {
                    KeyConditionExpression: 'id = :id',
                    ExpressionAttributeValues: {
                        ':id': searchString
                    }
                }
                scanParams = {
                    FilterExpression: "contains(#id, :id)",
                    ExpressionAttributeNames: {
                        "#id": "id",
                    },
                    ExpressionAttributeValues: {
                        ":id": searchString,
                    }
                }
                break;

            case "isbn":
                queryParams = {
                    IndexName: 'IsbnIndex',
                    KeyConditionExpression: 'isbn = :isbn',
                    ExpressionAttributeValues: {
                        ':isbn': searchString
                    },
                }
                scanParams = {
                    FilterExpression: "contains(#isbn, :isbn)",
                    ExpressionAttributeNames: {
                        "#isbn": "isbn",
                    },
                    ExpressionAttributeValues: {
                        ":isbn": searchString,
                    }
                }
                break;

            case "title":
                queryParams = {
                    IndexName: 'TitleIndex',
                    KeyConditionExpression: 'title = :title',
                    ExpressionAttributeValues: {
                        ':title': searchString
                    },
                }
                scanParams = {
                    FilterExpression: "contains(#title, :title)",
                    ExpressionAttributeNames: {
                        "#title": "title",
                    },
                    ExpressionAttributeValues: {
                        ":title": searchString,
                    }
                }
                break;

            default:
                queryParams = {
                    KeyConditionExpression: 'id = :id',
                    ExpressionAttributeValues: {
                        ':id': searchString
                    }
                }
                scanParams = {
                    FilterExpression: "contains(#id, :id)",
                    ExpressionAttributeNames: {
                        "#id": "id",
                    },
                    ExpressionAttributeValues: {
                        ":id": searchString,
                    }
                }
                break;
        }

        return {
            queryParams: { ...baseParams, ...queryParams },
            scanParams: { ...baseParams, ...scanParams }
        };
    }
}