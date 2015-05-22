var Prism = require('prismjs');
var content = require('./content');
var demos = require('./demos');

var PRE_REGEX = /<pre>((?:\n|.)*)<\/pre>/;
// var PRE_ALL_REGEX = /<pre>((?:\n|.)*)<\/pre>/g;

var slides = content.map(function (value) {
    var demoKey = typeof value === 'object' ? Object.keys(value)[0] : null;

    var slide = {
        content: demoKey ? value[demoKey] : value,
    };

    var chunks;

    if (slide.content.indexOf('<pre>') > -1) {
        chunks = slide.content.split('</pre>');
        slide.content = '';

        while (chunks.length > 1) {
            slide.content += chunks.shift().concat('</pre>').replace(PRE_REGEX, highlightPre);
        }

        slide.content += chunks.pop();
    }

    if (demoKey && demos[demoKey]) {
        slide.demo = demos[demoKey];
    }

    return slide;
});

function highlightPre(match, g1) {
    return '<code class="Slide-contentCode language-javascript">' +
        Prism.highlight(g1, Prism.languages.javascript) +
    '</code>';
};

module.exports = slides;
