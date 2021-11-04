const isDesktop = window.matchMedia("(min-width: 1000px)").matches;


if (isDesktop) {
    new fullpage('#fullpage', {
        scrollBar: true,
        autoScrolling: true,
    });
}


function onClickImg(i) {
    console.log('click')
    window.scrollTo({
      top: i * document.getElementById('home-text').clientHeight,
      left: 0,
      behavior: 'smooth'
    });
}


function onScroll() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    let images;
    if (isDesktop) {
        images = document.querySelectorAll('#animation img');
    } else {
        images = document.querySelectorAll('#animation-mobile img');
    }

    const totalAnimationHeight = Array.from(images).reduce((acc, element) => acc + element.clientHeight, 0);
    const totalAnimationWidth = Array.from(images).reduce((acc, element) => acc + element.clientWidth, 0);
    const startTop = Math.floor(windowHeight / 2 - totalAnimationHeight / 2);
    const startRight = Math.floor(windowWidth / 2 - totalAnimationWidth / 2);

    // Set height of first ball
    const ballHeight = Math.max(250 - winScroll, 72);
    const startBallTop = Math.floor(windowHeight / 2 - ballHeight / 2);
    const startBallRight = Math.floor(windowWidth / 2 - images[0].clientWidth / 2);
    if (isDesktop) {
        images[0].style.height = ballHeight.toString() + 'px';
    }

    // Set top/right of all elements
    let animationHeight = 0;
    let animationWidth = 0;
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        if (isDesktop) {
            if (i === 0) {
                // Needs a drawing to make sense
                element.style.top = Math.min(startBallTop, startTop + windowHeight - Math.min(windowHeight, winScroll)).toString() + 'px';
            } else {
                element.style.top = Math.max(i * windowHeight + animationHeight + startTop - winScroll, animationHeight + startTop).toString() + 'px'
            }
            animationHeight += element.clientHeight;
        } else {
            element.style.top = ((102 - element.clientHeight) / 2).toString() + 'px';
            if (i === 0) {
                // Needs a drawing to make sense
                element.style.left = Math.min(startBallRight, startRight + windowWidth - Math.min(windowWidth, Math.floor(windowWidth * (winScroll / windowHeight)))).toString() + 'px';
            } else {
                element.style.left = Math.floor(Math.max(i * windowWidth + animationWidth + startRight - Math.floor(windowWidth * (winScroll / windowHeight)), animationWidth + startRight)).toString() + 'px'
            }
            animationWidth += element.clientWidth;
        }
    }
}

/**
 * Animation
 */
document.addEventListener('scroll', onScroll);
onScroll();
