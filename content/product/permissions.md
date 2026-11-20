+++
title = "Permissions"
linkText = "Permissions"
+++

# Permissions

Permission groups decide what a session can read or change. Every request to a workspace is checked against the rules in the session's groups.

## How rules work

A rule has three parts:

1. **URL** — absolute URL path.
2. **Wildcard flag** — structured match of that URL and sub-paths.
3. **Methods** — which HTTP methods are allowed.

The workspace selector already includes the trailing `/` in the workspace URL. Enter the suffix after that slash: use `assets/` for `https://myapp-yourname.bintoca.io/assets/`, or leave it empty for the workspace root.

`HEAD` requests are treated like `GET` when bintoca checks a rule.

## The full access group

Creating a workspace automatically creates a group named `<workspace> - full access`. It gives the owner access to the whole workspace with these methods:

```
GET, POST, PUT, PUTX, PATCH, DELETE
```

`PUTX` is required to upload active content such as HTML, SVG, XHTML, XML, XSLT, or JavaScript. `PUT` handles everything else.

Use the narrowest rule that works for your session. See [Files and HTTP](files-and-http) for the methods the workspace supports.

## Create a permission group

1. Sign in to your access point.
2. Open **Permissions**.
3. Select **Create permission group**.
4. Enter a name.
5. Add one or more rules under **Rules for your workspaces**.
6. Select **Save permission group**.

To edit an existing group, select it from the list.

## Add a rule

1. Select **New rule**.
2. Choose a workspace.
3. Enter a suffix, such as `assets/` or `data.json`. Leave it empty for the workspace root.
4. Leave **Wildcard** clear to match one exact URL, or select it to cover everything beneath the suffix.
5. Select the methods the rule allows.
6. Select **Add rule**.

You can add multiple rules to one group. A session that uses the group receives all of them.

## How wildcard matching works

Wildcard is not a glob and does not use `*`. It is a boundary-aware prefix match.

A request matches a wildcard rule when:

- the request URL is exactly the rule URL;
- the rule URL ends with `/` or `?` and the request URL starts with it; or
- the next character after the rule URL is `/` or `?`.

This means a wildcard covers subpaths and query strings at a path or query boundary, but it does not match a longer word that happens to start with the same characters. `?` is the query separator, not a single-character wildcard.

For example, with `https://myapp-yourname.bintoca.io/` as the workspace URL, the suffix `assets/` becomes `https://myapp-yourname.bintoca.io/assets/`, and the suffix `search?` becomes `https://myapp-yourname.bintoca.io/search?`.

| Suffix after the workspace URL | Matches | Does not match |
|---|---|---|
| *(empty)* | Every URL in the workspace. | — |
| `assets` | `/assets`, `/assets/`, `/assets/app.js`, `/assets?v=2` | `/assets-old`, `/assets.json` |
| `assets/` | `/assets/`, `/assets/app.js`, `/assets/?v=2` | `/assets` |
| `search?` | `/search?q=1`, `/search?` | `/search`, `/search/help` |
| `data.json` | `/data.json`, `/data.json?download=1`, `/data.json/` | `/data.json.bak` |

Examples:

- **Whole workspace:** wildcard with an empty suffix. This matches `/`, `/app.js`, `/assets/logo.png`, and `/search?q=1`.
- **A directory and everything below it:** wildcard `assets/`. The trailing `/` makes `/assets/` itself and every subpath match; `/assets` without the slash does not.
- **A path and everything below it, including the path itself:** wildcard `assets` (no trailing slash). This also matches `/assets` and `/assets?cache=1`.
- **Any query string on one path:** wildcard `search?`. This matches `/search?q=1` and `/search?sort=new`, but not `/search` without a query and not `/search/help`.
- **One exact URL:** leave wildcard clear (Path). A path rule matches the full URL exactly, including its query string.

## Examples

| Goal | Rule |
|---|---|
| Let a session read the workspace homepage | Path with empty suffix, method `GET` |
| Let a browser load CSS, JavaScript, and images | Wildcard with empty suffix, methods `GET` |
| Let an app upload files but not delete them | Wildcard with empty suffix, methods `PUT`, `PUTX` |
| Let a script read and replace one JSON file | Path `data.json`, methods `GET`, `PUT` |
| Give an integration full control | Wildcard with empty suffix, methods `GET`, `PUT`, `PUTX`, `DELETE` |

## Linked rules

Linked rules are a second layer of permission for workspaces owned by another access point. They only matter when another access point shares its workspaces with you.

A linked rule cannot grant more access than the other access point already gives you. It can only define a narrower subset.

To add one, open a group and use **Linked rules for other access point workspaces**, choose an access point, and pick or narrow one of its rules.

## Share a group with another access point

1. Share your workspaces with the other access point first. See [Shared access](shared-access).
2. Open **Permissions** and edit the group.
3. Under **Shared with**, select the access point.
4. Select **Save permission group**.

The other access point can then use that group, but only for the workspaces and methods the group allows.

## Delete a permission group

Open the group and select **Delete permission group**. Deleting a group cannot be undone. Sessions that used it should be revoked manually.

If a workspace cannot be deleted because a group refers to it, remove the rule from the group first. See [Workspaces](workspaces).
