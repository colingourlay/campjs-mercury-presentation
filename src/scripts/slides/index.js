var Prism = require('prismjs');
var content = require('./content');
var demos = require('./demos');

var PRE_REGEX = /<pre>((?:\n|.)*)<\/pre>/g;

var slides = content.map(function (value) {
    var demoKey = typeof value === 'object' ? Object.keys(value)[0] : null;

    var slide = {
        content: demoKey ? value[demoKey] : value,
    };

    if (slide.content.indexOf('<pre>') > -1) {
        slide.content = slide.content.replace(PRE_REGEX, function (match, g1) {
            return '<code class="Slide-contentCode language-javascript">' +
                Prism.highlight(g1, Prism.languages.javascript) +
            '</code>';
        });
    }

    if (demoKey && demos[demoKey]) {
        slide.demo = demos[demoKey];
    }

    return slide;
});

module.exports = slides;
