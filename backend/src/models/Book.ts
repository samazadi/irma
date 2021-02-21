import { DocumentClient } from "aws-sdk/clients/dynamodb";

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    status: Status
}

export interface SearchResults extends Book {
    stock?: number;
}

export type Status = "checked-out" | "available"

export interface ScanResponse {
    LastEvaluatedKey: { [id: string]: string };
    Books: Book[];
}

export interface Activity {
    id: string;
    bookId: string;
    title: string;
    isbn: string;
    date: string;
    action: Actions
}

export interface GetActivitiesResponse {
    LastEvaluatedKey: { [id: string]: string };
    Activities: Activity[];
}

export type Actions = "check-out" | "check-in" | "donation"

export type SearchTypeValues = "title" | "isbn" | "id" | "author";

export interface SearchParamGeneratorResponse {
    queryParams: DocumentClient.QueryInput,
    scanParams: DocumentClient.ScanInput
}