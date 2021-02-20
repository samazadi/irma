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

export type Actions = "check-out" | "check-in"

export type SearchTypeValues = "title" | "isbn" | "id" | "author";