module.exports = scaled;

var stylesheets = {};

function scaled(selector, width, height) {
	if (stylesheets[selector]) { return; }

	function rescale() {
		var scale = Math.min(window.innerWidth / width, window.innerHeight / height);
		var properties = ('transform:scale(' + scale + ');').replace(/(.*)/, '-webkit-$1-ms-$1$1');

		if (sheet.cssRules.length > 0) {
			sheet.deleteRule(0);
		}

		if ('addRule' in sheet) {
			sheet.addRule(selector, properties);
		} else {
			sheet.insertRule(selector + '{' + properties + '}', 0);
		}
	}

	var style = document.createElement('style');

	stylesheets[selector] = style;
	style.appendChild(document.createTextNode(''));
	document.head.appendChild(style);

	var sheet = style.sheet;

    window.addEventListener('resize', rescale);
    rescale();
};
