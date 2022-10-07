const themeDir = __dirname + '/../../';

const purgecss = require('@fullhuman/postcss-purgecss')({
    // see https://gohugo.io/hugo-pipes/postprocess/#css-purging-with-postcss
    content: [
        './hugo_stats.json',
        themeDir + '/hugo_stats.json',
        'exampleSite/hugo_stats.json',
        themeDir + 'layouts/**/*.html',
        themeDir + 'exampleSite/content/**/*.html',
        'layouts/**/*.html',
        'content/**/*.html',
    ],
    safelist : [ /type/ ],
    // This is the function used to extract class names from your templates
    defaultExtractor: content => {
        // Capture as liberally as possible, including things like `h-(screen-1.5)`
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []

        // Capture classes within other delimiters like .block(class="w-1/2") in Pug
        const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []

        return broadMatches.concat(innerMatches)
    }
})

module.exports = {    
    plugins: [
        require('postcss-import')({
            path: [themeDir]
            }),
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('autoprefixer')({
            path: [themeDir]
        }),
        ...(process.env.HUGO_ENVIRONMENT === 'production' ? [purgecss] : [])
    ]
}
