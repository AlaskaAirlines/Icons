const { icons } = require('../src/data/icons.json');
const { getDistFilename } = require('../scripts/utils.js');

icons.forEach(icon => {
  let filename = getDistFilename(icon);
  let subject = require(`../dist/icons/${filename}.js`);

  test(`${icon.name} has a "title"`, () => {
    expect(typeof subject.title).toBe('string');
  });

  test(`${icon.name} has a "name"`, () => {
    expect(typeof subject.name).toBe('string');
  });

  test(`${icon.name} has a "desc"`, () => {
    expect(typeof subject.desc).toBe('string');
  });

  test(`${icon.name} has a "style"`, () => {
    expect(typeof subject.style).toBe('string');
  });

  test(`${icon.name} has an "svg"`, () => {
    expect(typeof subject.svg).toBe('string');
  });
});
