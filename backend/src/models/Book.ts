export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    // status: "checked-out" | "available"
}

export interface ScanResponse {
    LastEvaluatedKey: { [id: string]: string };
    Books: Book[];
}