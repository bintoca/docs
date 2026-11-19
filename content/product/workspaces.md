+++
title = "Workspaces"
linkText = "Workspaces"
+++

# Workspaces

A workspace is a private web space that serves files from storage. You can build a site, host an application, or keep documents in it.

## Workspace URLs

Every workspace has its own hostname:

```
https://<workspace>-<access-point>.bintoca.io
```

For example, `myapp` under the access point `yourname` is:

```
https://myapp-yourname.bintoca.io
```

The workspace name:

- is 1 to 20 characters long;
- uses lowercase letters and digits only; and
- cannot contain spaces, hyphens, or other punctuation.

## Create a workspace

1. Sign in to your access point.
2. Open **Workspaces**.
3. Enter a workspace name.
4. Select **Create workspace**.

Creating a workspace also:

- creates a permission group named `<workspace> - full access`;
- adds you as a member of that group; and
- grants that group full access to the workspace.

## Open a workspace

Open the workspace URL in your browser. If you do not have a session yet, bintoca redirects you to your access point to authorize the workspace.

1. Choose one or more permission groups.
2. Optionally give the session a name.
3. Select **Authorize**.

You can also start a session from **Home** inside the access point.

## Starter page

A new workspace has no stored files at `/`. Until you upload a file to `/`, the workspace serves a starter page with an upload form. You can replace the starter page like any other file.

The starter page is a convenience, not a template. It is not stored in your workspace and disappears once you upload your own file.

## Delete a workspace

1. Open **Workspaces**.
2. Select **Delete** next to the workspace.
3. Type `DELETE` to confirm.

A workspace cannot be deleted while a permission group rule refers to it. If deletion is blocked, the message lists the groups that use the workspace. Remove or update those rules, then try again.

Deletion removes the workspace from your access point and schedules its stored files for cleanup. This cannot be undone. Workspaces shared with another access point are also affected.

## Limits

| Limit | Value |
|---|---|
| Workspaces per access point | 10 |
| Workspace name length | 1 to 20 characters |
| Workspace name characters | `a-z`, `0-9` |
| Access | Requires a session or bearer token |

For the HTTP methods and headers a workspace supports, see [Files and HTTP](files-and-http).
