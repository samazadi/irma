import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dbClient from '../clients/dbClient';
import { Book } from '../models/Book';

export default class BookRepository {
    /**
     *
     */
    constructor(private readonly documentClient: DocumentClient = dbClient(), private readonly irmaTable = process.env.IRMA_DDB_TABLE) { }

    async scan(): Promise<Book[]> {
        const result = await this.documentClient.scan({
            TableName: this.irmaTable
        }).promise();

        return result.Items as Book[];
    }

    async put(book: Book): Promise<Book> {
        await this.documentClient.put({
            TableName: this.irmaTable,
            Item: book
        }).promise();

        return book;
    }

    async update(book: Partial<Book>): Promise<Book> {
        const updated = await this.documentClient.update({
            TableName: this.irmaTable,
            Key: { 'id': book.id },
            UpdateExpression: 'set #title = :title, author = :author, isbn = :isbn, description = :description',
            // ExpressionAttributeNames: {
            //     '#title': 'title'
            // },
            ExpressionAttributeValues: {
                ':title': book.title,
                ':author': book.author,
                ':isbn': book.isbn,
                ':description': book.description
            },
            ReturnValues: 'ALL_NEW'
        }).promise();

        return updated.Attributes as Book;
    }

    async delete(id: string): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput | AWS.AWSError> {
        return this.documentClient.delete({
            TableName: this.irmaTable,
            Key: { 'id': id }
        }).promise();
    }
}