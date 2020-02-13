module.exports = {
    rules: {
        elm: {
            "svg": 1,
            "svg > title": 1,
            "svg > desc": 1
        },
        attr: [{ // ensure that the SVG element has the appropriate attributes
            "role": "img",
            "aria-hidden": true,
            "aria-labelledby": false,
            "viewBox": true,
            "class": true,
            "version": false,
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns": "http://www.w3.org/2000/svg",
            "fill": false,
            "style": true,
            "xmlns:dc": false,
            "xmlns:cc": false,
            "xmlns:rdf": false,
            "xmlns:svg": false,
            "xmlns:sodipodi": false,
            "xmlns:inkscape": false,
            "x": false,
            "y": false,

            "rule::selector": "svg",
            "rule::whitelist": true
        }, { // ensure that the title element has the appropriate attributes

            "rule::selector": "svg > title",
            "rule::whitelist": true
        }, { // ensure that a g element has the appropriate attributes
            "style": false,
            "fill": false,
            "id": false,

            "rule::selector": "svg g"
        }, { // ensure that a path element has the appropriate attributes
            "style": false,
            "fill": false,

            "rule::selector": "svg path"
        }]
    }
};
