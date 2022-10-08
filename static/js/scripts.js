// need this for a reference to all loaded iframes, since nodelists aren't easily iterable without making ugly code :(
const loadedFrames = []
const hoverFunc = e => {
    const href = e.target.firstElementChild.href
    const iframeWidth = 69 * 10
    const iframeHeight = 420 * 1
    const ifrm = document.createElement("iframe")
    ifrm.setAttribute("src", href);
    ifrm.style.width = `${iframeWidth}px`;
    ifrm.style.height = `${iframeHeight}px`;
    ifrm.style.position = "absolute";
    ifrm.style.top = `${e.clientY}px`;
    // if mouse is on the right half of page
    const offset = e.clientX > (window.innerWidth / 2) ? iframeWidth : 10
    ifrm.style.left = `${e.clientX - offset}px`;
    loadedFrames.push(ifrm)
    e.target.appendChild(ifrm);
}

const leaveFunc = e => {
    if(e.target.lastElementChild.src === e.target.firstElementChild.href) {
        const index = loadedFrames.indexOf(e.target.lastElementChild)
        if(index > -1) {
            loadedFrames.splice(index, 1)
        }
        e.target.removeChild(e.target.lastElementChild)
    }

}

window.addEventListener('DOMContentLoaded', e => {
    const articles = document.body.querySelectorAll('.content > article h3')
    articles.forEach(article => article.addEventListener('mouseenter', hoverFunc, false))
    articles.forEach(article => article.addEventListener('mouseleave', leaveFunc, false))
})