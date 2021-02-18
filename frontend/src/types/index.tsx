export type SearchTypeValues = "title" | "isbn" | "id";

export const SearchTypes: { [key: string]: SearchTypeValues } = {
    TITLE: "title",
    ISBN: "isbn",
    ID: "id"
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
    // status: "checked-out" | "available"
}