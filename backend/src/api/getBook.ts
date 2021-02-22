import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';
import { getResponseHeaders } from '../util';

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { pathParameters } = _event;
        
        const bookService = new BookService();
        const books = await bookService.get(pathParameters?.id);

        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: JSON.stringify({
                ...books
            })
        };
    } catch (error) {
        console.error(`Error in getBook: ${error}`);
        return {
            statusCode: 500,
            headers: getResponseHeaders(),
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}