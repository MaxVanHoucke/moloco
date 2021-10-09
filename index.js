new fullpage('#fullpage', {
    scrollBar: true,
    autoScrolling: true,
});


/**
 * Animation
 */
document.addEventListener('scroll', function (e) {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const images = document.querySelectorAll('#animation img');

    // Set height of first ball
    const ballHeight = Math.max(300 - winScroll, 72);
    images[0].style.height = ballHeight.toString() + 'px';

    // Set top of all elements
    for (let i = 0; i < images.length; i++) {
        const element = images[i];
        const elementTop = parseInt(element.dataset.h);
        element.style.top = Math.max(i * windowHeight + elementTop - winScroll, elementTop).toString() + 'px'
    }
});

