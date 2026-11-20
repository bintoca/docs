+++
title = "Files and HTTP"
linkText = "Files and HTTP"
+++

# Files and HTTP

A workspace serves files from storage over HTTPS. You can read files with a browser or manage them from scripts with HTTP requests.

## Requests and permissions

Every request needs a session cookie or bearer token, and the session's permission groups must allow the request URL and method.

The workspace URL is:

```
https://<workspace>-<access-point>.bintoca.io/<path>
```

The examples below use:

```bash
export BINTOCA_TOKEN="your-bearer-token"
export WORKSPACE="https://myapp-yourname.bintoca.io"
```

Create the token from **Sessions** in your access point. See [Sessions](sessions).

## Supported methods

| Method | Purpose | Notes |
|---|---|---|
| `GET` | Read a file. | Supports conditional requests and byte ranges. |
| `HEAD` | Read headers without a body. | Allowed whenever `GET` is allowed. |
| `PUT` | Write a file. | Rejects active content with `415`. No query string. |
| `PUTX` | Write any file, including active content. | Send it as `POST` with `X-HTTP-Method-Override: PUTX`. |
| `DELETE` | Delete a file. | Returns `204` even if the file does not exist. |

`PUTX` is the upload method for active content. It accepts any content type. Use `PUT` for everything else.

`POST` and `PATCH` will be enabled with future product features.

## Read a file

```bash
curl -H "Authorization: Bearer $BINTOCA_TOKEN" \
  "$WORKSPACE/hello.txt"
```

A missing file returns `404`. If the workspace has never stored a file at `/`, the root path serves a starter page instead.

## Upload a text or binary file

Use `PUT` for any file that is not active content:

```bash
curl -X PUT \
  -H "Authorization: Bearer $BINTOCA_TOKEN" \
  -H "Content-Type: text/plain" \
  --data-binary @hello.txt \
  "$WORKSPACE/hello.txt"
```

A successful write returns `204 No Content`.

The permission group must include the `PUT` method for the destination URL. `PUT` and `PUTX` requests with a query string return `400`.

## Upload active content

`PUT` refuses active content so that ordinary uploads can be allowed without allowing scripts to run from a workspace origin. The active media types are:

- `text/html`
- `application/xhtml+xml`
- `image/svg+xml`
- `application/xml` and `text/xml`
- `application/xslt+xml` and `text/xsl`
- `text/javascript`, `application/javascript`, `text/ecmascript`, and `application/ecmascript`

Upload these files with `PUTX`:

```bash
curl -X POST \
  -H "Authorization: Bearer $BINTOCA_TOKEN" \
  -H "X-HTTP-Method-Override: PUTX" \
  -H "Content-Type: text/html; charset=utf-8" \
  --data-binary @index.html \
  "$WORKSPACE/index.html"
```

The permission group must include `PUTX`, not `PUT`. `PUTX` accepts any content type, so the same request works for SVG, XHTML, XML, XSLT, and JavaScript files.

## Delete a file

```bash
curl -X DELETE \
  -H "Authorization: Bearer $BINTOCA_TOKEN" \
  "$WORKSPACE/hello.txt"
```

The permission group must include `DELETE` for the URL.

## Conditional requests

Writes and reads support standard conditional headers:

- `If-Match` and `If-None-Match` with an `ETag`;
- `If-Modified-Since` and `If-Unmodified-Since` with `Last-Modified`.

A matching condition can return `304 Not Modified` for reads or `412 Precondition Failed` for writes. Responses include `ETag` and `Last-Modified` when the storage object provides them.

## Byte ranges

`GET` and `HEAD` responses advertise `Accept-Ranges: bytes`. Send a `Range` header to request part of a file:

```bash
curl -H "Authorization: Bearer $BINTOCA_TOKEN" \
  -H "Range: bytes=0-99" \
  "$WORKSPACE/video.mp4"
```

A partial response returns `206 Partial Content` with `Content-Range`.

## Metadata

These request headers are stored with the object and returned on later reads:

- `Cache-Control`
- `Content-Disposition`
- `Content-Encoding`
- `Content-Language`
- `Content-Type`
- any `X-Amz-Meta-*` header

## Easy proxy

Easy proxy exposes a path on one workspace under another workspace's hostname. The target must be a registered workspace, and the session must be authorized for the target workspace and path.

```text
https://myapp-yourname.bintoca.io/.well-known/easy-proxy/https/docs-yourname.bintoca.io/443/index.html
```

The format is:

```text
/.well-known/easy-proxy/<scheme>/<target-workspace-host>/<port>/<path>
```

Active content returned through easy proxy — HTML, XHTML, SVG, XML, XSLT, and JavaScript — is served as `text/plain` so remote markup or scripts cannot run in the outer workspace's origin. Writes through an alias apply to the target workspace path and use the target workspace's rules. Use `PUTX` when writing active content through an alias.

## Status codes

| Status | Meaning |
|---|---|
| `200` | The request succeeded. |
| `204` | The write or delete succeeded. |
| `206` | A byte range was returned. |
| `304` | The cached copy is still valid. |
| `400` | The request is malformed, such as a write with a query string. |
| `401` | No valid session or bearer token. |
| `403` | The session is valid but no rule allows this URL and method. |
| `404` | The file or workspace was not found. |
| `405` | The method is not supported. |
| `412` | A conditional request failed. |
| `415` | `PUT` was used with active content. Use `PUTX`. |
| `429` | The request was rate limited. Retry later. |
| `500` | The request could not be completed. |

For fixes, see [Troubleshooting](troubleshooting).
