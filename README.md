[![](https://travis-ci.org/Lucas-C/unicode-search.svg?branch=master)](https://travis-ci.org/Lucas-C/unicode-search) 

# unicode-search

Command-line interface to search UTF8 characters by name from a JSON cache, without requiring an Internet connection.

https://www.npmjs.com/package/unicode-search

Inspired by https://github.com/eversport/node-unicodetable

Online, I would recommend to use this tag-based searched: http://graphemica.com/characters/tags/


## Installation

```
yarn global add unicode-search
```

 Or

```
npm install -g unicode-search
```


## Usage

```
unicode-search -b Emoticons -k name,string "check mark"
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
    -c, --category [name]  Filter by category name, e.g. "So"
    -h, --help             output usage information

```
