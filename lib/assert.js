'use strict';
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

/**
 * Assert component render matches the expectedHTML
 * @method assertRender
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {String} expectedHTML can contain wildcards "+" or "*"
 *
 * @example
 * // The code bellow will raise an error unless the component renders
 * // a div with any attributes and the string "something" inside any
 * // inner element.
 * assertRender(MyComponent, {}, "<div+>*something*</div>");
 **/
function assertRender(Component, props, expectedHTML) {
    var expected = React
        .renderToString(React.createElement(Component, props))
        .replace(/\s+data\-react[-\w]+\=[^>\s]+/g, '');

    var regEx = new RegExp(expectedHTML
        .replace(/\*/g, '.*')
        .replace(/\+/g, '[^<>]+')
        .replace(/\s+/g, ' ')
        .replace(/[<>\/\\]/g, '\\$&'));

    assert(
        regEx.test(expected),
        'Expected: ' + expected + ' to match: ' + regEx
    );
}

/**
 * Assert component render includes the expectedHTML
 * @method assertRenderInclude
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {String} expectedHTML can contain wildcards "+" or "*"
 *
 * @description
 * this is just a helper to call that will call assertRender
 * with "*" before and after the expectedHTML.
 *
 * @example
 * // Both lines bellow will do exactly the same thing
 * assertRenderInclude(MyComponent, {}, '<p>hi, dude</p>');
 * assertRender(MyComponent, {}, '*<p>hi, dude</p>*');
 **/
function assertRenderInclude(Component, props, expectedHTML) {
    assertRender(Component, props, '*' + expectedHTML + '*');
}

module.exports = {
    renderMatch: assertRender,
    renderInclude: assertRenderInclude
}
