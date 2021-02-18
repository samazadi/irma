export type SearchTypeValues = "TITLE" | "ISBN" | "ID";

export const SearchTypes: { [key: string]: SearchTypeValues } = {
    TITLE: "TITLE",
    ISBN: "ISBN",
    ID: "ID"
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