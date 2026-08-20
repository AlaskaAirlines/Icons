const fs = require('fs');
const path = require('path');
const { commonProperties, icons } = require('../src/data/pictograms.json');
const { getDistFilename } = require('../scripts/utils.js');

icons.forEach(iconRaw => {
  // category lives in commonProperties for this collection, so merge it in
  // the same way generate.js does before resolving the dist filename.
  const icon = { ...commonProperties, ...iconRaw };
  let filename = getDistFilename(icon);
  let subject = require(`../dist/${filename}.js`);

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

  test(`${icon.name} has a "viewBox"`, () => {
    // viewBox is a per-item property in pictograms.json (not commonProperties),
    // so it is the field most likely to be dropped if the merge regressed.
    expect(typeof subject.viewBox).toBe('string');
  });

  test(`${icon.name} has an "svg"`, () => {
    expect(typeof subject.svg).toBe('string');
  });

  test(`${icon.name} preserves its brand fills`, () => {
    // Pictograms carry their own palette; the build must not strip the
    // explicit hex fills Design delivered (e.g. fill="#0074CA").
    expect(subject.svg).toMatch(/fill="#[0-9A-Fa-f]{3,6}"/);
  });

  test(`${icon.name} is not recolored with currentColor`, () => {
    // Unlike UI icons, pictograms must not have fill:currentColor injected
    // onto the root <svg>, which would tint any non-explicit fills.
    expect(subject.svg).not.toMatch(/fill:\s*currentColor/i);
  });

  test(`${icon.name} uses fluid width, not min-width`, () => {
    // Pictograms are fluid (width: 100%) and must emit plain `width` so they
    // can shrink inside constrained flex/grid parents; `min-width` would
    // prevent shrinking and overflow the container.
    expect(subject.svg).toMatch(/style="[^"]*\bwidth:\s*100%/);
    expect(subject.svg).not.toMatch(/min-width/);
  });

  test(`${icon.name} namespaces its internal ids to avoid collisions`, () => {
    // Figma exports generic ids (e.g. clip0_1429_2007) and SVGO keeps them
    // (cleanupIds: false). The build must prefix every id — and every
    // url(#…) reference — with the icon name so two different pictograms on
    // one page can't collide.
    const ids = [...subject.svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
    ids.forEach(id => {
      expect(id.startsWith(`${icon.name}__`)).toBe(true);
    });

    const refs = [...subject.svg.matchAll(/url\(#([^)]+)\)/g)].map(m => m[1]);
    refs.forEach(ref => {
      expect(ref.startsWith(`${icon.name}__`)).toBe(true);
    });
  });

  test(`${icon.name} emits a parseable .mjs entry`, () => {
    // docs/pictograms.md advertises the .mjs file as the preferred import
    // entry, so guard the generate.js branch that writes it.
    const mjsPath = path.join(__dirname, `../dist/${filename}.mjs`);
    expect(fs.existsSync(mjsPath)).toBe(true);

    const mjs = fs.readFileSync(mjsPath, 'utf8');
    expect(mjs).toMatch(/^export default \{/);

    // The default export must be the same icon object as the .js entry.
    const exported = JSON.parse(mjs.replace(/^export default /, '').replace(/;\s*$/, ''));
    expect(exported.name).toBe(subject.name);
    expect(exported.svg).toBe(subject.svg);
  });
});
