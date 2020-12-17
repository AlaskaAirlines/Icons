const { resolve, normalize } = require('path');
const { readdir } = require('fs').promises;
const fs = require('fs');
const path = require('path');

async function* getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });

  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);

    if (dirent.isDirectory()) {
      yield* getFiles(normalize(res));
    } else {
      yield res.replace(/\\/g, '/');
    }
  }
}

const getFile = (filePath) => {
    const dirs = filePath.split('/');

    return dirs[dirs.length -1];
}

const buildElements = (sortedIcons) => {

    let allCategories = '';

    for(let category in sortedIcons) {
      let iconPaths = sortedIcons[category];
      let elements = "";

      iconPaths.forEach(i => {
          const file = getFile(i);
          elements += `
            <div class="block" title="${file}">
              <img src="../dist/icons/${category}/${file}" alt="">
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

const getCategory = (iconPath) => {

  const iconAndDist = iconPath.split('icons/')[1];
  let category = '';

  if(iconAndDist.includes('/')) category = iconAndDist.split('/')[0];

  return category;
}


(async () => {
  const icons = [];
  for await (const file of getFiles('./dist/icons')) {
    const currentPath = path.join(__dirname, '../dist')

    if(file.includes('.svg')) icons.push(file.split(currentPath)[1]);
  }

  const sortedIcons = {};

  icons.forEach(i => {
    const category = getCategory(i);

    if(!sortedIcons[category]) sortedIcons[category] = [];
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
</body>
</html>
    `;

  const dir = './demo';

  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }

  fs.writeFile("./demo/index.html", iconListComponentText, (err) => {

    if(err) return console.log(err);

    console.log("The file was saved!");
  });

})()
