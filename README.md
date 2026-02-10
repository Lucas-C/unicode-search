![NPM Version](https://img.shields.io/npm/v/unicode-search)
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
