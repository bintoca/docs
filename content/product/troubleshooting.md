+++
title = "Troubleshooting"
linkText = "Troubleshooting"
+++

# Troubleshooting

## I cannot sign in

- Confirm you opened your access point URL, not the workspace URL.
- Use the email address registered with the access point.
- Select **Resend code** if the code did not arrive. Check spam and other mail filters.
- If you lost the access point URL, open [bintoca.com/login](https://bintoca.com/login) and request your access links by email.

Sign-in codes are single-use and expire. Request a new code if the old one has expired.

## The workspace redirects me to sign in repeatedly

- Allow cookies for `bintoca.com` and `*.bintoca.io`.
- Do not open the workspace in a private window that blocks storage.
- Sign out and sign in again, then create a new session.

## 401 Unauthorized

The request did not include a valid session.

- Browser: create a session from your access point and open the workspace again.
- Script: send `Authorization: Bearer <token>`.
- The token may have expired or been revoked. Create a new session.

## 403 Forbidden

The session is valid, but no rule allows the request.

- Confirm the session selected a group that contains a rule for this workspace.
- Confirm the rule matches the URL. **Wildcard** is needed for subpaths.
- Confirm the rule includes the method you are using. `HEAD` uses the `GET` rule.
- If you are using shared access, confirm the other access point shared a group with you and that the group covers this URL and method.
- If you changed a group, create a new session. Existing sessions keep the groups and rules they were created with.

## 404 Not Found

- Check the workspace name and access point name in the hostname.
- Check the path. A workspace only serves the paths that exist in storage.
- A new workspace serves a starter page at `/` until you upload a file to `/`.

## 405 Method Not Allowed

- Supported methods are `GET`, `HEAD`, `PUT`, `PUTX`, `DELETE`, and `POST` with `X-HTTP-Method-Override: PUTX`.
- `POST` without the override returns `405`.
- `PATCH` is not supported.
- Check the `Allow` response header for the methods the endpoint accepts.

## 415 Unsupported Media Type

`PUT` does not accept active content. Use `PUTX` for HTML, XHTML, SVG, XML, XSLT, and JavaScript media types:

```bash
curl -X POST \
  -H "Authorization: Bearer $BINTOCA_TOKEN" \
  -H "X-HTTP-Method-Override: PUTX" \
  -H "Content-Type: text/html" \
  --data-binary @index.html \
  "https://myapp-yourname.bintoca.io/index.html"
```

The permission group needs the `PUTX` method. See [Files and HTTP](files-and-http) for the full list of active media types.

## 412 Precondition Failed or 304 Not Modified

These are conditional-request responses, not necessarily errors.

- `304` means your cached copy is still valid.
- `412` means an `If-Match` or `If-Unmodified-Since` condition no longer holds. Read the current file and retry with its new `ETag`.

## 429 Too Many Requests

The session or endpoint is rate limited. Wait for the delay in the `Retry-After` header, then retry with backoff. Do not retry in a tight loop.

## I cannot delete a workspace

A workspace cannot be deleted while a permission group rule refers to it or while an active session includes a rule for it. The error lists the groups and sessions that use it.

1. Open **Permissions**.
2. Edit each listed group.
3. Remove or change the rule that targets the workspace.
4. Open **Sessions** and revoke each listed session.
5. Delete the workspace again.

## I cannot delete my access point

The **Delete access point** button on **My Account** stays disabled while the access point owns any workspace.

1. Open **Workspaces**.
2. Delete every workspace. If a workspace cannot be deleted, clear its permission-group rules and revoke the listed sessions first. See [I cannot delete a workspace](#i-cannot-delete-a-workspace).
3. Open **My Account**.
4. Select **Delete access point**, type `DELETE`, and confirm.

## The workspace or access point name is rejected

| Name | Rule |
|---|---|
| Access point | 5 to 20 lowercase letters and digits. |
| Workspace | 1 to 20 lowercase letters and digits. |
| Both | No spaces, hyphens, or punctuation. |

Names cannot be changed after creation. Create a new access point or workspace with the name you want.

## Shared access does not work

- Sharing is one-way. Confirm the other access point enabled sharing and shared a group with you.
- Confirm the group contains a rule for the workspace and method.
- Confirm the workspace still exists and was not deleted.
- If access was revoked, existing sessions may continue until they expire. Revoke them to stop access immediately.

## I still need help

Use **Feedback** in your access point sidebar. Include:

- the workspace URL;
- the method and path you requested;
- the status code and response body;
- the approximate time of the request.

Do not include bearer tokens, passwords, or other secrets.
