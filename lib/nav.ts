export type NavLink = { title: string, path: string }

export type NavGroup = { title: string, items: NavLink[] }

export const productNav: NavGroup[] = [
    {
        title: 'Start here',
        items: [
            { title: 'Overview', path: '/product' },
            { title: 'Getting started', path: '/product/getting-started' },
            { title: 'Concepts', path: '/product/concepts' },
        ],
    },
    {
        title: 'Manage',
        items: [
            { title: 'Access points', path: '/product/access-points' },
            { title: 'Workspaces', path: '/product/workspaces' },
            { title: 'Permissions', path: '/product/permissions' },
            { title: 'Shared access', path: '/product/shared-access' },
            { title: 'Sessions', path: '/product/sessions' },
        ],
    },
    {
        title: 'Build',
        items: [
            { title: 'Files and HTTP', path: '/product/files-and-http' },
        ],
    },
    {
        title: 'Help',
        items: [
            { title: 'Troubleshooting', path: '/product/troubleshooting' },
        ],
    },
]

export const productLinks = productNav.reduce<NavLink[]>((links, group) => links.concat(group.items), [])

export function isProductPath(urlPath: string) {
    return urlPath === '/product' || urlPath.startsWith('/product/')
}

function escapeHtml(value: string) {
    return String(value).replace(
        /[&<>"']/g,
        character =>
            ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
            })[character] as string,
    )
}

export function productSidebar(urlPath: string) {
    const groups = productNav.map(group => {
        const items = group.items.map(item => {
            const current = item.path === urlPath ? ' aria-current="page"' : ''
            return `<li><a href="${escapeHtml(item.path)}"${current}>${escapeHtml(item.title)}</a></li>`
        }).join('')

        return `<div class="docs-nav-group"><p class="docs-nav-group-title">${escapeHtml(group.title)}</p><ul>${items}</ul></div>`
    }).join('')

    return `<aside class="docs-sidebar"><nav class="docs-nav" aria-label="Product documentation"><p class="docs-nav-title">Product</p>${groups}</nav></aside>`
}

export function productPager(urlPath: string) {
    const index = productLinks.findIndex(link => link.path === urlPath)

    if (index === -1) {
        return ''
    }

    const previous = productLinks[index - 1]
    const next = productLinks[index + 1]
    const previousLink = previous === undefined
        ? '<span></span>'
        : `<a class="docs-pager-link" href="${escapeHtml(previous.path)}"><span class="docs-pager-label">Previous</span>${escapeHtml(previous.title)}</a>`
    const nextLink = next === undefined
        ? ''
        : `<a class="docs-pager-link docs-pager-next" href="${escapeHtml(next.path)}"><span class="docs-pager-label">Next</span>${escapeHtml(next.title)}</a>`

    return `<nav class="docs-pager" aria-label="Documentation pages">${previousLink}${nextLink}</nav>`
}
