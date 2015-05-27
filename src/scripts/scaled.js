const regex = /(.*)/
const cache = {}

export default function scaled(selector, width, height) {
	const style = document.createElement('style')

	if (cache[selector]) { return }

	function rescale() {
		const scale = Math.min(window.innerWidth / width, window.innerHeight / height)
		const properties = (`transform:scale(${scale});`).replace(regex, '-webkit-$1-ms-$1$1')

		if (style.sheet.cssRules.length > 0) {
			style.sheet.deleteRule(0)
		}

		if ('addRule' in style.sheet) {
			style.sheet.addRule(selector, properties)
		} else {
			style.sheet.insertRule(`${selector}\{${properties}\}`, 0)
		}
	}

	cache[selector] = style
	style.appendChild(document.createTextNode(''))
	document.head.appendChild(style)

    window.addEventListener('resize', rescale)
    rescale()
}
