+++
title = "Concepts"
linkText = "Concepts"
+++

# Concepts

These are the terms used throughout bintoca and these guides.

## Access point

An **access point** is your account and identity on bintoca. Its name forms a unique URL:

```
https://bintoca.com/access/<access-point>
```

You sign in to your access point with a code sent to its registered email address. From the access point you manage workspaces, permission groups, sharing, and sessions.

## Workspace

A **workspace** is a private web space that serves files from storage. Every workspace has its own hostname:

```
https://<workspace>-<access-point>.bintoca.io
```

A workspace can contain HTML, CSS, JavaScript, images, documents, and other files. Access to every request is checked against a session and its permission groups.

## Permission group

A **permission group** is a named collection of rules. You assign groups to sessions, and you can share groups with other access points.

- A new workspace automatically gets a group named `<workspace> - full access`.
- A session can use one or more groups. The rules from the selected groups are combined.

## Rule

A **rule** grants access to part of a workspace for specific HTTP methods.

| Part | Meaning |
|---|---|
| URL | The absolute URL path the rule applies to. |
| Wildcard flag | Structured match of that URL and sub-paths. |
| Methods | The HTTP methods the rule allows, such as `GET`, `PUT`, or `DELETE`. |

## Session

A **session** is how a request proves who it is and what it may do.

- A **browser session** is stored in a secure cookie and is used when you open a workspace in a browser.
- A **bearer token** is a value you send in the `Authorization` header from a script or API client.

A session records the permission groups selected when it was created. If you change a group's rules, create a new session to use the updated rules.

## Shared access

**Shared access** lets another access point use your workspaces. Sharing is one-way: if you share with another access point, that access point can use the workspaces your permission groups allow. To use their workspaces, they must share with you separately.

## How a request is authorized

1. A request arrives at a workspace hostname.
2. bintoca reads the session cookie or bearer token.
3. It loads the rules from the session's permission groups.
4. It checks the request URL and method against those rules.
5. If a rule matches, the request is served. Otherwise it is rejected.
