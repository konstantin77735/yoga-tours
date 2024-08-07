$(document).ready(function () {
    const anchors = document.querySelectorAll('a[href*="#"]');
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const blockID = anchor.getAttribute('href');
            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }
    let currentNumber = 0,
        arrayOfHeaderTabs = document.querySelectorAll('.info-header-tab'),
        arrayOfTabsContent = document.querySelectorAll('.info-tabcontent'),
        countDownDate = new Date('Dec 31, 2020 00:00:00').getTime(),
        countDownFunction = setInterval(function () {
            let currentTime = new Date().getTime(),
                distance = countDownDate - currentTime,
                days = Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds = Math.floor((distance % (1000 * 60)) / 1000),
                daysSpan = document.querySelector('.days'),
                hoursSpan = document.querySelector('.hours'),
                minutesSpan = document.querySelector('.minutes'),
                secondsSpan = document.querySelector('.seconds');
            daysSpan.textContent = days;
            hoursSpan.textContent = hours;
            minutesSpan.textContent = minutes;
            secondsSpan.textContent = seconds
        }, 1000);
    arrayOfHeaderTabs.forEach(function (item, index) {
        arrayOfHeaderTabs[index].addEventListener('click', function () {
            if (arrayOfHeaderTabs[index] != currentNumber) {
                hideOtherTabs(currentNumber);
                currentNumber = index;
                arrayOfTabsContent[currentNumber].classList.remove('fade');
                setTimeout(function () {
                    arrayOfTabsContent[currentNumber].style.visibility = 'visible';
                    arrayOfTabsContent[currentNumber].style.opacity = 1
                }, 50)
            }
        })
    });

    function hideOtherTabs(a) {
        for (let i = a; i < arrayOfHeaderTabs.length; i++) {
            arrayOfTabsContent[i].style.visibility = 'hidden';
            arrayOfTabsContent[i].style.opacity = 0;
            arrayOfTabsContent[i].classList.add('fade')
        }
    }
    let popupBtn1 = document.querySelectorAll('.description-btn'),
        popupBtn2 = document.querySelector('.more'),
        popupClose = document.querySelector('.popup-close'),
        popupSubmit = document.querySelector('.popup-form__btn'),
        popupInput = document.querySelector('.popup-form__input '),
        overlay = document.querySelector('.overlay');

    function showOrHidePopup() {
        if (overlay.classList.contains('fade')) {
            overlay.classList.remove('fade');
            setTimeout(function () {
                overlay.style.visibility = 'visible';
                overlay.style.opacity = 1
            }, 270)
        } else {
            overlay.style.visibility = 'hidden';
            overlay.style.opacity = 0;
            setTimeout(function () {
                overlay.classList.add('fade')
            }, 270)
        }
    }

    function getValueOfPopupInput() {
        let plus = popupInput.value.indexOf('+'),
            seven = popupInput.value.indexOf('7');
        if (popupInput.value.length === 12 && plus === 0 && seven === 1) {
            showOrHidePopup()
        }
    }
    popupBtn1.forEach(function (item, index) {
        AddListener(popupBtn1[index], 'click', showOrHidePopup)
    });
    AddListener(popupBtn2, 'click', showOrHidePopup);
    AddListener(popupClose, 'click', showOrHidePopup);
    AddListener(overlay, 'click');
    AddListener(popupSubmit, 'click', getValueOfPopupInput);
    AddListener(document, 'keydown');

    function AddListener(elem, event, func) {
        if (func) {
            elem.addEventListener(event, func)
        } else {
            elem.addEventListener(event, function (e) {
                if (e.target == overlay || (e.type == 'keydown' && 27 === e.keyCode && !overlay.classList.contains('fade'))) {
                    showOrHidePopup()
                }
            })
        }
    }
    const counter = {
        touristsAndDays: document.querySelectorAll('.counter-block-input'),
        place: document.querySelector('.counter-block-selects'),
        totalValue: document.querySelector('.counter-block-total'),
        touristsSum: 0,
        restDaysSum: 0,
        totalSum: 0,
        priceMumbai: 4000,
        priceKerala: 6000,
        priceVaranasi: 9000,
        price: 4000,
        startCounting: function () {
            let that = this;
            that.place.addEventListener('change', checkPlace);
            for (let k in that.touristsAndDays) {
                try {
                    that.touristsAndDays[k].addEventListener('change', function () {
                        that.touristsSum = that.touristsAndDays[0].value;
                        that.restDaysSum = that.touristsAndDays[1].value;
                        let parsedTouristsSum = parseInt(that.touristsSum, 10),
                            parsedRestDaysSum = parseInt(that.restDaysSum, 10);
                        if (that.touristsSum != 0 && that.restDaysSum != 0 && that.touristsSum != '' && that.restDaysSum != '') {
                            that.totalSum = (parsedTouristsSum + parsedRestDaysSum) * that.price;
                            that.totalValue.innerHTML = that.totalSum
                        } else {
                            that.totalValue.textContent = ''
                        }
                    })
                } catch {}
            }

            function checkPlace() {
                let optionValue = parseInt(that.place.options[this.selectedIndex].value, 10);
                switch (optionValue) {
                    case 1:
                        that.price = that.priceMumbai;
                        that.totalSum = (parseInt(that.touristsSum, 10) + parseInt(that.restDaysSum, 10)) * that.price;
                        that.totalValue.innerHTML = that.totalSum;
                        break;
                    case 2:
                        that.price = that.priceKerala;
                        that.totalSum = (parseInt(that.touristsSum, 10) + parseInt(that.restDaysSum, 10)) * that.price;
                        that.totalValue.innerHTML = that.totalSum;
                        break;
                    case 3:
                        that.price = that.priceVaranasi;
                        that.totalSum = (parseInt(that.touristsSum, 10) + parseInt(that.restDaysSum, 10)) * that.price;
                        that.totalValue.innerHTML = that.totalSum;
                        break
                }
            }
        },
    };
    counter.startCounting()
    const slider = {
        slides: document.querySelectorAll('.slider-item'),
        slidesWrapLine: document.querySelector('.wrap-line'),
        slidesWrapLinePos: 0,
        dotsWrap: document.querySelector('.slider-dots'),
        dots: document.querySelectorAll('.dot'),
        prevArrow: document.querySelector('.prev'),
        nextArrow: document.querySelector('.next'),
        currentSlide: 0,
        isRunning: !1,
        waitingTime: 2000,
        start() {
            let that = this;
            disableOrEnableArrowsAndDots();

            function disableOrEnableArrowsAndDots() {
                if (that.isRunning == !0) {
                    that.dotsWrap.classList.add('dots-disabled');
                    that.prevArrow.disabled = !0;
                    that.nextArrow.disabled = !0
                } else {
                    switch (that.currentSlide) {
                        case 0:
                            that.dotsWrap.classList.remove('dots-disabled');
                            that.prevArrow.disabled = !0;
                            that.nextArrow.disabled = !1;
                            break;
                        case 3:
                            that.dotsWrap.classList.remove('dots-disabled');
                            that.nextArrow.disabled = !0;
                            that.prevArrow.disabled = !1;
                            break;
                        default:
                            that.dotsWrap.classList.remove('dots-disabled');
                            that.prevArrow.disabled = !1;
                            that.nextArrow.disabled = !1;
                            break
                    }
                }
            };

            function nextSlide() {
                if (that.isRunning == !1) {
                    if (that.currentSlide == 3) {
                        return
                    } else {
                        that.currentSlide++;
                        that.slidesWrapLinePos = that.slidesWrapLinePos + 100
                    }
                    that.slidesWrapLine.style.right = `${that.slidesWrapLinePos}%`;
                    that.isRunning = !0;
                    disableOrEnableArrowsAndDots();
                    setTimeout(function () {
                        that.isRunning = !1;
                        disableOrEnableArrowsAndDots()
                    }, that.waitingTime)
                }
                changeDots()
            };

            function prevSlide() {
                if (that.isRunning == !1) {
                    if (that.currentSlide == 0) {
                        return
                    } else {
                        that.currentSlide--;
                        that.slidesWrapLinePos = that.slidesWrapLinePos - 100
                    }
                    that.slidesWrapLine.style.right = `${that.slidesWrapLinePos}%`;
                    that.isRunning = !0;
                    disableOrEnableArrowsAndDots();
                    setTimeout(function () {
                        that.isRunning = !1;
                        disableOrEnableArrowsAndDots()
                    }, that.waitingTime)
                }
                changeDots()
            };

            function changeDots() {
                for (let i = 0; i < that.slides.length; i++) {
                    that.dots[i].classList.remove('dot-active');
                    if (i == that.currentSlide) {
                        that.dots[i].classList.add('dot-active')
                    }
                }
            }
            this.prevArrow.addEventListener('click', prevSlide);
            this.nextArrow.addEventListener('click', nextSlide);
            this.prevArrow.addEventListener('touchstart', prevSlide);
            this.nextArrow.addEventListener('touchstart', nextSlide);
            for (let i = 0; i < that.dots.length; i++) {
                that.dots[i].addEventListener('click', function (event) {
                    if (that.isRunning == !1) {
                        for (let f = 0; f < that.dots.length; f++) {
                            that.isRunning = !0;
                            that.dots[f].classList.remove('dot-active');
                            event.currentTarget.classList.add('dot-active');
                            disableOrEnableArrowsAndDots();
                            setTimeout(function () {
                                that.isRunning = !1;
                                disableOrEnableArrowsAndDots()
                            }, that.waitingTime);
                            if (event.currentTarget.classList.contains('dot-active')) {
                                let currentDot = event.target.getAttribute('data-number');
                                that.currentSlide = parseInt(currentDot, 10);
                                that.slidesWrapLinePos = currentDot * 100;
                                that.slidesWrapLine.style.right = `${that.slidesWrapLinePos}%`;
                                disableOrEnableArrowsAndDots();
                                setTimeout(function () {
                                    that.isRunning = !1;
                                    disableOrEnableArrowsAndDots()
                                }, that.waitingTime)
                            }
                        }
                    }
                })
            }
        }
    };
    slider.start()
   
     const form = {
        name: document.querySelector(".userName"),
        email: document.querySelector(".userEmail"),
        submit: document.querySelector(".contact")
    };
    form.submit.addEventListener("submit", function(e){
        e.preventDefault(); 

        console.log(form.email.value);
        $.ajax({
            type: "POST",
            url: "../php/mail.php", //Change
            data: {
                name: form.name.value,
                email: form.email.value
            }
        }).done(function () {
            document.querySelector(".userName").value = '';
            document.querySelector(".userEmail").value = '';
        });    
    
    });
            
})    