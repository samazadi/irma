import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, action } = JSON.parse(event.body);

        console.log("body:", event.body)

        const bookService = new BookService();
        const updatedBook = await bookService.update(id, action);

        return {
            statusCode: 200,
            body: JSON.stringify({
                book: updatedBook
            })
        }
    } catch (error) {
        console.error(`Error in updateBook: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}