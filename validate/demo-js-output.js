const classicCheckmark = require('../dist/icons/classiccheckmark');

classicCheckmark.svg = classicCheckmark.svg.replace(/aria-hidden="true"/g, `aria-hidden="false"`);

console.log(classicCheckmark.svg);

console.log(`
  .${classicCheckmark.style} {
    fill: ${classicCheckmark.color};
    width: ${classicCheckmark.width};
  }
`)
