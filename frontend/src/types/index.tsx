export type SearchTypeValues = "title" | "isbn" | "id";

export const SearchTypes: { [key: string]: SearchTypeValues } = {
    TITLE: "title",
    ISBN: "isbn",
    ID: "id"
}