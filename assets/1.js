if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
    self.caches.open('cache1').then(function (cache) {
        const urls = Array.from(document.head.getElementsByTagName('link')).map(x => x.href).concat(Array.from(document.head.getElementsByTagName('script')).map(x => x.src))
        let p = ''
        for (let s of location.pathname.split('/')) {
            if (s) {
                p += '/' + s
                urls.push(p)
            }
        }
        for (let u of urls) {
            cache.match(u).then(x => { if (!x) { cache.add(u) } })
        }
    })
}