import * as AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import * as uuid from 'uuid';
import { Book } from '../models/Book';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const { title, author, isbn, description } = JSON.parse(event.body);

    const id = uuid.v4();
    const book: Book = {
        id,
        title,
        author,
        isbn,
        description
    }

    const docClient = new AWS.DynamoDB.DocumentClient();
    await docClient.put({
        TableName: process.env.IRMA_DDB_TABLE,
        Item: book
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({ book }, null, 2)
    };
}
