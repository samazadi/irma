import { Book } from "../models";

export const instanceOfA = <T>(object: T, membersToTest: string[]): boolean => {
    if (!membersToTest.length || membersToTest.some(member => !(member in object))) return false;
    return true;
};

export const generateEmptyBook = (): Book => {
    return {
        id: "",
        title: "",
        author: "",
        isbn: "",
        description: "",
        status: "available"
    } as Book;
}

export const getResponseHeaders = (): { [header: string]: string | number | boolean; } => {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
    }
}