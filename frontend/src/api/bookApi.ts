import { ScanResponse, GetActivitiesResponse, DonationFormValues, UpdateBookParams, SearchTypeValues } from '../types';
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

export const donateBook = (bookDetails: DonationFormValues): Promise<void> => {
    const params: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ ...bookDetails })
    }
    return fetch(apiUrl, params)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong making a donation...', error));
}

export const returnBook = (update: UpdateBookParams): Promise<void> => {
    const params: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ ...update })
    }

    return fetch(`${apiUrl}/update`, params)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong returning a book...', error));
}

export const searchForBook = (searchString: string, searchType: SearchTypeValues) => {
    console.log("hit", searchString, searchType);
    return fetch(`${apiUrl}/${searchType}/${searchString}`)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong...', error));
}