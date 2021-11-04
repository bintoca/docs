+++
title = "Security Model"
linkText = "Security Model"
+++

# Application Security Model

This document explains the techniques and design choices for securing applications and data in the bintoca environment. Applications are sandboxed by syntactic and programmatic means to ensure isolation and safe sharing of data.

## Process model

Applications can be reliably launched in a separate browser renderer processes using `target="_blank"` and `rel=noopener`. This even works within the same origin. By controlling these attributes on all internal site links a  service worker can use the referer header to determine if a page load is happening in a new process. This will be implemented later with configuration and permission management.

## Packages

Applications are deployed as a bundle of files that form a directory hierarchy (e.g. an npm tarball) that can be extracted and served from a URL subpath. 

Files that can cause network requests are pre-parsed and validated that their URLs point to files within the package. Relative URLs that are out of scope (e.g. ../../../foo) and absolute URLs are disallowed.

File names must use standard extensions to trigger correct content types. (.js, .css, .wasm, .json)

package.json must exist and contain a `main` field referencing an ECMAScript module (.js). This is the entry point of the application. No HTML is included in the package.

## Javascript

### JS files are pre-parsed to validate:

- Correct syntax for current ECMAScript module spec
- import specifiers are relative URLs referencing files inside the package
- sourceMappingURLs are relative URLs referencing files inside the package
- global identifier names are extracted for possible later overriding with appended import statements
- dynamic import statements are replaced with imports providing virtualized functionality

### Initializing the JS environment consists of:

- Make private copies of primorial objects and functions needed in internal code. (e.g. String.prototype.endsWith)
- Delete all non-approved configurable properties from the global object and its prototype chain
- Modify configurable properties that can cause network or storage IO.
- Report non-configurable properties of the global object to server (or service worker). These will result in dynamically appended import statements referencing proxy objects instead of the real globals.
- Load package.json main module

### Disallow eval:

- `eval` function is deleted
- `Function` is a proxy object that disallows the string constructor
- `setTimeout` and `setInterval` are overridden to disallow string parameters
- `document` is a proxy object that disallows `<script>` elements and element properties that parse HTML or js
- dynamic `import` is overridden to only load files from inside the package scope

### Control network access:

- Currently `fetch` is overridden to only retrieve URLs in the package scope. This will be more user configurable in the future.
- `location` is overridden to only allow `reload`
- Only approved HTML elements can be created. `<a>`, `<iframe>` etc. are disallowed 
- DOM objects and event listener params are proxy objects so as not to expose the real `window` object
- Values set to `style` properties are validated to only cause network requests in package scope. ***Currently all css function syntax is blocked until we have a secure css parser

### Control storage access:

- Currently all blocked. In the future, virtualized IndexedDB with user managed configuration

## CSS

- CSS may be loaded with a `<link>` element. `href` is validated to be in package scope and end with `.css` to ensure it went through the pre-parser
- ***Currently css at-rules and function syntax are disallowed until we have a secure css parser

## WebAssembly

- WASM import specifiers are validated to be relative URLs in package scope or non-absolute-URL bare specifiers. This is in anticipation of wasm/esm module integration.
- `sourceMappingURL` and `external_debug_info` custom sections must be relative URLs in package scope
- Non-approved custom sections are disallowed

## JSON

- JSON is validated by the pre-parser with `JSON.parse` in anticipation of JSON module implementations coming to browsers

## Source Maps

- Sources must be inline or relative URLs in package scope
- Nested `sourceMappingURLs` are disallowed
- Additional linked info in `external_debug_info` wasm is disallowed