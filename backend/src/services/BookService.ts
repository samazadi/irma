import * as uuid from 'uuid';
import BookRepository from '../repositories/BookRepository';
import { Actions, Activity, Book, GetActivitiesResponse, ScanResponse, SearchTypeValues } from '../models';

export default class BookService {
    bookRepostiroy: BookRepository;

    constructor(bookRepository: BookRepository = new BookRepository()) {
        this.bookRepostiroy = bookRepository;
    }

    async get(lastEvaluatedKey?: string): Promise<ScanResponse> {
        return this.bookRepostiroy.scan(lastEvaluatedKey);
    }

    async getActivities(bookId: string): Promise<GetActivitiesResponse> {
        return this.bookRepostiroy.getActivities(bookId);
    }

    async searchBooks(searchSring: string, searchType: SearchTypeValues): Promise<any> {
        return this.bookRepostiroy.searchBooks(searchSring, searchType);
    }

    async put(title: string, author: string, isbn: string, description: string): Promise<Book> {
        const bookId = uuid.v4();
        const activityId = uuid.v4();

        const bookValues: Book = {
            id: bookId,
            title,
            author,
            isbn,
            description,
            status: "available"
        }

        const bookActivity: Activity = {
            id: activityId,
            bookId,
            title,
            isbn,
            date: new Date().toUTCString(),
            action: "donation"
        }

        return await this.bookRepostiroy.put(bookValues, bookActivity);
    }

    async update(id: string, action: Actions) {
        return await this.bookRepostiroy.update(id, action);
    }

    async delete(id: string) {
        return await this.bookRepostiroy.delete(id);
    }
}