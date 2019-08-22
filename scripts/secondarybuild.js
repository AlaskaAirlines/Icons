// This build is required to output a standard :root{} element, versus the :host{}
// custome version output in the primary build script

const LocalTokens = require('style-dictionary').extend('./scripts/tokensConfig.json');
LocalTokens.buildPlatform('CSSCustomProperties');

console.log('')
console.log('         .         . ')
console.log('               *       *')
console.log('')
console.log('                 * * *')
console.log('                    !')
console.log('               *       * ')
console.log('')
