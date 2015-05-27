import {highlight, languages} from 'prismjs'
import content from './content'
import demos from './demos'

const PRE_REGEX = /<pre>((?:\n|.)*)<\/pre>/

export default content.map((value) => {
    const demoKey = typeof value === 'object' ? Object.keys(value)[0] : null
    const slide = {content: demoKey ? value[demoKey] : value}
    let chunks

    if (slide.content.indexOf('<pre>') > -1) {
        chunks = slide.content.split('</pre>')
        slide.content = ''

        while (chunks.length > 1) {
            slide.content += chunks.shift().concat('</pre>').replace(PRE_REGEX, highlightPre)
        }

        slide.content += chunks.pop()
    }

    if (demoKey && demos[demoKey]) {
        slide.demo = demos[demoKey]
    }

    return slide
})

function highlightPre(match, g1) {
    const code = highlight(g1, languages.javascript)

    return `<code class="Slide-contentCode language-javascript">${code}</code>`
}
