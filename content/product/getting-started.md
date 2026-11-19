+++
title = "Getting started"
linkText = "Getting started"
+++

# Getting started

This guide takes you from a new account to a working workspace with a file you can open in the browser.

You need:

- a web browser with JavaScript enabled;
- an email address that can receive a verification code

## 1. Create your access point

1. Open [bintoca.com/signup](https://bintoca.com/signup).
2. Enter an **access point name**.
   - Use 5 to 20 lowercase letters and digits.
   - Hyphens, spaces, and other characters are not allowed.
   - The name is used in your access point URL and in every workspace URL.
3. Enter your email address and select **Send verification code**.
4. Check your email and enter the 6-digit code.
5. Select **Verify email**.

Your access point is now available at:

```
https://bintoca.com/access/<yourname>
```

Save that URL. It is how you sign in and manage your workspaces.

## 2. Sign in

1. Open your access point URL.
2. Select **Email me a sign-in code**.
3. Enter the 6-digit code from the email.

If you lost the access point URL, open [bintoca.com/login](https://bintoca.com/login) and enter your email address. We will email links for the access points registered with that address.

## 3. Create your first workspace

1. In the access point, open **Workspaces**.
2. Enter a workspace name.
   - Use 1 to 20 lowercase letters and digits.
   - Hyphens, spaces, and other characters are not allowed.
3. Select **Create workspace**.

Your new workspace is available at:

```
https://<workspace>-<access-point>.bintoca.io
```

For example, a workspace named `myapp` under an access point named `yourname` is:

```
https://myapp-yourname.bintoca.io
```

Creating a workspace also creates a permission group named `<workspace> - full access` and gives you membership in it.

## 4. Create a session

1. Select session properties, name, start url, expiration, permission groups
2. Select **Create session**.

A new workspace opens with a starter page that explains how to upload files. You can replace it like any other file.

## 5. Upload a file

On the starter page:

1. Enter a **Destination path**, such as `/hello.txt`.
2. Choose a file.
3. Leave **Content type** blank to detect it from the file, or enter a type such as `text/plain`.
4. Select **Upload**.

Open `https://<workspace>-<access-point>.bintoca.io/hello.txt` to view the file.

Uploads are subject to the permission groups used to create your session. If the upload is rejected, see [Troubleshooting](troubleshooting).

## Next steps

- Learn the [concepts](concepts) behind access points, workspaces, and sessions.
- Add more [permission groups](permissions) to control what a session can do.
- Share a workspace with another access point using [shared access](shared-access).
- Upload and replace files from scripts or applications with [files and HTTP](files-and-http).
