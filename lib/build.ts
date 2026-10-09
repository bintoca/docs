import fs from 'fs'
import path from 'path'
import { prerender } from './prerender'
import { mainCssName, mainJsName } from './assets'

const outDir = './public'
fs.rmSync(outDir, { recursive: true, force: true })
fs.mkdirSync(outDir, { recursive: true })

prerender(outDir)

fs.copyFileSync('./assets/favicon.ico', path.join(outDir, 'favicon.ico'))
fs.copyFileSync('./assets/main.css', path.join(outDir, mainCssName.substring(1)))
fs.copyFileSync('./assets/main.js', path.join(outDir, mainJsName.substring(1)))
if (fs.existsSync('./assets/sw.js')) {
    fs.copyFileSync('./assets/sw.js', path.join(outDir, 'sw.js'))
}
