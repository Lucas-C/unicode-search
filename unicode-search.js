#!/usr/bin/env node
import 'core-js/modules/es7.object.values'
import 'core-js/modules/es7.string.pad-start'

const commander = require('commander')
const pkg = require('./package.json')

const PRETTY_CATEGORY = {
  Cc: 'Other, Control',
  Cf: 'Other, Format',
  Cn: 'Other, Not Assigned',
  Co: 'Other, Private Use',
  Cs: 'Other, Surrogate',
  LC: 'Letter, Cased',
  Ll: 'Letter, Lowercase',
  Lm: 'Letter, Modifier',
  Lo: 'Letter, Other',
  Lt: 'Letter, Titlecase',
  Lu: 'Letter, Uppercase',
  Mc: 'Mark, Spacing Combining',
  Me: 'Mark, Enclosing',
  Mn: 'Mark, Nonspacing',
  Nd: 'Number, Decimal Digit',
  Nl: 'Number, Letter',
  No: 'Number, Other',
  Pc: 'Punctuation, Connector',
  Pd: 'Punctuation, Dash',
  Pe: 'Punctuation, Close',
  Pf: 'Punctuation, Final quote',
  Pi: 'Punctuation, Initial quote',
  Po: 'Punctuation, Other',
  Ps: 'Punctuation, Open',
  Sc: 'Symbol, Currency',
  Sk: 'Symbol, Modifier',
  Sm: 'Symbol, Math',
  So: 'Symbol, Other',
  Zl: 'Separator, Line',
  Zp: 'Separator, Paragraph',
  Zs: 'Separator, Space'
}

commander
  .version(pkg.version)
  .option('-b, --block [name]', 'Filter by block name, e.g. "Emoticon"')
  .option('-c, --category [name]', 'Filter by category name, e.g. "So"')
  .option('-k, --keys [keys]', 'Output only the selected field(s), e.g. "name,string"')
  .parse(process.argv)

let { block, category, keys } = commander
const uppercaseKeyword = process.argv.pop().toUpperCase()

const unicodeData = require('./UnicodeData.json')
const blocks = require('./Blocks.json')

const findBlockName = (codepoint) => {
  // yes, dichotomic search would be faster
  // but we have only 260 entries
  codepoint = codepoint.padStart(6, '0')
  let index = -1
  for (let block of blocks) {
    if (block.rangeStart > codepoint) break
    index++
  }
  return blocks[index].blockName
}

for (let uChar of Object.values(unicodeData)) {
  if (category && uChar.category !== category) continue
  if (uChar.name.indexOf(uppercaseKeyword) < 0) continue
  uChar.block = findBlockName(uChar.value)
  if (block && uChar.block.toLowerCase() !== block.toLowerCase()) continue
  uChar.categoryHumanReadble = PRETTY_CATEGORY[uChar.category]
  uChar.string = String.fromCodePoint('0x' + uChar.value)
  if (keys) {
    for (let key of keys.split(',')) {
      console.log(uChar[key])
    }
  } else {
    console.log(uChar)
  }
}
