[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionIcons.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionDesignTokens)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/orion-icons.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/orion-icons.svg?color=blue)

# SVG Icon Library

The focus of this repository is to manage, at scale, the enterprise need for icons in the new Auro Design System and deprecate any legacy items. Please see all supporting documentation for contributing to, and consuming icons from the Orion SVG Icon Library.

## Supported icons

All currently supported icons are located in the `icons/` directory.

## Install

```bash
$ npm i @alaskaairux/orion-icons
```

## Icon styles

Icon styles are inheriting from Auro Design Tokens. Any reference to the following import is deprecated and should be discontinued.

```scss
@import `./node_modules/@alaskaairux/alaskaairux/orion-icons/dist/tokens/TokenProperties`
```

Be sure that you are importing the new Auro tokens. Import the CSS directly: 

```javascript
import '@alaskaairux/orion-design-tokens/dist/tokens/CSSTokenProperties.css';
```

Or via Sass import:

```
@import "~@alaskaairux/orion-design-tokens/dist/tokens/SCSSTokenProperties";
```

##### HTML will reference variables
```html
<svg role="img" aria-hidden="true" style="width: var(--auro-size-lg); height: var(--auro-size-lg); fill: currentColor" class="ico_squareLarge" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Warning</title>
  <desc>Up pointer</desc>
  <style></style>
  <g>
    <polygon points="15 14 12 10 9 14"></polygon>
  </g>
</svg>
```

If the user support matrix requires support for browsers that do not support CSS Custom Properties, see the fallback Sass solution below.


### Using Sass styles (IE fallback)

For use in situations where CSS custom properties are not supported. In the `dist/` directory is `icons.scss`. Import this Sass file for default shape styles.

__`orion-icons.scss` is deprecated, please reference `icons.scss`.__

```scss
@import '@alaskaairux/orion-icons/dist/icons';
```

Within React, Sass requires a `~` character prior to the importing library, example:

```scss
@import '~@alaskaairux/orion-icons/dist/icons';
```

#### DEPRECATION WARNING! 

__NOTE: This process has been deprecated!__ 

__Due to Auro updates, sizes are uniform. There is no longer a need to have individual selectors. If you are using these selectors, simply remove the reference to `$iconMap` to discontinue use.__

By default, no CSS classes are created when importing this file. To opt-in to the icon styles needed, add a config variable map, prior to import, that will set a flag to `true` to output the classes needed. See the following example:

```scss
$iconMap: (
  toggleArrow: true,
  chevronArrow: true,
  classiccheckmark: true,
) ;

@import '~@alaskaairux/orion-icons/dist/icons';
```

The use of `icons.scss` has a dependency on the Sass version of Orion Design Tokens, so a typical Sass file may look like the following:

```scss
@import '~@alaskaairux/orion-design-tokens/dist/tokens/TokenVariables';

$iconMap: (
  toggleArrow: true,
  chevronArrow: true,
  classiccheckmark: true
);

@import '~@alaskaairux/orion-icons/dist/orion-icons';
```

This will produce the CSS Custom Properties needed to produce the UI, as well provide a CSS fallback for browsers that do not support CSS Custom Properties.

### Using Icons/Tokens within a LitElement Custom Element

When using Icons within the scope of a LitElement Custom Element, the `CSSTokenProperties.css` file can to be referenced within the scope of the shadow DOM. To do this, the CSS needs to be wrapped in a JavaScript module.

Add the following line to the head of the Custom Element document:

```javascript
import iconProperties from '@alaskaairux/orion-icons/dist/tokens/CSSTokenProperties-css.js';
```

Within the `render()`, then within the `return html` template literal, add the following:

```javascript
${iconProperties}
```

This will inset the Token output within the scope of the shadow DOM Custom Element and render the appropriate values per the CSS Custom Properties.

In this case, Orion Icons are a direct dependency of the custom element.

#### Using Icon Properties outside the shadow DOM

It is not necessary to load the Icon CSS custom properties within the scope of the shadow DOM. As long as the variables are made available from the global scope of the project, the CSS custom properties will pierce the shadow DOM and style the icons.

In this case, the Orion Icons should be noted as a peer dependency with install instructions at the global level.

## Categories 

