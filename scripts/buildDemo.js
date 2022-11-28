const fs = require('fs');
const path = require("path");
const { readdir } = require('fs').promises;

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      yield* getFiles(path.normalize(res));
    } else {
      yield res;
    }
  }
}

const buildElements = (sortedIcons) => {

  let allCategories = '';

  for (let category in sortedIcons) {
    let iconPaths = sortedIcons[category];
    let elements = "";

    iconPaths.forEach(i => {
      const file = path.basename(i);
      elements += `
        <div class="block" title="${file}">
          <img src="./dist/icons/${category}/${file}" alt="">
          <p>${file}</p>
        </div>
      `
    });

    allCategories += `
      <section>
        <h2 class="icon-category">${category}</h2>
        <div class="iconsWrapper">
          ${elements}
        </div>
      </section>
    `;
  }

  return allCategories;
}

const buildLogos = (logos) => {

  let elements = "";

  logos.forEach(i => {
    const file = path.basename(i);
    elements += `
      <div class="block block--large" title="${i}">
        <img src="./dist/logos/${file}" alt="">
        <p>${i}</p>
      </div>
    `
  });

  return elements;
}

const buildRestricted = (logos) => {
  let elements = "";

  logos.forEach(i => {
    const file = path.basename(i);
    elements += `
      <div class="block block--large" title="${i}">
        <img src="./dist/restricted/${file}" alt="">
        <p>${i}</p>
      </div>
    `
  });

  return elements;
}

const getCategory = (iconPath) => {
  const iconAndDist = iconPath.split(`icons${path.sep}`)[1];
  let category = '';
  if (iconAndDist.includes(path.sep)) category = iconAndDist.split(path.sep)[0];

  return category;
}


(async () => {
  const currentPath = path.join(__dirname, '..', 'dist');

  const icons = [];
  const iconPath = path.join(__dirname, "..", 'dist', 'icons');
  for await (const file of getFiles(iconPath)) {
    if (file.includes('.svg')) icons.push(file.split(currentPath)[1]);
  }

  const logos = [];
  const logoPath = path.join(__dirname, "..", 'dist', 'logos');
  for await (const file of getFiles(logoPath)) {
    if (file.includes('.svg')) logos.push(file.split(currentPath)[1]);
  }

  const restricted = [];
  const restrictedPath = path.join(__dirname, "..", 'dist', 'restricted');
  for await (const file of getFiles(restrictedPath)) {
    if (file.includes('.svg')) restricted.push(file.split(currentPath)[1]);
  }

  const sortedIcons = {};

  icons.forEach(i => {
    const category = getCategory(i);

    if (!sortedIcons[category]) sortedIcons[category] = [];
    sortedIcons[category].push(i);
  });

  const iconListComponentText = `
<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Icons demo page</title>
  <link rel="stylesheet" href="https://unpkg.com/@alaskaairux/design-tokens@latest/dist/tokens/CSSCustomProperties.css">

  <style>
    .block {
      font-size: 12px;
      padding: 10px 20px;
      margin: 0 1rem 1rem 1rem;
      width: 100px;
      background-color: var(--auro-color-base-gray-100);
      border-radius: 10px;
      text-align: center;
    }

    .block--large {
      width: 200px;
    }

    .iconsWrapper {
      display: flex;
      flex-wrap: wrap;
    }
  </style>

</head>
<body>
  <section>
    ${buildElements(sortedIcons)}
  </section>
  <section>
    <h2 class="icon-category">Logos</h2>
    <div class="iconsWrapper">
      ${buildLogos(logos)}
    </div>
  </section>

  <section>
    <h2 class="icon-category">Restricted</h2>
    <div class="iconsWrapper">
      ${buildRestricted(restricted)}
    </div>
  </section>
</body>
</html>
    `;

  const dir = './demo';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFile("./demo/index.html", iconListComponentText, (err) => {

    if (err) return console.log(err);

    console.log("The file was saved!");
  });

})()
