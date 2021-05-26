import * as http from 'http'
import * as util from './http'

const server1 = http.createServer(async (req: http.IncomingMessage, res: http.ServerResponse) => {
    let chunks: Buffer[] = []
    req.on('data', (c: Buffer) => {
        chunks.push(c)
    })
    req.on('end', async () => {
        const r = await util.handler({ method: req.method || '', path: req.url || '', headers: req.headers, body: Buffer.concat(chunks) })
        res.statusCode = r.statusCode
        for (let h in r.headers) {
            res.setHeader(h, r.headers[h])
        }
        res.end(r.body)
    })

})

server1.listen(3002)