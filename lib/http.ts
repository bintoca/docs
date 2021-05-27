import fs from 'fs'
import zlib from 'zlib'
import { html, content, render } from './md'

type resp = { statusCode: number, body: string | Buffer, headers: { [header: string]: number | string } }
export async function handler(req: { method: string, path: string, headers: { [header: string]: string | string[] | undefined }, body: Buffer }): Promise<resp> {
    const r: resp = { statusCode: 200, body: '', headers: {} }
    try {
        switch (req.method) {
            case 'GET': {
                const assetsName = './assets' + req.path
                const contentName = './content' + (req.path.endsWith('/') ? req.path.substring(0, req.path.length - 1) : req.path)
                const contentExist = fs.existsSync(contentName)
                if (!req.path.endsWith('.md') && (contentExist || fs.existsSync(contentName + '.md'))) {
                    r.body = render(contentName + (contentExist ? '/index.md' : '.md'), req.path)
                }
                else if (fs.existsSync(assetsName)) {
                    r.body = fs.readFileSync(assetsName)
                }
                else if (req.path == mainCssName) {
                    r.body = fs.readFileSync('./assets/main.css')
                    cacheControlPublic(r, 60 * 60 * 24 * 365)
                }
                else if (req.path == mainJsName) {
                    r.body = fs.readFileSync('./assets/main.js')
                    cacheControlPublic(r, 60 * 60 * 24 * 365)
                }
                else {
                    r.statusCode = 404
                    r.body = html('404 not found', content('<h1>404 not found</h1>'))
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
    if (!r.headers['Content-Type']) {
        ct(r, req.path)
    }
    if (!r.headers['Cache-Control']) {
        cacheControlPublic(r, 3600)
    }
    r.body = zlib.gzipSync(r.body)
    r.headers['Content-Encoding'] = 'gzip'
    return r
}

function cacheControlPublic(r: resp, max: number) { r.headers['Cache-Control'] = 'public, max-age=' + max }
function contentType(path: string): string {
    if (path.endsWith('.js')) {
        return 'text/javascript'
    }
    if (path.endsWith('.css')) {
        return 'text/css'
    }
    if (path.endsWith('.ico')) {
        return 'image/x-icon'
    }
    return 'text/html'
}
function ct(r: resp, path: string) { r.headers['Content-Type'] = contentType(path) }

import * as crypto from 'crypto'
export function sha256(buf: BufferSource) {
    return crypto.createHash('sha256').update(Buffer.from(buf instanceof ArrayBuffer ? Buffer.from(buf) : Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength))).digest()
}
export const mainCssName = '/' + sha256(fs.readFileSync('./assets/main.css')).toString('hex').substring(0, 20) + '.css'
export const mainJsName = '/' + sha256(fs.readFileSync('./assets/main.js')).toString('hex').substring(0, 20) + '.js'