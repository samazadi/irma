import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { pathParameters } = _event;
        
        const bookService = new BookService();
        const bookActivities = await bookService.getActivities(pathParameters?.bookId);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({
                ...bookActivities
            })
        };
    } catch (error) {
        console.error(`Error in getBookActivities: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}