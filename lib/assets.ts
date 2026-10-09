import fs from 'fs'
import * as crypto from 'crypto'

export function sha256(buf: BufferSource) {
    return crypto.createHash('sha256').update(Buffer.from(buf instanceof ArrayBuffer ? Buffer.from(buf) : Buffer.from(buf.buffer, buf.byteOffset, buf.byteLength))).digest()
}
export const mainCssName = '/' + sha256(fs.readFileSync('./assets/main.css')).toString('hex').substring(0, 20) + '.css'
export const mainJsName = '/' + sha256(fs.readFileSync('./assets/main.js')).toString('hex').substring(0, 20) + '.js'
