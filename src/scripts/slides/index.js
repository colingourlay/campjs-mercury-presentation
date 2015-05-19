var Prism = require('prismjs');
var content = require('./content');
var demos = require('./demos');

var slides = content.map(function (fn) {
    var slide = {
        content: multiline(fn),
    };

    if (slide.content.indexOf('<pre>') > -1) {
        slide.content = slide.content.replace(
            /<pre>((?:\n|.)*)<\/pre>/g,
            function (match, g1) {
                return '<code class="Slide-contentCode language-javascript">' +
                    Prism.highlight(g1, Prism.languages.javascript) +
                '</code>';
            }
        );
    }

    if (fn.name && demos[fn.name]) {
        slide.demo = demos[fn.name];
    }

    return slide;
});

module.exports = slides;

function multiline(fn) {
    return fn.toString()
        .replace(/^[^\/]+\/\*!?/, '')
        .replace(/\*\/[^\/]+$/, '')
        .trim();
}
