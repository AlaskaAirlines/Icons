'use strict';

const chalk = require('chalk');
const pjson = require('../package.json');
const iconsData = require('../src/data/icons.json');

const deprecatedIcons = iconsData.icons.filter((icon) => {
  return icon.deprecated;
})

console.log(chalk.hex('#f26135')(`

 _______                   __           __ __
|     __|.---.-.--.--.    |  |--.-----.|  |  |.-----.
|__     ||  _  |  |  |    |     |  -__||  |  ||  _  |
|_______||___._|___  |    |__|__|_____||__|__||_____|
               |_____|
 __              _______                    __
|  |_.-----.    |   _   |.--.--.----.-----.|  |
|   _|  _  |    |       ||  |  |   _|  _  ||__|
|____|_____|    |___|___||_____|__| |_____||__|


╭ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ──────────────────────────────╮

        Thanks for installing the latest version
                of `) + chalk.hex('#ffd200').bold(`Auro Icons v${pjson.version}.

       The following icon(s) have been deprecated
       `) + chalk.hex('#f26135')(`
       \t${deprecatedIcons.map((icon) => {
                return `- ${icon.category}/${icon.name}.svg \n \t`
                }).join('')
       }

       Deprecated icon(s) will be removed with the
        next MAJOR release. You have been warned.

╰─────────────────────────────── ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─╯
`)
);
