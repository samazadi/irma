export type SearchTypeValues = "title" | "isbn" | "id" | "author";

export const SearchTypes: { [key: string]: SearchTypeValues } = {
    TITLE: "title",
    ISBN: "isbn",
    ID: "id",
    AUTHOR: "author"
}

export interface SearchParams {
    searchString: string;
    searchType: SearchTypeValues;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    status: "checked-out" | "available"
}

export type DonationFormValues = {
    title: string,
    author: string,
    isbn: string,
    description: string
}

export interface Activity {
    id: string;
    bookId: string;
    title: string;
    isbn: string;
    date: string;
    action: "check-out" | "check-in"
}

export interface ScanResponse {
    LastEvaluatedKey: { [id: string]: string };
    Books: Book[];
}

export interface GetActivitiesResponse {
    LastEvaluatedKey: { [id: string]: string };
    Activities: Activity[];
}

export interface UpdateBookParams {
    id: string;
    action: "check-out" | "check-in"
}