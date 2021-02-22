import { Book } from "../models";

export const instanceOfA = <T>(object: T, membersToTest: string[]): boolean => {
    if (!membersToTest.length || membersToTest.some(member => !(member in object))) return false;
    return true;
};

export const generateEmptyBook = () => {
    return {
        id: "",
        title: "",
        author: "",
        isbn: "",
        description: "",
        status: "available"
    } as Book;
}