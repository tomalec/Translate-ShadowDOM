# ShadowDOM-V1-to-V0 [![Build Status](https://travis-ci.org/tomalec/ShadowDOM-V1-to-V0.svg?branch=master)](https://travis-ci.org/tomalec/ShadowDOM-V1-to-V0)

Set of utilities to transform Shadow DOM v1 to v0.
Usefull when writing "hybrid" Web Components which are V1 redy,but run in v0 environment/polyfill


### Small sample

If you have Shadow DOM prepared for V1
```html
<div class="shadow-host">
    <p slot="my-slot">I want to be distributed as in V1</p>
</div>
<template>
    <h2>Shadow DOM prepared for V1</h2>
    <slot name="my-slot"></slot>
</template>
```
You can now use it in your current app/element running on V0 environment (like current [webcomponentsjs polyfill](https://github.com/webcomponents/webcomponentsjs))
```javascript
let sRoot = myElement.createShadowRoot();
sRoot.innerHTML = ShadowDOMV1toV0.replaceSlotsWithContentInString(compositionString);
// or if you already have it parsed as document fragment
ShadowDOMV1toV0.replaceSlotsWithContentInString(documentfragment);
```
To get
```html
<template>
    <h2>Shadow DOM prepared for V1</h2>
    <content select="[slot='my-slot']"></content>
</template>
```
So, it would get rendered as you would expect in V1:
```html
<div class="shadow-host">
    <h2>Shadow DOM prepared for V1</h2>
    <p slot="my-slot">I want to be distributed as in V1</p>
</div>
```


## Related custom elements

 - [`<juicy-composition>`](https://github.com/Juicy/juicy-composition) - applies Document Fragment to Shadow DOM

## Features

 - Translates strings,
 - Modifies `DocumentFragment`s,
 - Preserves attributes,
 - Translates CSS

## Install


Install the component using [Bower](http://bower.io/):

```sh
$ bower install shadowdom-v1-to-v0 --save
```
[npm](https://www.npmjs.com/)
```sh
$ npm install shadowdom-v1-to-v0 --save
```

Or [download as ZIP](https://github.com/Starcounter/shadowdom-v1-to-v0/archive/master.zip).


## API

#### ShadowDOMV1toV0.replaceSlotsWithContentInString(_String_ `compositionString`) : _String_

Translates the HTML given in string, replacing all `<slot name="foo">smth</slot>` with `<content select="[slot='foo']">smth</content>`

#### ShadowDOMV1toV0.replaceSlotWithContent(_HTMLElement_ `slot`) : _ContentElement_

Replaces given `SlotElement` (or `UnknownElement` `<slot>`) with ContentElement (`<content>`).

#### ShadowDOMV1toV0.replaceSlotsWithContent(_HTMLElement | DocumentFragment_ `root`) : _HTMLElement | DocumentFragment_

Replaces all `SlotElement`s (or `UnknownElement`s `<slot>`) with `ContentElement`s (`<content>`) in given `root`

#### ShadowDOMV1toV0.replaceSlottedWithContent(_String_ `styleString`) : _String_

Replaces `::slotted(.foo)` with `::content .foo` in given string.

## Test suite

 - local browser `./test/index.html`
 - [online](http://tomalec.github.io/shadowdom-v1-to-v0/test)

## Contributing

 1. Fork it!
 2. Create your feature branch: `git checkout -b my-new-feature`
 3. Commit your changes: `git commit -m 'Add some feature'`
 4. Push to the branch: `git push origin my-new-feature`
 5. Open corresponding issue if needed
 6. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/tomalec/shadowdom-v1-to-v0/releases).

## License

MIT
