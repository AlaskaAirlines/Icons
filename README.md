# Orion SVG Icon Library

The focus of this repository is to manage, at scale, the enterprise need for icons in the Orion Design System. Please see all supporting documentation for contributing to, and consuming icons from the Orion SVG Icon Library.

## Install

All icons are made available via a npm package, to install simply run:

```js
npm i @alaska/orion-icons --save
```

## Node application dependency

Via a node.js dependency or other node like dependency management architecture, developer can choose from two different scenarios for consumption.

### Individual icon request

It is suggested that developers list individual dependencies per UI component, like so:

```js
const arrowDown = require('@alaska/orion-icons/dist/icons/arrowDown');
```

Within the UI component a developer can reference the object assigned to the newly created variable to get the specific icon's SVG code:

```js
console.log(`<button>Click Me ${arrowDown.svg}</button>`);
```

This will return the icon's SVG code from the object, like so:

```html
<button>Click Me <svg class="ico__toggleArrow" role="img" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Arrow Down</title><g><polygon points="4 4 0 0 8 0"></polygon></g></svg></button>
```

### Full library dependency

If there are several icons within a view, developers may opt to include all available icons. **Be aware**, as this npm grows, so will this type of dependency. It's strongly suggested that dependencies are individually declared.

To require the full library as a dependency of the UI, do the following:

```js
const orionIcons = require('@alaska/orion-icons/dist');
```

Then within UI component, a developer can render a specific icon from the output array, like so:

```js
console.log(orionIcons['Arrow Down'].svg);
```

This will return the icon's SVG code from the object, like so:

```html
<svg class="ico__toggleArrow" role="img" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Arrow Down</title><g><polygon points="4 4 0 0 8 0"></polygon></g></svg>
```

## Using Icon styles

In the `dist/` directory is `orion-icons.scss`. Import this Sass file for default shape styles.

```scss
@import: '@alaska/orion-icons/dist/orion-icons';
```

By default, no CSS classes are created when importing this file. To opt-in to the icon styles you need, you need to add a config variable map that will set a flag to `true` to process the classes you want.

```scss
$iconMap: (
  toggleArrow: true,
  chevronRight: true
);
```

### Building CSS in JS

If you prefer to build your CSS in the JS component itself, this is supported in the exported icon object js file. There is a dependency to output CSS Custom Properties from the Orion Design Tokens. See the [Orion Design Token documentation](https://itsals.visualstudio.com/Orion%20Design%20System/_git/designTokens?path=%2FREADME.md&version=GBmaster&_a=preview) to support this process.

Example:

```js
const arrowDown = require('@alaska/orion-icons/dist/icons/arrowDown');

console.log(`
.${arrowDown.style} {
  color: ${arrowDown.color};
  width: ${arrowDown.width};
}
`)
```

This will output the following:

```css
.ico__toggleArrow {
  color: val(--color-brand-blue-atlas);
  width: val(--size-icon-toggle-arrow);
}
```

## Adding Icons

Adding new icons to this repository requires a few steps.

1. Add a new icon `.svg` file to the `icons/` directory (see DOs and DON'Ts below)
1. Add **shape schema** to `orion-icons.json` file (see example below)
1. Run `npm run clean` to clear the repository of old build artifacts
1. Run `npm run build` to create new build artifacts
1. Run `npm run test` to ensure that output artifacts meet specifications
1. Submit pull request for approval

### Icon shape schema

When adding new icons, be sure to follow this example to add the proper data to the `orion-icons.json` file

```js
{
  "title": "[icon title]",
  "color": "[Orion Design Token reference]",
  "width": "[Orion Design Token reference]",
  "style": "[Icon class name]"
}
```

**NEVER**: For `color` and `width` do not use hard-coded values. To be compliant you must use Orion Design Token references.

### Icon guide lines

All new icon pull requests MUST comply with the following specifications. Any pull-request that does not follow these specifications will be considered non-compliant and will be rejected.

1. icon.svg file names must be camelCased, no spaces, dashes or underscores
1. SVG code should be the minimal code to render the SVG

#### DO

Reduce the SVG HTML to only the following attributes;

1. Add CSS class
1. Add `role="img"`
1. Keep `viewBox`
1. Keep `xmlns`
1. Keep `xmlns:xlink`
1. Populate `<title>` tags
1. Keep all necessary `<svg>` elements to render output
1. Reduce HTML to remove all spaces and returns

```html
<svg class="ico__toggleArrow" role="img" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>Arrow Down</title><g><polygon points="4 4 0 0 8 0"></polygon></g></svg>
```

#### DO NOT

Do not include unnecessary specifications, attributes, spaces and returns in the HTML

Never include the following:

1. xml version
1. `width` or `height` hard coded HTML attributes
1. Any auto generated comments
1. Description
1. Any IDs, stroke or fill attributes

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