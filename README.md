[![NPM Version](https://img.shields.io/npm/v/unicode-search)](https://www.npmjs.com/package/unicode-search)
[![Build status](https://github.com/Lucas-C/unicode-search/workflows/CI%20pipeline/badge.svg)](https://github.com/Lucas-C/unicode-search/actions/workflows/build.yml?query=branch%3Amaster)
[![Known Vulnerabilities](https://snyk.io/test/github/lucas-c/unicode-search/badge.svg)](https://snyk.io/test/github/lucas-c/unicode-search)

# unicode-search
Command-line interface to search UTF8 characters by name from a JSON cache, without requiring an Internet connection.

https://www.npmjs.com/package/unicode-search

Inspired by https://github.com/eversport/node-unicodetable

Online, I would recommend to use this tag-based searched: http://graphemica.com/characters/tags/


## Installation
```
npm install -g unicode-search
```

You can also directly invoke `unicode-search` using `npx`:

```
npx unicode-search --help
```


## Usage
```
unicode-search -b Emoticons -k name,string "check mark"
```
```
unicode-search -b Emoticons -k name,string > all_emoticons.txt
```

### Options
Please run the following command to see the latest options:

```
unicode-search -h
```

The following is for your quick reference (may not be the latest version):

```
  Usage: unicode-search [options]


  Options:

    -V, --version          output the version number
    -b, --block [name]     Filter by block name, e.g. "Emoticon"
    -c, --category [name]  Filter by category name, e.g. "So"
    -k, --keys [keys]      Output only the selected field(s), e.g. "name,string"
    -h, --help             output usage information
```

# Release notes
_cf._ [CHANGELOG.md](CHANGELOG.md)

# Release checklist
1. `version=1.X.Y`
1. `sed -i "s/\"version\": \"1.\+\"/\"version\": \"$version\"/" package.json`
1. `npm pack --dry-run && npm publish` to upload on [npmjs.com](https://www.npmjs.com/package/unicode-search)
1. Edit `CHANGELOG.md` to add the release date for `$version`
1. `git commit -am "New release: $version" && git push && git tag $version && git push --tags`
