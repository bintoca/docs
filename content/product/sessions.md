+++
title = "Sessions"
linkText = "Sessions"
+++

# Sessions

A session proves who is making a request and which permission groups apply. bintoca supports two kinds of session:

- **Browser** — a secure cookie used when you open a workspace in a browser.
- **Bearer token** — a token you send from a script or API client.

## Create a session

1. Sign in to your access point.
2. Open **Sessions**, or select **Home** and use the session form there.
3. Choose **Browser** or **Bearer token**.
4. Optionally enter a session name, such as `deploy script`.
5. Select one or more permission groups.
6. If the form offers a **Start URL**, choose one from the selected group.
7. Set an expiration between 1 minute and 365 days.
8. Select **Create session**.

The default expiration is 8 hours.

A session records the rules from the groups you select at creation time. If you change a group's rules later, revoke the old session and create a new session to use the new rules.

## Browser sessions

A browser session sets a secure, HTTP-only cookie and opens the selected start URL. Use **Create session** from **Home** when you want to open a workspace directly.

## Bearer tokens

A bearer token is shown once, immediately after creation. Copy it before leaving the page.

Send it in the `Authorization` header:

```bash
curl -H "Authorization: Bearer $BINTOCA_TOKEN" \
  https://myapp-yourname.bintoca.io/
```

If you lose a token, revoke it and create a new one. Treat a bearer token like a password.

## View and revoke sessions

The **Sessions** page lists active sessions with:

- the session type and, for external access, the access point it came from;
- the user;
- the start URL, if set;
- the session name;
- the last four characters of the token when available;
- when the session was created and when it expires.

Select **Revoke** to end a session immediately. Revoking a session does not delete files or permission groups.

## Expiration and limits

| Setting | Value |
|---|---|
| Minimum expiration | 1 minute |
| Maximum expiration | 365 days |
| Default expiration | 8 hours |
| Bearer token display | Once, at creation |

Session activity is rate limited. If a script receives `429 Too Many Requests`, retry after the delay indicated by the response.

## Security notes

- Sign out of shared computers and revoke browser sessions you no longer need.
- Give scripts the narrowest permission group that works.
- Use short expirations for temporary access.
- Revoke a token immediately if it is exposed.
- Do not put bearer tokens in URLs, logs, or client-side code.