Icons fall into a series of use categories, these are:

```
├── alert
├── interface
├── payment
├── social
├── terminal
```

For the purposes of backwards compatibility, legacy icons will **NOT** be categorized and deprecated. 

## Node application dependency

Via a node.js dependency or other node like dependency management architecture, developer can choose from two different scenarios for the rendering of the SVG. This technique will render the SVG inline from the designated resource location.

### Individual icon request

It is suggested that developers list individual dependencies per UI component, like so:

```javascript
const warning = require('@alaskaairux/orion-icons/dist/icons/alert/warning');
```

Within the UI component a developer can reference the object assigned to the newly created variable to get the specific icon's SVG code:

```javascript
<button>Click Me ${warning.svg}</button>
```

This will return the icon's SVG HTML inline.

### Altering the SVG output

Using either method, the SVG is captured as an object that can be manipulated. For example, calling the `warning.js` file as shown below ...

```javascript
const warning = require('@alaskaairux/orion-icons/dist/icons/alert/warning');
```

... will output the following HTML

```html
<svg role="img" aria-hidden="true" style="fill: currentcolor; width: var(--auro-size-lg);  height: var(auro-size-lg)" class="ico_squareLarge" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Warning</title>
  <g>
    <polygon points="4 4 0 0 8 0"></polygon>
  </g>
</svg>
```

Adding the following line of JavaScript will find and replace the `aria-hidden` attribute in the `warning.svg ` string ...

```javascript
warning.svg = warning.svg.replace(/aria-hidden="true"/g, `aria-hidden="false"`);
```

... and then output the following:

```html
<svg role="img" aria-hidden="false" style="fill: currentcolor; width: var(--auro-size-lg);  height: var(--auro-size-lg)" class="ico_squareLarge" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Warning</title>
  <g>
    <polygon points="4 4 0 0 8 0"></polygon>
  </g>
</svg>
```

## JavaScript framework support

When using other JavaScript development frameworks, the process above may not parse to HTML. To address this, there are a few techniques that could be used.

Within the npm, `@alaskaairux/orion-icons/dist/icons/`, developers may access the SVGs directly for consumption into the development environment.

### JS versions of SVGs

This repo output two types of JS wrapped SVGs for easy inclusion with front-end frameworks.

##### Default style - iconName.js

```javascript
module.exports={ ... }
```

##### ES6 style - iconName_es6.js

```javascript
export default { ... }
```

In most cases, the default exported JS file will work. But in some cases, the ES6 style module export is required. Simply point to the resource needed for use.

### Lit-element

Lit-element requires the ES6 module export syntax for use, so an example dependency reference would be:

```javascript
import warning from '@alaskaairux/orion-icons/dist/icons/alert/warning_es6.js';
```

Parsing out the SVG HTML to become DOM requires lines of code within the scope of the new custom element class, for example:

```javascript
constructor() {
  this.dom = new DOMParser().parseFromString(warning.svg, 'text/html');
  this.svg = this.dom.body.firstChild;
}
```

Now that the SVG DOM is assigned to the `this.svg` variable, rendering this within the HTML render() template could be like the following:

```html
<p>${this.svg}</p>
```

### React

React supports a standard for linking to assets and using them within the context of a component.

```javascript
import warning from '@alaskaairux/orion-icons/dist/icons/alert/warning.svg';
```

Within the component's `render()` function, passing in the new variable into the `src` attribute of an `<img>` element will render the asset.

```html
<img src={warning} alt="warning" />
```

### SVG React Loader

Using `svg-react-loader` in combination with webpack will render the SVG inline from the designated resource location.

```javascript
import warning from '-!svg-react-loader!@alaskaairux/orion-icons/dist/icons/alert/warning.svg';
```

Within the component's `render()` function, simply reference the new component that is generated via `svg-react-loader`.

```html
<warning />
```

With SVG React Loader, users are also able to over-ride attributes within the SVG. For example, the following code illustrates how a user could over-ride the `role="img"` and `aria-hidden="true"` attributes:

```html
<warning role="group" aria-hidden="false"/>
```

##### Note:

The above syntax may cause issues with your eslint configurations. The following error may appear:

