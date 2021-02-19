import { ScanResponse } from '../types';
import { apiUrl } from '../config';

export const getBooksAsync = (lastEvaluatedKey?: string): Promise<ScanResponse> => {
    const url = lastEvaluatedKey ? `${apiUrl}/${lastEvaluatedKey}` : apiUrl;
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.error('Something went wrong...', error));
}