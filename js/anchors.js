$(document).ready(function () {
    const anchors = document.querySelectorAll('a[href*="#"]');

    for (let a of anchors) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            const blockID = a.getAttribute('href');
            document.querySelector('' + blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

});