```bash
Unexpected '!' in '-!svg-react-loader?name=Icon!@alaskaairux/orion-icons/dist/icons/alert/warning.svg'. Do not use import syntax to configure webpack loaders
```

In this event, adding the following comments within the component may address the issue:

```javascript
// eslint-disable-next-line import/no-webpack-loader-syntax
import Arrowdown from '-!svg-react-loader?name=Icon!@alaskaairux/orion-icons/dist/icons/alert/warning.svg';
```

### Angular SVG Icon

For use with Angular projects, `angular-svg-icon` renders a component that will render the SVG inline from the designated resource location.

See [angular-svg-icon](https://www.npmjs.com/package/angular-svg-icon) for more information.


## Adding Icons

Adding new icons to this repository requires a few steps.

1. Add a new icon `.svg` file to the `src/icons/` directory (see DOs and DON'Ts below)
1. Add **shape schema** to `./src/data/icons.json` file (see example below)
1. Submit pull request for approval

### Test new icon SVG code

Be sure to test your new SVG code. There is a template HTML file in this project. Please follow the directions below to copy the file and run a local server. DO NOT edit the template file.

From the root of the project, run:

```bash
$ cd validate
$ cp icons.template icons.html
$ open icons.html
```

### Icon shape schema

When adding new icons, be sure to follow this example to add the proper data to the `icons.json` file

```javascript
{
  "commonProperties":
  {
      "hidden": "true",
      "role": "img",
      "color": "currentColor",
      "PngColor": "var(--color-type-theme-light-link)",
      "PngSize": 24,
      "width": "var(--size-icon-square-lg)",
      "height": "var(--size-icon-square-lg)"
  },
  "icons": [
    {
      "title": "Arrow Up",
      "desc": "Up pointer",
      "style": "ico__toggleArrow",
      "category": "interface"
    }
  ]
}
```

**Discouraged**: For `color` and `width` do not use hard-coded values. To be compliant you must use Orion Design Token references.

### Icon guidelines

All new icon pull requests MUST comply with the following specifications. Any pull-request that does not follow these specifications will be considered non-compliant and will be rejected.

1. icon.svg file names must be camelCased, no spaces, dashes or underscores
1. SVG code should be the minimal code to render the SVG

#### DO

Reduce the SVG HTML to only the following attributes;

1. Set `<title>` specifically to `<title>iconTitle</title>`
1. Set `<desc>` specifically to `<desc>iconDesc</desc>`
1. Set `<style></style>`
1. Keep all necessary `<svg>` elements to render output

```html
<svg>
  <title>iconTitle</title>
  <desc>iconDesc</desc>
  <style></style>
  <g>
    <polygon points="43.9886686 48 24 27.9721836 4.01133144 48 0 44.0611961 19.9886686 23.9666203 0.0679886686 3.93880389 4.14730878 0 24 19.961057 43.8526912 0 47.9320113 3.93880389 27.9433428 23.9666203 48 44.0611961"></polygon>
  </g>
</svg>
```

#### DO NOT

Do not include unnecessary specifications, attributes, spaces and returns in the HTML

Never include the following:

1. xml version
1. `width` or `height` hard coded HTML attributes
1. Any auto generated comments
1. Description, unless title is unable to describe the intent of the SVG image/icon
1. Any IDs, stroke or fill attributes, unless required for the complexity of the SVG image/icon

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg width="8px" height="4px" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
    <title>Arrow Down</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Arrow-Down" fill="#0074C8">
            <polygon id="Path" points="4 4 0 0 8 0"></polygon>
        </g>
    </g>
</svg>
```

## npm API

The following scripts are available from `./package.json`

| script | Description |
|----|----|
| svgTest | runs `jest` to ensure that `index.js` and `./data/icons.json` are formatted correctly |
| jsonlint | validates that `./data/orion-icons.json` is correctly formatted JSON |
| svglint | validates all SVGs per spec `./.svglintrc.js`|
| test | runs jsonlint and svglint |
| copySass | build step to copy resource |
| newbuild | to execute `./scripts/build.js` |
| png@2x | build PNG files from SVGs |


## Thanks!

This project was forked from, and inspired by [simple-icons](https://github.com/simple-icons). On the shoulder's of giants, open-source projects help and inspire us all to do better things!
