+++
title = "Vulnerability Disclosure Policy"
linkText = "Vulnerability Disclosure"
+++

# Vulnerability Disclosure Policy

Effective date: November 18, 2026

## Our commitment

We welcome reports from security researchers and anyone who finds a potential vulnerability in bintoca. We will investigate good-faith reports, work with you on remediation, and make reasonable efforts to resolve issues promptly. If you follow this policy, we will not pursue legal action against you or report you to law enforcement for your security research.

## Scope

### In scope

- `bintoca.com` and its subdomains
- Workspace hosts under `*.bintoca.io`
- Authentication and session handling, including sign-up, login, access codes, OIDC, and SCIM endpoints
- Access control for workspaces, storage, and shared links, including `/access/*`
- Server-side vulnerabilities that affect the confidentiality, integrity, or availability of user data

### Out of scope

- Third-party services and infrastructure, including Cloudflare, email providers, and payment providers. Report those issues to the relevant provider.
- Social engineering, phishing, or pretexting against bintoca personnel or users
- Physical attacks against offices, data centers, or hardware
- Denial-of-service, volumetric scanning, or any testing that degrades the Service
- Automated scanner output or theoretical findings without a demonstrated security impact
- Missing security headers, cookie flags, or other best-practice findings without an exploit
- Self-XSS, clickjacking on pages without sensitive actions, and issues that require an outdated browser or platform
- Vulnerabilities in content uploaded to a workspace, or in a user's own application code
- Publicly available information or information that is intentionally public

## How to report a vulnerability

Email [support@bintoca.com](mailto:support@bintoca.com) with the subject line **Security Report**.

Please do not open a public GitHub issue, post details on social media, or disclose the issue publicly before we have had a chance to investigate and coordinate a fix.

If you need to send sensitive details, tell us in your first email and we will arrange a suitable channel.

## What to include

A useful report includes:

- A summary of the vulnerability and its potential impact
- The affected URL, workspace, endpoint, or component
- Step-by-step reproduction instructions, including any test account details
- A proof of concept, request/response captures, or screenshots where helpful
- The date and time of your testing, and whether you accessed any data that was not yours
- Your preferred name or handle for credit, and whether you want to be credited
- Your disclosure plans and any deadline you are working toward

## Safe harbor

If you make a good-faith effort to comply with this policy, we will:

- not pursue legal action or report you to law enforcement for your research;
- work with you to understand and resolve the issue;
- not ask you to pay for access to information about the issue; and
- credit you for the finding if you want credit.

This safe harbor does not apply to activity that:

- violates applicable law;
- accesses, modifies, deletes, or exfiltrates data belonging to others;
- intentionally degrades, disrupts, or denies service to users;
- involves extortion, blackmail, or a demand for payment;
- targets third-party systems or services; or
- continues after we ask you to stop.

Nothing in this policy authorizes testing of systems we do not own or operate.

## What to expect from us

- We will acknowledge your report within 3 business days.
- We will provide an initial assessment within 10 business days.
- We will send status updates at least every 10 business days while the issue is open.
- We aim to resolve confirmed vulnerabilities within 90 days. Complex issues may take longer; we will agree on a revised timeline with you.
- We may ask for additional information or a retest after a fix is deployed.

## Coordinated disclosure

We ask that you keep the details private until a fix is available or until 90 days after we acknowledge your report, whichever comes first. If we need more time, we will discuss it with you and agree on a revised disclosure date. We will not disclose your identity without your permission.

If a vulnerability is being actively exploited, we may need to act and communicate more quickly. We will keep you informed.

## Rules of engagement

While researching, you must:

- test only accounts, workspaces, and data that you own or have explicit permission to use;
- avoid accessing, modifying, deleting, or exfiltrating another user's data;
- avoid actions that degrade, interrupt, or deny service to others;
- not use social engineering, phishing, or physical intrusion;
- not introduce malware or persistent access; and
- stop testing and report immediately if you encounter personal information or other sensitive data that is not yours.

## Recognition

We appreciate the work that goes into security research. If you would like credit, we will thank you by name or handle in our security acknowledgments. We do not currently operate a paid bug bounty program.

## Changes to this policy

We may update this policy from time to time. Material changes will be reflected on this page with a new effective date.

## Contact

Questions about this policy or a report? Email [support@bintoca.com](mailto:support@bintoca.com).
