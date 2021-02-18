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
    // status: "checked-out" | "available"
}

export type DonationFormValues = {
    title: string,
    author: string,
    isbn: string,
    description: string
}