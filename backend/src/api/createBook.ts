import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';
import BookService from '../services/BookService';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { title, author, isbn, description } = JSON.parse(event.body);

        const bookService = new BookService();
        const book = await bookService.put(title, author, isbn, description);

        return {
            statusCode: 200,
            body: JSON.stringify(book, null, 2)
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