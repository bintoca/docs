+++
title = "Shared access"
linkText = "Shared access"
+++

# Shared access

Shared access lets another access point use your workspaces. It is designed for collaboration between separate bintoca accounts without exchanging passwords or tokens.

## Sharing is one-way

When you share with another access point:

- that access point can use the workspaces and methods allowed by the permission groups you share with it;
- you do not automatically get access to that access point's workspaces; and
- to use their workspaces, they must share with you separately.

## Share with another access point

1. Sign in to your access point.
2. Open **Shared Access**.
3. Enter the other access point's name.
4. Select **Enable Sharing**.
5. Open the new entry and select **Share your workspaces with *name***.
6. Select **Save**.

The other access point now appears in your list with a note about whether it shares its workspaces with you.

## Grant access with permission groups

Sharing an access point does not grant any access by itself. You must also share at least one permission group.

1. Open **Permissions** and edit the group you want to share.
2. Under **Shared with**, select the other access point.
3. Select **Save permission group**.

The other access point can use that group only for the workspaces and methods the group already allows. It cannot exceed your rules.

If you later remove the access point from **Shared with**, that group no longer grants it access.

## Use another access point's workspaces

If another access point shares its workspaces with you:

1. Open **Shared Access** and select the access point.
2. The entry shows that it shares its workspaces with you.
3. Create a session and select the permission groups you have configured to use the other access point.

Linked rules in your own permission groups can further narrow what you allow from the other access point. They cannot grant more than the other side allows.

## Descriptions

Use the **Description** field to record why the connection exists or who manages it. The description appears in the shared access list and in linked rule pickers.

## Stop sharing

To stop sharing your workspaces with an access point:

1. Open **Shared Access** and select the entry.
2. Clear **Share your workspaces with *name***.
3. Select **Save**.

You can also remove the access point from each permission group's **Shared with** list. Existing sessions created by the other access point may continue until they expire or are revoked; revoke sessions if you need to stop access immediately.

## Troubleshooting

- **The other access point cannot open your workspace.** Confirm you shared a group with it and that the group has a rule for that workspace and method.
- **You cannot see their workspace.** Sharing is one-way. They must enable sharing and share a group with you.
- **A workspace cannot be deleted.** A group that is shared with another access point still refers to it. Remove the rule first.
