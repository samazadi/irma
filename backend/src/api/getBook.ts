import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { pathParameters } = _event;

        console.log(pathParameters)

        const bookService = new BookService();
        const books = await bookService.get(pathParameters?.lastEvaluatedKey);

        return {
            statusCode: 200,
            body: JSON.stringify({
                ...books
            })
        };
    } catch (error) {
        console.error(`Error in getBook: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}