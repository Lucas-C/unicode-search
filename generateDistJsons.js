#!/usr/bin/env node
// Inspired by https://github.com/eversport/node-unicodetable/blob/master/generate.js
import 'core-js/modules/es6.string.starts-with'
import 'core-js/modules/es7.string.pad-start'

const fs = require('fs')
const BufferStream = require('bufferstream')

// http://www.ksu.ru/eng/departments/ktk/test/perl/lib/unicode/UCDFF301.html
const KEYS = ['value', 'name', 'category', 'class',
  'bidirectional_category', 'mapping', 'decimal_digit_value', 'digit_value',
  'numeric_value', 'mirrored', 'unicode_name', 'comment', 'uppercase_mapping',
  'lowercase_mapping', 'titlecase_mapping']

// based on https://github.com/mathiasbynens/jsesc
const escapeUnicodeChar = (charValue) => {
  var hexadecimal = charValue.replace(/^0*/, '') // is already in hexadecimal
  var longhand = hexadecimal.length > 2
  return '\\' + (longhand ? 'u' : 'x') +
          ('0000' + hexadecimal).slice(longhand ? -4 : -2)
}

const parseLine = (line) => {
  let character = {}
  let values = line.toString().split(';')
  for (let i = 0; i < 15; i++) {
    character[KEYS[i]] = values[i]
  }
  character.symbol = escapeUnicodeChar(character.value)
  let index = parseInt(character.value, 16)
  return { index, character }
}

const unicodeDataParser = (outputFilepath) => {
  let data = {}
  let buffer = new BufferStream({encoding: 'utf8', size: 'flexible'})
  buffer.split('\n', (line) => {
    let {index, character} = parseLine(line)
    data[index] = character
  })
  buffer.on('end', () => {
    let outFile = fs.createWriteStream(outputFilepath, {encoding: 'utf8'})
    outFile.once('open', () => {
      console.log('Saving data as %s …', outputFilepath)
      outFile.write(JSON.stringify(data))
    })
  })
  return buffer
}

const blocksParser = (outputFilepath) => {
  let blocks = []
  let buffer = new BufferStream({encoding: 'utf8', size: 'flexible'})
  buffer.split('\n', (line) => {
    line = line.toString()
    if (line.startsWith('#') || line.trim() === '') return
    let [ range, blockName ] = line.split('; ')
    let [ rangeStart, rangeEnd ] = range.split('..')
    rangeStart = rangeStart.padStart(6, '0')
    rangeEnd = rangeEnd.padStart(6, '0')
    blocks.push({ blockName, rangeStart, rangeEnd })
  })
  buffer.on('end', () => {
    let outFile = fs.createWriteStream(outputFilepath, {encoding: 'utf8'})
    outFile.once('open', () => {
      console.log('Saving blocks as %s …', outputFilepath)
      outFile.write(JSON.stringify(blocks))
    })
  })
  return buffer
}

fs.createReadStream('UnicodeData.txt', {encoding: 'utf8'}).pipe(unicodeDataParser('UnicodeData.json'))
fs.createReadStream('Blocks.txt', {encoding: 'utf8'}).pipe(blocksParser('Blocks.json'))
