import 'source-map-support/register';
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import BookService from '../services/BookService';
import { SearchTypeValues } from '../models/Book';

export const handler: APIGatewayProxyHandler = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { path } = _event;

        const pathParts = path.split('/');
        const pathPartsLen = pathParts.length;
        const searchString: string = decodeURI(pathParts[pathPartsLen - 1]);
        const searchType: SearchTypeValues = pathParts[pathPartsLen - 2] as SearchTypeValues;

        const bookService = new BookService();
        const books = await bookService.searchBooks(searchString, searchType);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify(books)
        };
    } catch (error) {
        console.error(`Error in search: ${error}`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message || "Something went wrong..."
            })
        }
    }
}