import { ScanResponse, GetActivitiesResponse, DonationFormValues, UpdateBookParams, SearchTypeValues, Book } from '../types';
import { apiUrl } from '../config';

export const getBooks = (lastEvaluatedKey?: string): Promise<ScanResponse> => {
    const url = lastEvaluatedKey ? `${apiUrl}/${lastEvaluatedKey}` : apiUrl;
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong...', error));
}

export const getBookActivities = (id: string): Promise<GetActivitiesResponse> => {
    return fetch(`${apiUrl}/activities/${id}`)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong getting activities...', error));
}

export const donateBook = (bookDetails: DonationFormValues): Promise<Book> => {
    const params: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ ...bookDetails })
    }
    return fetch(apiUrl, params)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong making a donation...', error));
}

export const returnOrBorrowBook = (update: UpdateBookParams): Promise<Book> => {
    const params: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ ...update })
    }

    return fetch(`${apiUrl}/update`, params)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong returning a book...', error));
}

export const searchForBook = (searchString: string, searchType: SearchTypeValues): Promise<Book[]> => {
    return fetch(`${apiUrl}/search/${searchType}/${searchString}`)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong...', error));
}