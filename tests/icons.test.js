const { icons } = require('../src/data/orion-icons.json');
const { getDistFilename } = require('../scripts/utils.js');

icons.forEach(icon => {
  const filename = getDistFilename(icon);
  const subject = require(`../dist/icons/${filename}.js`);

  test(`${icon.title} has a "title"`, () => {
    expect(typeof subject.title).toBe('string');
  });

  test(`${icon.title} has an "svg"`, () => {
    expect(typeof subject.svg).toBe('string');
  });
});
