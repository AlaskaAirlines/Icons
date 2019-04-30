const { icons } = require('../src/data/orion-icons.json');
const orionIcons = require('../dist/index.js');

icons.forEach(icon => {
  const subject = orionIcons[icon.title];

  test(`${icon.title} has a "title"`, () => {
    expect(typeof subject.title).toBe('string');
  });

  test(`${icon.title} has an "svg"`, () => {
    expect(typeof subject.svg).toBe('string');
  });
});
