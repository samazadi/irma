import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as uuid from 'uuid';
import { Book } from '../models/Book';
import dbClient from '../client/dbClient';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { title, author, isbn, description } = JSON.parse(event.body);

        const id = uuid.v4();
        const book: Book = {
            id,
            title,
            author,
            isbn,
            description
        }

        const docClient = dbClient();
        await docClient.put({
            TableName: process.env.IRMA_DDB_TABLE,
            Item: book
        }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({ book }, null, 2)
        };
    } catch (error) {
        console.error(`Error in createBook: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}