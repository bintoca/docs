import fs from 'fs'
import path from 'path'
import { html, content, render } from './md'

export type route = { urlPath: string, outFile: string, mdFile: string }

export function routes(contentDir = './content'): route[] {
    const out: route[] = []
    const walk = (dir: string, url: string) => {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) {
                walk(path.join(dir, entry.name), url + '/' + entry.name)
            }
            else if (entry.name.endsWith('.md')) {
                const name = entry.name.substring(0, entry.name.length - 3)
                if (name == 'index') {
                    out.push({
                        urlPath: url == '' ? '/' : url,
                        outFile: url == '' ? 'index.html' : url.substring(1) + '.html',
                        mdFile: path.join(dir, entry.name)
                    })
                }
                else {
                    out.push({
                        urlPath: url + '/' + name,
                        outFile: url.substring(1) + '/' + name + '.html',
                        mdFile: path.join(dir, entry.name)
                    })
                }
            }
        }
    }
    walk(contentDir, '')
    return out
}

export function prerender(outDir = './public', contentDir = './content') {
    for (const r of routes(contentDir)) {
        const file = path.join(outDir, r.outFile)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, render(r.mdFile, r.urlPath))
    }
    fs.writeFileSync(path.join(outDir, '404.html'), html('404 not found', content('<h1>404 not found</h1>')))
}
