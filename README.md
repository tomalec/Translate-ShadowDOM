# Translate-ShadowDOM [![Build Status](https://travis-ci.org/tomalec/Translate-ShadowDOM.svg?branch=master)](https://travis-ci.org/tomalec/Translate-ShadowDOM)

Set of utilities to translate between Shadow DOM v0 and v1 (both ways).
Usefull, when writing "hybrid" Web Components which are V1 ready, but run in V0 environment/polyfill;
or when running legacy code in V1 environment.

### [Live Demo](https://tomalec.github.io/Translate-ShadowDOM/)
[![Online Translator](https://raw.githubusercontent.com/tomalec/Translate-ShadowDOM/master/demo.gif)](https://tomalec.github.io/Translate-ShadowDOM/)

### Small sample

If you have Shadow DOM prepared for V1
```html
<div class="shadow-host">
    <p slot="my-slot">I want to be distributed as in V1</p>
</div>
<template>
    <style>
        ::slotted(p){
            color: green;
        }
    </style>
    <h2>Shadow DOM prepared for V1</h2>
    <slot name="my-slot"></slot>
</template>
```
You can now use it in your current app/element running on V0 environment (like current [webcomponentsjs polyfill](https://github.com/webcomponents/webcomponentsjs))
```javascript
let sRoot = myElement.createShadowRoot();
sRoot.innerHTML = TranslateShadowDOM.v1tov0.html(compositionString);
// or if you already have it parsed as document fragment
TranslateShadowDOM.v1tov0.fragment(documentfragment, true);
```
To get
```html
<template>
    <style>
        ::content>p{
            color: green;
        }
    </style>
    <h2>Shadow DOM prepared for V1</h2>
    <content name="my-slot" select="[slot='my-slot']"></content>
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
 - Translates HTML, CSS and basic JS
 - works both ways between V0 and V1

## Install


Install the component using [Bower](http://bower.io/):

```sh
$ bower install translate-shadowdom --save
```
[npm](https://www.npmjs.com/)
```sh
$ npm install translate-shadowdom --save
```

Or [download as ZIP](https://github.com/Starcounter/translate-shadowdom/archive/master.zip).


## API

### V1 to V0

#### TranslateShadowDOM.v1tov0.html(_String_ `compositionString`) : _String_

Translates the HTML given in string, replacing all `<slot name="foo">smth</slot>` with `<content name="foo" select="[slot='foo']">smth</content>`

#### TranslateShadowDOM.v1tov0.slot(_HTMLElement_ `slot`) : _ContentElement_

Replaces given `SlotElement` (or `UnknownElement` `<slot>`) with `ContentElement` (`<content>`).

#### TranslateShadowDOM.v1tov0.fragment(_HTMLElement | DocumentFragment_ `root`, _Boolean_ `withStyle`, _Boolean_ `withScript`) : _HTMLElement | DocumentFragment_

Replaces all `SlotElement`s (or `UnknownElement`s `<slot>`) with `ContentElement`s (`<content>`) in given `root`.
If `withStyle` is set to true, will also translate CSS selectors in enclosed `<style>` elements.
If `withScript` is set to true, will also translate JS code in enclosed `<script>` elements.

#### TranslateShadowDOM.v1tov0.css(_String_ `styleString`) : _String_

Replaces `::slotted(.foo)` with `::content .foo` in given string.

### V0 to V1

#### TranslateShadowDOM.v0tov1.html(_String_ `compositionString`) : _String_

Translates the HTML given in string, replacing all `<content select="[slot='foo']">smth</content>` with `<slot name="foo">smth</slot>`

#### TranslateShadowDOM.v0tov1.content(_HTMLElement_ `content`) : _SlotElement_

Replaces given `ContentElement` (or `UnknownElement` `<content>`) with `SlotElement` (`<slot>`).
It preserves all attributes **except** `name`.
If selector cannot be directly translated to slot name, default slot would be created.

#### TranslateShadowDOM.v0tov1.fragment(_HTMLElement | DocumentFragment_ `root`, _Boolean_ `withStyle`, _Boolean_ `withScript`) : _HTMLElement | DocumentFragment_

Replaces all `ContentElement`s (or `UnknownElement`s `<content>`) with `SlotElement`s (`<slot>`) in given `root`.
It preserves all attributes **except** `name`.
If selector cannot be directly translated to slot name, default slot would be created.
If `withStyle` is set to true, will also translate CSS selectors in enclosed `<style>` elements.
If `withScript` is set to true, will also translate JS code in enclosed `<script>` elements.

#### TranslateShadowDOM.v0tov1.css(_String_ `styleString`) : _String_

Replaces `::content .foo` with `::slotted(.foo)` in given string.
Adds warnings in code comments if a selector cannot be translated in 100% compatible way,
for example `#i1::content .foo+.bar` will be translated to
`#i1::slotted(.foo)/* FIXME V1 matches only direct children; V1 supports only compound selectors, selector skipped:+.bar;*/`

## Test suite

 - local browser `./test/index.html`
 - [online](http://tomalec.github.io/translate-shadowdom/test)

## Contributing

 1. Fork it!
 2. Create your feature branch: `git checkout -b my-new-feature`
 3. Commit your changes: `git commit -m 'Add some feature'`
 4. Push to the branch: `git push origin my-new-feature`
 5. Open corresponding issue if needed
 6. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/tomalec/translate-shadowdom/releases).

## License

MIT
