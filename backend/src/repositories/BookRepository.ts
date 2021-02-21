import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import dbClient from '../clients/dbClient';
import * as uuid from 'uuid';
import { Actions, Activity, Book, GetActivitiesResponse, ScanResponse, SearchResults, SearchTypeValues, Status } from '../models/Book';

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
        const params: DocumentClient.QueryInput = this.searchBookQueryParamGenerator(searchString, searchType);
        const result = await this.documentClient.query(params).promise();


        // TODO: get the results from the helper function for mapping

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
        let params = this.searchBookQueryParamGenerator(id, "id");
        
        return this.documentClient.query(params).promise();
    }

    private createActivityForBook(activity: Activity) {
        return this.documentClient.put({
            TableName: this.irmaActivitiesTable,
            Item: activity
        }).promise();
    }

    private transformSearchResults(results: Book[]): SearchResults[] {
        let transformedMap = {};
        const searchResults: SearchResults[] = results;

        searchResults.forEach(book => {
            if (book.status !== 'available') return;
            const existsInMap = !!transformedMap[book.isbn];

            if (!existsInMap) {
                book.stock = 1;
                transformedMap[book.isbn] = book;
            } else {
                transformedMap[book.isbn].stock += 1;
            }
        })
        // TODO: return the mapp results not the arr
        // and cast book to search results instead of reassign
        return searchResults;
    }

    private searchBookQueryParamGenerator(searchString: string, searchType: SearchTypeValues): DocumentClient.QueryInput {
        const baseParams: DocumentClient.QueryInput = {
            TableName: this.irmaTable,
            Limit: 1000,
            Select: 'ALL_ATTRIBUTES'
        }

        let params = {};
        switch (searchType) {
            case "author":
                params = {
                    IndexName: 'AuthorIndex',
                    KeyConditionExpression: 'author = :author',
                    ExpressionAttributeValues: {
                        ':author': searchString
                    },
                }
                break;

            case "id":
                params = {
                    KeyConditionExpression: 'id = :id',
                    ExpressionAttributeValues: {
                        ':id': searchString
                    }
                };
                break;

            case "isbn":
                params = {
                    IndexName: 'IsbnIndex',
                    KeyConditionExpression: 'isbn = :isbn',
                    ExpressionAttributeValues: {
                        ':isbn': searchString
                    },
                }
                break;

            case "title":
                params = {
                    IndexName: 'TitleIndex',
                    KeyConditionExpression: 'title = :title',
                    ExpressionAttributeValues: {
                        ':title': searchString
                    },
                }
                break;

            default:
                params = {
                    KeyConditionExpression: 'id = :id',
                    ExpressionAttributeValues: {
                        ':id': searchString
                    }
                };
                break;
        }

        return { ...baseParams, ...params };
    }
}