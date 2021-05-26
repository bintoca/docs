import fs from 'fs'
import path from 'path'

type resp = { statusCode: number, body: string | Buffer, headers: { [header: string]: number | string } }
export async function handler(req: { method: string, path: string, headers: { [header: string]: string | string[] | undefined }, body: Buffer }): Promise<resp> {
    const r: resp = { statusCode: 200, body: '', headers: {} }
    try {
        switch (req.method) {
            case 'GET': {
                switch (req.path) {
                    case '/': {
                        r.body = indexHtml('')
                        r.headers['Content-Type'] = 'text/html'
                        cacheControlPublic(r, 3600)
                        break
                    }
                    case '/favicon.ico': {
                        r.body = fs.readFileSync(path.join(__dirname, '..', 'assets', 'favicon.ico'))
                        ct(r, req.path)
                        cacheControlPublic(r, 3600)
                        break
                    }
                    default:
                        if (req.path.startsWith('/x') && false) {

                        }
                        else {
                            r.statusCode = 404
                        }
                }
                break
            }
            default:
                r.statusCode = 405
        }
        if (r.statusCode >= 400) {
            //console.log(req, r)
        }
    }
    catch (e) {
        console.log(e)
        r.statusCode = 500
    }
    return r
}
function indexHtml(main: string) {
    return `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>bintoca docs</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
        </head>
        <body>
        docs
        </body>
      </html>`
}
function cacheControlPublic(r: resp, max: number) { r.headers['Cache-Control'] = 'public, max-age=' + max }
export function contentType(path: string): string {
    if (path.endsWith('.js')) {
        return 'text/javascript'
    }
    if (path.endsWith('.ico')) {
        return 'image/x-icon'
    }
    throw new Error('not implemented ' + path)
}
function ct(r: resp, path: string) { r.headers['Content-Type'] = contentType(path) }