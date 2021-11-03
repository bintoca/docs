import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import htmlStr from 'rehype-stringify'
import gfm from 'remark-gfm'
import slug from 'rehype-slug'
import link from 'rehype-autolink-headings'
import front from 'remark-frontmatter'
import frontExt from 'remark-extract-frontmatter'
import * as toml from '@iarna/toml'
import { VFile } from 'vfile'
import fs from 'fs'
import { mainCssName, mainJsName } from './http'

export const html = (title: string, body: string) => `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${title}</title><meta name="viewport" content="width=device-width, initial-scale=1" /><link href="${mainCssName}" rel="stylesheet"><script defer src="${mainJsName}"></script></head>
<body><header><div style="flex:auto"><a href="/"><span style="font-weight: bold; font-size: 1.5em">bintoca docs</span></a></div><div style="display: flex; flex-direction: row-reverse; align-items: center"><div><a href="https://bintoca.com">bintoca.com</a></div></div></header>${body}
<footer><ul><li><a href="/policy/terms">Terms</a></li><li><a href="/policy/privacy">Privacy</a></li><li><a href="https://bintoca.com">bintoca.com</a></li></ul></footer></body></html>`
export const content = (c: string) => `<div class="content">${c}</div>`
const breadcrumb = (n: { text: string, path: string }[]) => `<div style="display: flex;"><nav class="bc">${n.map(x => `<a href="${x.path}">${x.text}</a>`).join('')}</nav></div>`

type props = { linkText: string, title: string }
type vfd = VFile & { data: props }
function getVFile(path: string): vfd {
    return unified().use(markdown).use(gfm).use(front, ['toml']).use(frontExt, { toml: toml.parse }).use(remark2rehype).use(slug).use(link).use(htmlStr).processSync({ path, contents: fs.readFileSync(path) }) as vfd
}
const propsCache: { [key: string]: props } = {}
function getProps(path: string) {
    if (!propsCache[path]) {
        propsCache[path] = getVFile(path).data
    }
    return propsCache[path]
}
export function render(path: string, urlPath: string) {
    let up = urlPath
    const nav = []
    while (up) {
        up = up.substring(0, up.lastIndexOf('/'))
        const props = getProps('./content' + up + '/index.md')
        nav.unshift({ text: props.linkText, path: up ? up : '/' })
    }
    const vf = getVFile(path)
    nav.push({ text: vf.data.linkText, path: urlPath })
    return html(vf.data.title, content((urlPath != '/' ? breadcrumb(nav) : '') + vf.contents as string))
}