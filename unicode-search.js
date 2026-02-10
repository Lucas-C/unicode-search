#!/usr/bin/env node
import commander, { version, args } from 'commander'
import { version as _version } from './package.json'

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

version(_version)
  .option('-b, --block [name]', 'Filter by block name, e.g. "Emoticon"')
  .option('-c, --category [name]', 'Filter by category name, e.g. "So"')
  .option('-k, --keys [keys]', 'Output only the selected field(s), e.g. "name,string"')
  .parse(process.argv)

const { block, category, keys } = commander
const uppercaseKeyword = (args[0] || '').toUpperCase()

import unicodeData from './UnicodeData.json'
import blocks from './Blocks.json'

const findBlockName = (codepoint) => {
  // yes, dichotomic search would be faster
  // but we have only 260 entries
  codepoint = codepoint.padStart(6, '0')
  let index = -1
  for (const block of blocks) {
    if (block.rangeStart > codepoint) break
    index++
  }
  return blocks[index].blockName
}

for (const uChar of Object.values(unicodeData)) {
  if (category && uChar.category !== category) continue
  if (uppercaseKeyword && uChar.name.indexOf(uppercaseKeyword) < 0) continue
  uChar.block = findBlockName(uChar.value)
  if (block && uChar.block.toLowerCase() !== block.toLowerCase()) continue
  uChar.categoryHumanReadble = PRETTY_CATEGORY[uChar.category]
  uChar.string = String.fromCodePoint('0x' + uChar.value)
  if (keys) {
    for (const key of keys.split(',')) {
      console.log(uChar[key])
    }
  } else {
    console.log(uChar)
  }
}
