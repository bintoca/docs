import * as lambda from 'aws-lambda'
import * as util from './lib/http'

export const handler: lambda.APIGatewayProxyHandler = async function (event: lambda.APIGatewayProxyEvent, context: lambda.Context) {
    const headers = Object.keys(event.headers);
    for (const key of headers) {
        event.headers[key.toLowerCase()] = event.headers[key];
    }
    const re = await util.handler({ method: event.httpMethod, path: event.path, headers: event.headers, body: Buffer.from(event.body || '', event.isBase64Encoded ? 'base64' : 'utf8') })
    const r: lambda.APIGatewayProxyResult = { statusCode: re.statusCode, body: typeof re.body == 'string' ? re.body : re.body.toString('base64'), headers: re.headers, isBase64Encoded: typeof re.body != 'string' }
    return r
}