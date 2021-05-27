import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import htmlStr from 'rehype-stringify'
import front from 'remark-frontmatter'
import frontExt from 'remark-extract-frontmatter'
import * as toml from '@iarna/toml'
import fs from 'fs'

export const html = (title: string, body: string) => `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title><meta name="viewport" content="width=device-width, initial-scale=1" /><link href="/1.css" rel="stylesheet"><script defer src="/1.js"></script></head>
<body><header><div style="flex:auto"><a href="/"><span style="font-weight: bold; font-size: 1.5em">bintoca docs</span></a></div><div style="display: flex; flex-direction: row-reverse; align-items: center"><div><a href="https://bintoca.com">bintoca.com</a></div></div></header>${body}
<footer><ul><li><a >Terms</a></li><li><a >Privacy</a></li></ul></footer></body></html>`
export const content = (c: string) => `<div class="content">${c}</div>`

//unified().processSync()

export function render(path: string) {
    const vf = unified().use(markdown).use(front, ['toml']).use(frontExt, { toml: toml.parse }).use(remark2rehype).use(htmlStr).processSync({ path, contents: fs.readFileSync(path) })
    return html(vf.data['title'], content(vf.contents as string))
}