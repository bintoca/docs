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
import { mainCssName, mainJsName } from './assets'

export const html = (title: string, body: string) => `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><title>${title}</title><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="icon" href="/favicon.ico" /><link href="${mainCssName}" rel="stylesheet"><script defer src="${mainJsName}"></script></head>
<body><div class="page page-docs">
<header class="site-header site-header-bar"><a class="brand" href="/"><img class="brand-logo" src="/bintoca.svg" alt="bintoca" /><span class="brand-suffix">docs</span></a><nav class="header-actions" aria-label="Site"><a class="text-link" href="https://bintoca.com">bintoca.com</a></nav></header>
<main class="shell">${body}</main>
<footer class="site-footer"><nav class="footer-columns" aria-label="Footer">
<div class="footer-column"><h2 class="footer-heading">Product</h2><ul class="footer-links"><li><a class="text-link" href="https://bintoca.com/pricing">Pricing</a></li></ul></div>
<div class="footer-column"><h2 class="footer-heading">Resources</h2><ul class="footer-links"><li><a class="text-link" href="/">Documentation</a></li><li><a class="text-link" href="/security">Security</a></li></ul></div>
<div class="footer-column"><h2 class="footer-heading">Legal</h2><ul class="footer-links"><li><a class="text-link" href="/policy/terms">Terms of Service</a></li><li><a class="text-link" href="/policy/privacy">Privacy Policy</a></li></ul></div>
<div class="footer-column"><h2 class="footer-heading">Social</h2><ul class="footer-links"><li><a class="text-link" href="https://github.com/bintoca">GitHub</a></li><li><a class="text-link" href="https://x.com/AlexTWorld">X</a></li></ul></div>
</nav><p class="footer-note">© ${new Date().getUTCFullYear()} THOMPSON'S WORLD LLC</p></footer>
</div></body></html>`
export const content = (c: string) => `<div class="content">${c}</div>`
const breadcrumb = (n: { text: string, path: string }[]) => `<nav class="bc" aria-label="Breadcrumb">${n.map(x => `<a href="${x.path}">${x.text}</a>`).join('')}</nav>`

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