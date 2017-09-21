#!/usr/bin/env node
import "core-js/modules/es7.object.values";

const commander = require('commander')
const pkg = require('./package.json')

commander
  .version(pkg.version)
  .option('-c, --category [name]', 'Filter by category name, e.g. "So"')
  .parse(process.argv)

let { category } = commander

const uppercaseKeyword = process.argv.pop().toUpperCase()

const unicodeData = require('./UnicodeData.json')

for (let uChar of Object.values(unicodeData)) {
    if (category && uChar.category != category) {
        continue
    }
    if (uChar.name.indexOf(uppercaseKeyword) < 0) {
        continue
    }
    console.log(uChar)
    console.log(String.fromCharCode(parseInt(uChar.value, 16)))
}