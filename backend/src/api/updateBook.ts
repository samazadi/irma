import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';
import { Book } from '../models/Book';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id;

        const bookService = new BookService();
        const book: Partial<Book> = { ...JSON.parse(event.body), id }

        const updatedBook = await bookService.update(book);

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