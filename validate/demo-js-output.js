const arrowDown = require('../dist/icons/arrowdown');

arrowDown.svg = arrowDown.svg.replace(/aria-hidden="true"/g, `aria-hidden="false"`);

console.log(arrowDown.svg);

console.log(`
  .${arrowDown.style} {
    fill: ${arrowDown.color};
    width: ${arrowDown.width};
  }
`)
