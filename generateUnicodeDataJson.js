#!/usr/bin/env node
// Inspired by https://github.com/eversport/node-unicodetable/blob/master/generate.js

const fs  = require('fs'),
      path = require('path'),
      BufferStream = require('bufferstream')

const INPUT_FILEPATH = 'UnicodeData.txt',
      OUTPUT_FILEPATH = 'UnicodeData.json'

// http://www.ksu.ru/eng/departments/ktk/test/perl/lib/unicode/UCDFF301.html
const KEYS =  ['value', 'name', 'category', 'class',
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
    let character = {},
        values = line.toString().split(';')
    for(var i = 0 ; i < 15 ; i++)
        character[KEYS[i]] = values[i]
    character.symbol = escapeUnicodeChar(character.value)
    let index = parseInt(character.value, 16)
    return { index, character }
}

const parser = () => {
    var data = {},
        buffer = new BufferStream({encoding:'utf8', size:'flexible'})
    buffer.split('\n', (line) => {
        let {index, character} = parseLine(line)
        data[index] = character
    })
    buffer.on('end', () => {
        let outFile = fs.createWriteStream(OUTPUT_FILEPATH, {encoding:'utf8'});
        outFile.once('open', () => {
            console.log('Saving data as %s …', OUTPUT_FILEPATH)
            outFile.write(JSON.stringify(data))
        })
    })
    return buffer
}

fs.createReadStream(INPUT_FILEPATH, {encoding:'utf8'}).pipe(parser())
