import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { exists } from 'fs';
import dbClient from '../clients/dbClient';
import { Actions, Activity, Book, GetActivitiesResponse, ScanResponse, SearchResults, SearchTypeValues, Status } from '../models/Book';

export default class BookRepository {
    /**
     *
     */
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

    async put(book: Book): Promise<Book> {
        await this.documentClient.put({
            TableName: this.irmaTable,
            Item: book
        }).promise();

        return book;
    }

    async update(id: string, action: Actions): Promise<Book> {
        const newStatus: Status = action === "check-in" ? "available" : "checked-out";

        const updated = await this.documentClient.update({
            TableName: this.irmaTable,
            Key: { 'id': id },
            UpdateExpression: 'SET #st = :value',
            ExpressionAttributeValues: {
                ':value': newStatus
            },
            ExpressionAttributeNames: {
                "#st": "status"
            },
            ReturnValues: 'ALL_NEW'
        }).promise();

        console.log("the updated value", updated)

        return updated.Attributes as Book;
    }

    async delete(id: string): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput | AWS.AWSError> {
        return this.documentClient.delete({
            TableName: this.irmaTable,
            Key: { 'id': id }
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