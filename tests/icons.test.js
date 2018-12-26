const { icons } = require('../data/orion-icons.json');
const { titleToFilename } = require('../scripts/utils.js');

icons.forEach(icon => {
  const filename = titleToFilename(icon.title);
  const subject = require(`../dist/icons/${filename}.js`);

  test(`${icon.title} has a "title"`, () => {
    expect(typeof subject.title).toBe('string');
  });

  test(`${icon.title} has a "hex" value`, () => {
    expect(typeof subject.hex).toBe('string');
    expect(subject.hex).toHaveLength(6);
  });

  test(`${icon.title} has a "source"`, () => {
    expect(typeof subject.source).toBe('string');
  });

  test(`${icon.title} has an "svg"`, () => {
    expect(typeof subject.svg).toBe('string');
  });
});
