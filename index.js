new fullpage('#fullpage', {
    scrollBar: true,
    autoScrolling: true,
});


function onScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const images = document.querySelectorAll('#animation img');

    const totalAnimationHeight = Array.from(images).reduce((acc, element) => acc + element.clientHeight, 0);
    const startTop = Math.floor(windowHeight / 2 - totalAnimationHeight / 2);

    // Set height of first ball
    const ballHeight = Math.max(250 - winScroll, 72);
    const startBallTop = Math.floor(windowHeight / 2 - ballHeight / 2);
    images[0].style.height = ballHeight.toString() + 'px';

    // Set top of all elements
    let animationHeight = 0;
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        if (i === 0) {
            // Needs a drawing to make sense
            element.style.top = Math.min(startBallTop, startTop + windowHeight - Math.min(windowHeight, winScroll)).toString() + 'px';
        } else {
            element.style.top = Math.max(i * windowHeight + animationHeight + startTop - winScroll, animationHeight + startTop).toString() + 'px'
        }
        animationHeight += element.clientHeight;
    }
}

/**
 * Animation
 */
document.addEventListener('scroll', onScroll);
onScroll();
