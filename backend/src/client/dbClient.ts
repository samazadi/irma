import * as AWS from 'aws-sdk';

const dbClient = () => {
    if (!process.env.DEBUG) return new AWS.DynamoDB.DocumentClient();

    return new AWS.DynamoDB.DocumentClient({
        region: 'localhost',
        endpoint: 'http://localhost:8000'
    });
}

export default dbClient;