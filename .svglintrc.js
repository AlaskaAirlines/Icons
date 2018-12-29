module.exports = {
    rules: {
        elm: {
            "svg": 1,
            "svg > title": 1
        },
        attr: [
            { // ensure that the SVG element has the appropriate attributes
                "role": "img",
                "aria-hidden": true,
                "aria-labelledby": true,
                "viewBox": true,
                "class": true,
                "version": "1.1",
                "xmlns:xlink": "http://www.w3.org/1999/xlink",
                "xmlns": "http://www.w3.org/2000/svg",
                "fill": false,
                "style": false,
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
            },
            { // ensure that the title element has the appropriate attributes
                "id": true,

                "rule::selector": "svg > title",
                "rule::whitelist": true
            },
            { // ensure that a g element has the appropriate attributes
                "fill": false,
                "style": false,
                "id": false,

                "rule::selector": "svg g"
            },
            { // ensure that a path element has the appropriate attributes
                "fill": false,
                "style": false,
                "id": false,

                "rule::selector": "svg path"
            }
        ]
    }
};
