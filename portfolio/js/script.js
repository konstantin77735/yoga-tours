$(function () {

    setInterval(() => {
        let p = document.querySelector('.preloader');

        p.style.opacity = 0;

        setTimeout(() => {
            p.style.display = 'none';
        }, 2500); //должно быть 2500

    }, 2500);

    //Прелоадер будет минимум 1с 

    //СТРЕЛКА ВВЕРх 38 и W - 87ьщ
    //СТРЕЛКА ВНИЗ 40 и S - 83
    //пробел - 32, стрелка вправо 39 и D - 68
    //стрелка влево - 37 и A - 65
    //ESC - 27 и ENTER - 13
    //цифра 1 = 49; цифра 2 = 50; цифра 3 = 51; цифра 4 = 52
    //цифра 1 на numlk = 97; 2 на numlk = 98; 3 на numlk = 99; 4 numlk = 100

    let tab = {
            noScrolling: true,
            waitingTime: 2000, //СТАВЬ НЕ МЕньше 2.5сек
            tabsNum: 4,
            currentTab: 0,
            switcherWrap: document.querySelector('.switcher'),
            tabsSwitchers: document.querySelectorAll('.switcher__item'),
            tabsItems: document.querySelectorAll('.tab-item'),
            inputs: document.querySelectorAll('.form_input'),
            isFocused: false,
            popupIsVisible: false,
            start: function () {

                let that = this,
                    startingX,
                    startingY;

                if (sessionStorage.getItem('currentTab')) {
                    showTab(sessionStorage.getItem('currentTab'));
                    that.currentTab = sessionStorage.getItem('currentTab');
                } else {
                    showTab(0);
                }

                this.inputs.forEach(function (itm, indx) {
                    itm.addEventListener('focus', function () {
                        that.isFocused = true;
                    });
                    itm.addEventListener('blur', function () {
                        that.isFocused = false;
                    });
                });


                function showTab(i) {
                    sessionStorage.setItem('currentTab', i);
                    for (let z = 0; z < that.tabsItems.length; z++) {
                        that.tabsSwitchers[z].style.background = '#ddd';
                    }

                    that.tabsSwitchers[i].style.background = 'red';
                    that.tabsItems[i].scrollIntoView({
                        behavior: "smooth"
                    });


                }

                function changeCurrentTabNum(thing, event) {
                    if (!event) {
                        switch (thing) {



                            case 49:
                            case 97:
                                if (that.isFocused == false) {
                                    that.currentTab = 0;
                                    showTab(that.currentTab);
                                }
                                break;
                            case 50:
                            case 98:
                                if (that.isFocused == false) {
                                    that.currentTab = 1;
                                    showTab(that.currentTab);
                                }
                                break;

                            case 51:
                            case 99:
                                if (that.isFocused == false) {
                                    that.currentTab = 2;
                                    showTab(that.currentTab);
                                }
                                break;

                            case 52:
                            case 100:
                                if (that.isFocused == false) {
                                    that.currentTab = 3;
                                    showTab(that.currentTab);
                                }
                                break;

                                //W, arrowUP, pageUP
                            case 38:
                            case 87:
                            case 33:

                                if (that.currentTab != 0) {
                                    that.currentTab--;
                                    showTab(that.currentTab);
                                }
                                break;
                                //S, arrowDOWN, pageDOWN
                            case 40:
                            case 83:
                            case 34:
                                if (that.currentTab != 3) {
                                    that.currentTab++;
                                    showTab(that.currentTab);
                                }
                                break;
                            case 0:
                            case 1:
                            case 2:
                            case 3:
                                showTab(thing);
                                break;
                        }
                    } else {

                        if (thing < 0 && that.currentTab >= 0 && that.currentTab < 3 && that.noScrolling == true) {
                            that.noScrolling = false;
                            that.currentTab++;

                            showTab(that.currentTab);

                        }
                        if (thing > 0 && that.currentTab > 0 && that.currentTab <= 3 && that.noScrolling == true) {
                            that.noScrolling = false;
                            that.currentTab--;


                            showTab(that.currentTab);
                        }
                    }

                }

                function caller() {


                    if (that.popupIsVisible == false) {
                        //console.log(`that.popupIsVisible = ${that.popupIsVisible}`);
                        //      that.switcherWrap.classList.add('disabled');
                        changeCurrentTabNum(event.wheelDelta, 1);
                        that.noScrolling = false;
                        //console.log(`noScrolling = ${that.noScrolling}`);
                        document.removeEventListener('wheel', caller);
                        document.removeEventListener('mousewheel', caller);

                        setTimeout(function () {
                            //        that.switcherWrap.classList.remove('disabled');

                            that.noScrolling = true;

                            //  console.log(`SetTimeout сработал. noScrolling = ${that.noScrolling}`);

                        }, that.waitingTime);

                        setTimeout(function () {
                            document.addEventListener('mousewheel', caller);
                            document.addEventListener('wheel', caller);
                        }, that.waitingTime + 800); //увеличиваем время, чтобы не было лишнего второга скролла

                    }


                }

                let htm = document.querySelector('.about-me__description');
                document.addEventListener('wheel', caller);
                document.addEventListener('mousewheel', caller);




                document.addEventListener('touchstart', TouchStart);
                document.addEventListener('touchmove', TouchMove);
                document.addEventListener('touchend', TouchEnd);

                function TouchStart(event) {
                    startingX = event.touches[0].clientX;
                    startingY = event.touches[0].clientY;
                }

                function TouchMove(event) {
                    event.preventDefault();
                    let touch = event.touches[0];


                    changeX = startingX - touch.clientX,
                        changeY = startingY - touch.clientY;

                    if (changeY < 0) {
                        return;
                    }


                }

                function TouchEnd(event) {


                    let changeX = startingX - event.changedTouches[0].clientX,
                        changeY = startingY - event.changedTouches[0].clientY,
                        thresholdX = screen.width / 3,
                        thresholdY = screen.height / 3.5;

                    if (changeY < -thresholdY || changeY > thresholdY) {

                        if (changeY < 0) {
                            if (that.currentTab != 0) {
                                that.currentTab--;
                                showTab(that.currentTab);
                            }
                        } else {


                            if (that.currentTab != 3) {
                                that.currentTab++;
                                showTab(that.currentTab);
                            }
                        }


                    }

                }

                this.tabsSwitchers.forEach(function (switcher, index) {
                    switcher.addEventListener('click', function () {

                        that.currentTab = index;

                        changeCurrentTabNum(index);

                    })
                    switcher.addEventListener('touchstart', function (e) {

                        that.currentTab = index;

                        changeCurrentTabNum(index);

                    })

                });



                document.addEventListener('keydown', function (e) {


                    changeCurrentTabNum(e.keyCode);

                });


            }

        },
        visualEffects = {
            titles: document.querySelectorAll('.title'),
            subtitles: document.querySelectorAll('.subtitle'),
            twoDots: document.querySelectorAll('.two-dots'),
            wrap: document.querySelectorAll('.wrap'),
            hover: document.querySelectorAll('.hover'),
            watchLinks: document.querySelectorAll('.watch'),
            popup: document.querySelector('.popup'),
            popupClose: document.querySelector('.popup__close'),



            portfolioItems: document.querySelectorAll('.portfolio__item'),
            portfolioOverlays: document.querySelectorAll('.portfolio__overlay'),
            popupOverlay: document.querySelector('.overlay'),
            start: function () {
                let that = this,
                    deletedHoverClassWas,
                  //  $textError = $('.error-wrap'),
                    //errorFadeTime = 3000,
                    $moreLink = $('.more-wrap'),
                    popupFadeTime = 500,
                    popupImg = document.querySelector('.popup__img'),
                    popupWrap = document.querySelector('.popup__content'),
                    popupLink = document.querySelector('.popup__go');

                popupLink.addEventListener('mouseover', function () {
                    popupLink.style.opacity = '.9';

                });
                popupLink.addEventListener('mouseleave', function () {
                    popupLink.style.opacity = '.6';

                });


                popupImg.addEventListener('mouseenter', function (e) {
                    popupLink.style.opacity = '.55';
                });
                popupImg.addEventListener('mouseleave', function (e) {
                    popupLink.style.opacity = '0';
                });

                that.watchLinks.forEach(function (link, indx) {
                    link.addEventListener('click', ShowPopup);
                    link.addEventListener('touchstart', ShowPopup);
                });
                that.popupOverlay.addEventListener('click', HidePopup);
                that.popupOverlay.addEventListener('touchstart', HidePopup);



    $("form").submit(function (e) { //Change
        var th = $(this),
            text = document.querySelector('textarea'), 
            $textError = $('.error-wrap'),
            errorFadeTime = 3000;
   
        $.ajax({
            type: "POST",
            url: "../php/mail.min.php", //Change
            data: th.serialize()
        }).done(function () {

            if (text.value.trim().length > 50) {
                setTimeout(function () {
                    // Done Functions
                    th.trigger("reset");
                }, 1000);
            }
        });

        e.preventDefault();
    
        switch (true) {
            case (text.value.trim().length === 0):

                $('.error__text').html('Пожалуйста, напишите сообщение...');
                $textError.css("opacity", "1");
                setTimeout(function () {
                    $textError.css("opacity", "0");
                }, errorFadeTime);
                break;

            case (text.value.trim().length > 0 && text.value.trim().length < 50):
                $('.error__text').html('Пожалуйста, напишите подробнее...');
                $textError.css("opacity", "1");
                setTimeout(function () {
                    $textError.css("opacity", "0");
                }, errorFadeTime);
                break;
            default: //успешный сабмит
                $textError.css("opacity", "0");
                console.log(`форма отправлена`);
                break;
        };
    });

                function ShowPopup(e) {
                    tab.popupIsVisible = true;
                    //    console.log(`popupIsVisible = ${tab.popupIsVisible}`);
                    tab.noScrolling = false;
                    e.preventDefault();
                    let imgForLink = this.parentNode.parentNode.previousElementSibling,
                        linkHREF = this.nextElementSibling.querySelector('a').getAttribute('href'),
                        imgForLinkSRC = imgForLink.getAttribute('src'),
                        imgForLinkHeight = imgForLink.getAttribute('height');


                    console.log(`img for link = ${imgForLink}, link href = ${linkHREF}, img for link SRC = ${imgForLinkSRC}, img for link HEIGHT = ${imgForLinkHeight}, popupImg SRC = ${imgForLinkSRC}`);
                    popupImg.setAttribute("src", imgForLinkSRC);
                    if (window.innerWidth <= 1080) {
                        popupImg.setAttribute("height", `${parseInt(imgForLinkHeight,10) / 2 +'%'}`);
                    } else {
                        popupImg.setAttribute("height", imgForLinkHeight);
                    }
                    popupLink.setAttribute("href", linkHREF);



                    that.popup.style.display = 'flex';

                    setTimeout(function () {
                        that.popup.classList.add('active');
                    }, popupFadeTime);
                }

                function HidePopup(e) {

                    //   console.log(`noScrolling = ${tab.noScrolling}; popupIsVisble = ${tab.popupIsVisible}`);
                    if (e.target.classList.contains('overlay') || e.target.classList.contains('popup__close')) {


                        tab.popupIsVisible = false;
                        tab.noScrolling = true;
                        that.popup.classList.remove('active');

                        setTimeout(function () {
                            that.popup.style.display = 'none';
                        }, popupFadeTime);
                    }
                }
              

                $('.more-wrap__link').append('<img src="img/arrow.svg" class="show-link" alt = "стрелка" style="position: absolute; right: -18px;">');
                $('.more-wrap__link').append('<img src="img/arrow-red.svg" class="show-link link-r" alt = "стрелка" style="position: absolute; right: -18px; transition: opacity .15s linear;">');

                $moreLink.on('mouseover', function () {
                    $('.link-r').css('opacity', '1');
                });
                $moreLink.on('mouseout', function () {
                    $('.link-r').css('opacity', '0');
                });



                this.portfolioItems.forEach(function (itm, indx) {
                    function showOrHidePortfolioItemOverlay(show, touchstart) {
                        if (show) {
                            that.portfolioOverlays[indx].style.opacity = '1';
                            if (touchstart) {
                                setTimeout(function () {
                                    that.portfolioOverlays[indx].style.opacity = '0';
                                }, 6000);
                            }
                        } else {
                            that.portfolioOverlays[indx].style.opacity = '0';
                        }
                    }
                    itm.addEventListener('mouseenter', showOrHidePortfolioItemOverlay.bind(null, 'show'));
                    itm.addEventListener('touchstart', showOrHidePortfolioItemOverlay.bind(null, 'show', 'touchstart'));
                    itm.addEventListener('mouseleave', showOrHidePortfolioItemOverlay.bind(null, null));
                });



                this.subtitles.forEach(function (itm, indx) {

                    itm.addEventListener('mouseover', function (e) {
                        that.twoDots[indx].style.color = '#f00';
                    });
                    itm.addEventListener('mouseout', function (e) {
                        that.twoDots[indx].style.color = '#333';
                    });
                });
                this.wrap.forEach(function (title, indx) {


                    title.addEventListener('touchstart', function (e) {
                        e.preventDefault();
                        (e.target.classList.contains('wrapR')) ?
                        (
                            that.titles[indx].style.color = "#fff",
                            e.target.classList.remove('wrapR'),
                            that.hover[indx].classList.remove('hoverR'), deletedHoverClassWas = 'hoverR') :
                        (that.titles[indx].style.color = "#fff",
                            e.target.classList.remove('wrapL'),
                            that.hover[indx].classList.remove('hoverL'), deletedHoverClassWas = 'hoverL'
                        );


                    });

                    document.addEventListener('touchend', function (e) {
                        e.preventDefault();

                        (deletedHoverClassWas == 'hoverR') ? (that.hover[indx].classList.add('hoverL'), e.target.classList.add('wrapL'), that.titles[indx].style.color = "#444") : (that.hover[indx].classList.add('hoverR'), e.target.classList.add('wrapR'), that.titles[indx].style.color = "#444");
                    });

                    title.addEventListener('mouseenter', function (e) {

                        that.titles[indx].style.color = "#fff"; //делаем текст белым
                        (e.target.classList.contains('wrapR')) ?
                        (
                            e.target.classList.remove('wrapR'),
                            that.hover[indx].classList.remove('hoverR'), deletedHoverClassWas = 'hoverR'
                        ) : (
                            e.target.classList.remove('wrapL'),
                            that.hover[indx].classList.remove('hoverL'), deletedHoverClassWas = 'hoverL'
                        );

                    });

                    title.addEventListener('mouseleave', function (e) {

                        that.titles[indx].style.color = "#444";
                        (deletedHoverClassWas == 'hoverR') ? (that.hover[indx].classList.add('hoverL'), e.target.classList.add('wrapL')) : (that.hover[indx].classList.add('hoverR'), e.target.classList.add('wrapR'));

                    });
                });


            }
        },
        slider = {
            firstIndx: 0,
            secondIndx: 1,
            slidesWrapper: document.querySelector('.portfolio__wrapper'),
            slides: document.querySelectorAll('.portfolio__item'),
            arrowR: document.querySelector('.arrowR'),
            arrowL: document.querySelector('.arrowL'),
            start: function () {
                let that = this,
                    lastSlide = that.slides.length - 1,
                    penultSlide = that.slides.length - 2,
                    sameTime = 200;

                function changeSlides(first, second) {

                    that.slides.forEach(function (itm, indx) {
                        itm.classList.remove('active');

                        setTimeout(function () {
                            itm.style.display = 'none';


                        }, sameTime);
                        setTimeout(function () {
                            that.slides[first].style.display = 'block';
                            that.slides[second].style.display = 'block';
                        }, sameTime * 2);
                        setTimeout(function () {
                            that.slides[first].classList.add('active');
                            that.slides[second].classList.add('active');
                        }, sameTime * 3);



                    });
                }

                this.arrowR.addEventListener('touchstart', function (e) {
                    if (that.firstIndx == penultSlide && that.secondIndx == lastSlide) {
                        that.firstIndx = 0;
                        that.secondIndx = 1;
                        changeSlides(that.firstIndx, that.secondIndx);
                    } else {
                        that.firstIndx += 2;
                        that.secondIndx += 2;
                        changeSlides(that.firstIndx, that.secondIndx);
                    }
                    e.preventDefault();
                });
                this.arrowL.addEventListener('touchstart', function (e) {
                    if (that.firstIndx == 0 && that.secondIndx == 1) {
                        that.firstIndx = penultSlide;
                        that.secondIndx = lastSlide;
                        changeSlides(that.firstIndx, that.secondIndx);
                    } else {
                        that.firstIndx -= 2;
                        that.secondIndx -= 2;
                        changeSlides(that.firstIndx, that.secondIndx);
                    }
                });
            }
        },
        time = 1250,
        text = `^${time*2}Привет, меня зовут Константин.^${time}\nМне нравится заниматься разработкой,^${time}\nдизайном, вёрсткой и обслуживанием сайтов^${time}\n`,
        typed = new Typed('.animation-line', {
            strings: [text],
            typeSpeed: 25
        });


    tab.start();
    visualEffects.start();
    slider.start();

});
