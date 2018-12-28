module.exports = {
    rules: {
        elm: {
            "svg": 1,
            "svg > title": 1,
            "g": true,
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

                "rule::selector": "svg",
                "rule::whitelist": true
            },
            { // ensure that the title element has the appropriate attributes
                "id": true,

                "rule::selector": "svg > title",
                "rule::whitelist": true
            }
        ]
    }
};
