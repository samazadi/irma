import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';
import { getResponseHeaders } from '../util';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;

        const bookService = new BookService();
        await bookService.delete(id);

        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: 'OK'
        }
    } catch (error) {
        console.error(`Error in deleteBook: ${error}`);
        return {
            statusCode: 500,
            headers: getResponseHeaders(),
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}