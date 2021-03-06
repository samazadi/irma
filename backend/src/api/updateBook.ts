import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';
import { generateEmptyBook, getResponseHeaders, instanceOfA } from '../util';
import { Book } from '../models';

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { id, action } = JSON.parse(event.body);

        const bookService = new BookService();
        const updatedBook = await bookService.update(id, action);

        if (!instanceOfA<Book>(generateEmptyBook(), Object.keys(updatedBook))) {
            throw updatedBook;
        }

        return {
            statusCode: 200,
            headers: getResponseHeaders(),
            body: JSON.stringify(updatedBook)
        }
    } catch (error) {
        console.error(`Error in updateBook: ${error}`);
        return {
            statusCode: 500,
            headers: getResponseHeaders(),
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}