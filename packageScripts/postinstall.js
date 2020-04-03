'use strict';

const chalk = require('chalk');
const pjson = require('../package.json');

// check for installed version of dependency
const installedhyperlink = pjson.dependencies['@alaskaairux/ods-hyperlink'] || pjson.devDependencies['@alaskaairux/ods-hyperlink'];
// const devInstalledhyperlink = pjson.devDependencies['@alaskaairux/ods-hyperlink'];
const hyperlinkRequiredVersion = '^1.4.4'

console.log(chalk.hex('#f26135')(`
╭ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ──────────────────────────────╮

        Thanks for installing the latest version
                of `) + chalk.hex('#ffd200').bold(`Auro Icons v${pjson.version}.`) + chalk.hex('#f26135')(`

╰─────────────────────────────── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─╯
`)
);

if (installedhyperlink < hyperlinkRequiredVersion) {
  console.log(chalk.hex('#f26135')(`
╭ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ──────────────────────────────╮

                   !!!!! ALERT !!!!!

        It's been detected that you are running
                  `) + chalk.hex('#ffd200').bold(`ods-hyperlink v${installedhyperlink}.`) + chalk.hex('#f26135')(`
            `) + chalk.hex('#ffd200').bold(`ods-hyperlink v${hyperlinkRequiredVersion}`) + chalk.hex('#f26135')(` is required.

            npm update @alaskaairux/ods-hyperlink

╰─────────────────────────────── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─╯
`))
}
