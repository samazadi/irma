import { Book, SearchTypeValues } from "../types"

export const searchForBook = (searchInput: string, searchType: SearchTypeValues): Book[] => {
    console.log("The search input:", searchInput, searchType)
    // make some api call here
    const books: Book[] = [
        {
            id: "1",
            title: "Title 1",
            author: "my author name",
            isbn: "1234",
            description: "some description"
        },
        {
            id: "2",
            title: "Title 2",
            author: "my author name2",
            isbn: "5678",
            description: "some description 2"
        },
        {
            id: "3",
            title: "Title 3",
            author: "my author name3",
            isbn: "9101",
            description: "some description 3"
        }
    ]
    
    return books;
}