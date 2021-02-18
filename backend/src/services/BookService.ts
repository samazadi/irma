import * as uuid from 'uuid';
import BookRepository from '../repositories/BookRepository';
import { Book } from '../models/Book';

export default class BookService {
    bookRepostiroy: BookRepository;

    constructor(bookRepository: BookRepository = new BookRepository()) {
        this.bookRepostiroy = bookRepository;
    }

    async get(): Promise<Book[]> {
        return this.bookRepostiroy.scan();
    }

    async put(title: string, author: string, isbn: string, description: string): Promise<Book> {
        const id = uuid.v4();

        return await this.bookRepostiroy.put({
            id,
            title,
            author,
            isbn,
            description
        });
    }

    async update(book: Partial<Book>) {
        return await this.bookRepostiroy.update(book);
    }

    async delete(id: string) {
        return await this.bookRepostiroy.delete(id);
    }
}