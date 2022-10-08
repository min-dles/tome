const loadedFrames = []
const hoverFunc = e => {
    const anchor = e.target.firstElementChild.href
    const currentFrame = loadedFrames.find(frame => frame.src === anchor)
    if (currentFrame) {
        currentFrame.style.top = `${e.clientY}px`;
        currentFrame.style.left = `${e.clientX}px`;
    } else {
        const ifrm = document.createElement("iframe")
        console.log('hoooover', e)
        ifrm.setAttribute("src", anchor);
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        ifrm.style.position = "absolute";
        ifrm.style.top = `${e.clientY}px`;
        ifrm.style.left = `${e.clientX + 10}px`;
        loadedFrames.push(ifrm)
        e.target.appendChild(ifrm);
    }
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