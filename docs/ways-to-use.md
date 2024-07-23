# Ways to use Auro Icons

In its simplest definition, Auro Icons is a directory of SVGs. How you or your team decide how to use the icons is purely up to you. Here are some really easy ways to make use of Auro Icons in your project.

## The auro-icon element

The [auro-icon](/components/auro/icon) element is probably the most straight forward way to use icons. The icons are broken down into a handful of categories. Alert, in-flight, interface, payment, shop, social, and terminal. Here are some basic examples.

<div class="exampleWrapper">
  <auro-icon category="alert" name="error">Icon: error</auro-icon>
  <auro-icon category="in-flight" name="seat">Icon: error</auro-icon>
  <auro-icon category="interface" name="home-filled">Icon: home</auro-icon>
</div>

```html
<auro-icon category="alert" name="error">Icon: error</auro-icon>
<auro-icon category="in-flight" name="seat">Icon: seat</auro-icon>
<auro-icon category="interface" name="home-filled">Icon: home</auro-icon>
```

### Change the color and size

All icons come with a baseline color, `var(--auro-color-icon-primary-on-light)`, but this is easily over-written with the `customColor` attribute of the element. The same goes for changing the default size of the icon as well, using the `customSize` attribute.

<div class="exampleWrapper">
  <auro-icon
    category="terminal"
    name="plane-diag-fill"
    customColor
    style="color: orange">
  </auro-icon>
</div>

<div class="exampleWrapper">
  <auro-icon
    style="width: 10rem"
    customSize
    category="terminal"
    name="plane-diag-fill">
  </auro-icon>
</div>

```html
<auro-icon
  category="terminal"
  name="plane-diag-fill"
  customColor
  style="color: orange">
</auro-icon>

<auro-icon
  style="width: 10rem"
  customSize
  category="terminal"
  name="plane-diag-fill">
</auro-icon>
```

## From the CDN

If needed, you can get the icon directly from a CDN location. A great example of this is with CSS. There may be times when you are working with a 3rd party vendor and you do not have access to the DOM or any underlying code and typically only have access to CSS for styling.

In this example, the color and size is changed using CSS.

<style>
.box {
  width: 100px;
  height: 60px;
}

.icon {
  position: relative;
}

.icon:after {
  position: absolute;
  content: '';
  width: 50px;
  height: 50px;
  background-color: red;
  -webkit-mask-image: url('https://unpkg.com/@alaskaairux/icons@latest/dist/icons/interface/heart-filled.svg');
  mask-image: url('https://unpkg.com/@alaskaairux/icons@latest/dist/icons/interface/heart-filled.svg');
}
</style>

<div class="exampleWrapper">
  <div class="box">
    <div class="icon"></div>
  </div>
</div>

```html
<style>
  .icon {
    position: relative;
  }

  .icon:after {
    position: absolute;
    content: '';
    width: 50px;
    height: 50px;
    background-color: red;
    -webkit-mask-image: url('https://unpkg.com/@alaskaairux/icons@latest/dist/icons/interface/heart-filled.svg');
    mask-image: url('https://unpkg.com/@alaskaairux/icons@latest/dist/icons/interface/heart-filled.svg');
  }
</style>

<div class="icon"></div>
```

## Embed with litElement

When working with HTML custom elements and litElement, you can inject the dependency of the icon into the scope of your element. For example, using the `chevron-right` icon. Also note that there are slightly different JS wrappers for the icons, e.g. in this context we want to use the `ES6/SSR` compatible version.

```js
import chevronRight from '@alaskaairux/icons/dist/icons/interface/chevron-right.mjs';
```

Next we need a simple function that will take the icon's name as an argument. This function will take the string of the SVG from the icon object in the npm, convert it to HTML DOM and append to the DOM node assigned in the template.

```js
generateIconHtml(svgContent) {
  const dom = new DOMParser().parseFromString(svgContent, 'text/html'),
  svg = dom.body.firstChild;

  return svg
}
```

Last, use this function and the named icon in your HTML template. Notice the assignment of `svg` to the `chevronLeft` object to get the SVG code. This is NOT a reference to a SVG file.

```html
<button>
  ${this.generateIconHtml(chevronLeft.svg)}
</button>
```

## The npm and your framework

The Auro Icon library, in its entirety, can be installed into the scope if your app. Simply follow the [install instructions](https://auro.alaskaair.com/icons/install).

Doing this, it's up to your framework on how that works. React, Angular and Vue all have their own opinions on how to do this.
