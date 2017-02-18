/**
 * Set of utilities to transform Shadow DOM v1 to v0.
 * Usefull when writing "hybrid" Web Components which are V1 redy,
 * but run in v0 environment/polyfill
 * @license MIT
 */
const TranslateShadowDOM = {
    /**
     * Utils to translate from V1 to V0
     */
    v1tov0: {
        /**
        * Replaces all <slot> tags with <content>,
        *  preserves all attributes, translates selector to slot name
        * @param  {String} string stringified HTML
        * @return {String}        translated HTML
        */
        html: function(string){
            return string.replace(/<\/slot(\s*)>/gi,'</content$1>')
                        .replace(/<slot([^>]+)(name=(?:"([^"]*)"|'([^']*)'))([^>]*)>/gi,'<content$1$2$5 select=\"[slot=\'$3$4\']\">')
                        .replace(/<slot(\s*|\s+[^>]*)>/gi,'<content$1>');
        },
        /**
        * Replaces single SlotElement with ContentElement,
        *  preserves all attributes, translates selector to slot name
        * @param  {SlotElement} slot
        * @return {ContentElement}
        */
        slot: function(slot) {
            var content = slot.ownerDocument.createElement('content');
            while (slot.firstChild) {
                content.appendChild(slot.firstChild);
            }
            var attrs = slot.attributes;
            for (var i=0; i<attrs.length; i++) {
                var attr = attrs[i];
                content.setAttribute(attr.name, attr.value);
            }
            var name = slot.getAttribute('name');
            if (name) {
                content.setAttribute('select', '[slot=\'' + name + '\']');
            }
            slot.parentNode.replaceChild(content, slot);
            return content;
        },
        /**
        * Replace all <slot> elements with <content> elements i given document fragment
        * @param  {Documentfragment|Node} root scope. Will be changed.
        * @return {Documentfragment|Node}      modified scope
        */
        fragment: function(root) {
            if (root.firstChild) {
                var node = root.firstChild;
                while (node) {
                    var next = node.nextSibling;
                    if (node.localName == 'slot') {
                        node = TranslateShadowDOM.v1tov0.slot(node);
                    }
                    node = next;
                }
            }
            return root;
        },
        /**
        * Replaces all ::slotted() tags with ::content
        * @param  {String} string stringified CSS
        * @return {String}        translated CSS
        */
        css: function(string) {
            return string.replace(/::slotted\(([^\)]*)\)/gi,'::content $1');
        }
    }
}

if (typeof module !== 'undefined') {
  module.exports = TranslateShadowDOM;
  // export default TranslateShadowDOM;
}
