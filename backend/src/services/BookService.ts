import * as uuid from 'uuid';
import BookRepository from '../repositories/BookRepository';
import { Actions, Book, GetActivitiesResponse, ScanResponse } from '../models/Book';

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

    async put(title: string, author: string, isbn: string, description: string): Promise<Book> {
        const id = uuid.v4();

        return await this.bookRepostiroy.put({
            id,
            title,
            author,
            isbn,
            description,
            status: "available"
        });
    }

    async update(id: string, action: Actions) {
        return await this.bookRepostiroy.update(id, action);
    }

    async delete(id: string) {
        return await this.bookRepostiroy.delete(id);
    }
}