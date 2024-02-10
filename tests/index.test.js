const { icons } = require('../src/data/icons.json');
const auroIcons = require('../dist/index_es5.js');

icons.forEach(icon => {
  const subject = auroIcons[icon.name];

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
