//Я ПРОВЕРИЛ НА ДЕНВЕРЕ ФОРМУ! ОНА РАБОТАЕТ И ПОСЫЛАЕТ ПИСЬМО В ПАПКУ СЕНДМАИЛ. НА РЕАЛЬНОМ ХОСТИНГЕ ВСЕ ПРАВИЛЬНО БУДЕТ


document.addEventListener('DOMContentLoaded', function () {

    let currentNumber = 0, //нескрытый номер таба, соответствующий номеру названия
        arrayOfHeaderTabs = document.querySelectorAll('.info-header-tab'), // массив Заголовков Табов
        arrayOfTabsContent = document.querySelectorAll('.info-tabcontent'), //массив Самих Табов   
        end = '2019-12-31', //дата до которой идёт таймер
        slider = {
            slides: document.querySelectorAll('.slider-item'),
            slidesWrapLine: document.querySelector('.wrap-line'),
            slidesWrapLinePos: 0,
            dotsWrap: document.querySelector('.slider-dots'),
            dots: document.querySelectorAll('.dot'),
            prevArrow: document.querySelector('.prev'),
            nextArrow: document.querySelector('.next'),

            currentSlide: 0,

            isRunning: false,
            waitingTime: 3200,
            disableOrEnableArrowsAndDots: function () {
                console.log(`DisableOrEnable работает!`)
                if (this.isRunning == true) {
                    this.prevArrow.classList.add('arrow-disabled');
                    this.nextArrow.classList.add('arrow-disabled');
                    this.dotsWrap.classList.add('dots-disabled');
                    this.prevArrow.disabled = true;
                    this.nextArrow.disabled = true;

                } else {
                    this.prevArrow.classList.remove('arrow-disabled');
                    this.nextArrow.classList.remove('arrow-disabled');
                    this.dotsWrap.classList.remove('dots-disabled');
                    this.prevArrow.disabled = false;
                    this.nextArrow.disabled = false;

                }
            },

            changeDots: function () {
                for (let i = 0; i <= this.slides.length; i++) {

                    if (i == this.currentSlide) {
                        this.dots[i].classList.add('dot-active');
                    } else {
                        this.dots[i].classList.remove('dot-active');
                        this.dots[i].disabled = true;
                    }
                };
            },


            nextSlide: function () {
                if (this.isRunning == false) {

                    if (this.currentSlide == 3) {
                        this.currentSlide = 0;
                        this.slidesWrapLinePos = 0;
                    } else {
                        this.currentSlide++;
                        this.slidesWrapLinePos = this.slidesWrapLinePos + 100;
                    }

                    this.slidesWrapLine.style.right = this.slidesWrapLinePos + '%';
                    this.isRunning = true;
                    this.disableOrEnableArrowsAndDots();
                    console.log(this.isRunning);
                }

                //  console.log(this.currentSlide);alert(this.currentSlide);
            },

            prevSlide: function () {
                if (this.isRunning == false) {

                    if (this.currentSlide == 0) {
                        this.currentSlide = 3;
                        this.slidesWrapLinePos = 300;
                    } else {
                        this.currentSlide--;
                        this.slidesWrapLinePos = this.slidesWrapLinePos - 100;
                    }

                    this.slidesWrapLine.style.right = this.slidesWrapLinePos + '%';
                    this.isRunning = true;
                    this.disableOrEnableArrowsAndDots();
                    console.log(this.isRunning);
                }

                // console.log(this.currentSlide);
            },

            start: function () {
                let that = this;

                this.prevArrow.addEventListener('click', function (e) {
                    setTimeout(function () {
                        that.isRunning = false;
                        console.log(that.isRunning);
                        that.disableOrEnableArrowsAndDots();
                    }, that.waitingTime);

                    that.prevSlide();
                    that.changeDots();

                });
                this.nextArrow.addEventListener('click', function (e) {
                    setTimeout(function () {
                        that.isRunning = false;
                        console.log(that.isRunning);
                        that.disableOrEnableArrowsAndDots();
                    }, that.waitingTime);

                    that.nextSlide();
                    that.changeDots();

                });


                for (let i = 0; i < that.dots.length; i++) { //создаём цикл, который проходится по нодлисту точек слайдера
                    that.dots[i].addEventListener('click', function (event) { //вешаем Слушатель Событий на каждую точку
                        if (that.isRunning == false) {

                            for (let f in that.dots) {

                                that.dots[f].classList.remove('dot-active'); //отключаем неподходящие точки
                                event.target.classList.add('dot-active'); //отмечаем ту по которой кликнули

                                that.isRunning = true; // идёт анимация
                                that.disableOrEnableArrowsAndDots();
                                console.log(that.isRunning);

                                setTimeout(function () {
                                    that.isRunning = false;
                                    console.log(that.isRunning);
                                    that.disableOrEnableArrowsAndDots();
                                }, that.waitingTime);
                                if (event.target.classList.contains('dot-active')) {
                                    //если нажатая точка не содержит класс dot-active
                                    let currentDot = event.target.getAttribute('data-number');
                                    that.currentSlide = currentDot;
                                    that.slidesWrapLinePos = currentDot * 100;
                                    that.slidesWrapLine.style.right = that.slidesWrapLinePos + '%';

                                    that.isRunning = true;
                                    that.disableOrEnableArrowsAndDots();
                                    console.log(that.isRunning);

                                    setTimeout(function () {
                                        that.isRunning = false;
                                        console.log(that.isRunning);
                                        that.disableOrEnableArrowsAndDots();
                                    }, that.waitingTime);

                                }
                            }




                        }



                    });
                }

            },

        },
         counter = {
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

                that.touristsAndDays[k].addEventListener('change', function () {

                    that.touristsSum = that.touristsAndDays[0].value;
                    that.restDaysSum = that.touristsAndDays[1].value;

                    let parsedTouristsSum = parseInt(that.touristsSum, 10),
                        parsedRestDaysSum = parseInt(that.restDaysSum, 10);

                    if (that.touristsSum != 0 && that.restDaysSum != 0 && that.touristsSum != '' && that.restDaysSum != '') {

                        that.totalSum = (parsedTouristsSum + parsedRestDaysSum) * that.price;
                        console.log(`${parsedRestDaysSum} - людей, ${parsedRestDaysSum} - дней. Итог: ${that.totalSum}
                            (${that.touristsSum} + ${that.restDaysSum}) * ${that.priceMumbai} = ${that.totalSum}`);
                        that.totalValue.innerHTML = that.totalSum;
                    } else {
                        that.totalValue.textContent = '';
                    }


                });
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
                        break;
                }
            }

        },

    };
    
      arrayOfHeaderTabs.forEach(function (item, index) {
        arrayOfHeaderTabs[index].addEventListener('click', function (e) {
            if (arrayOfHeaderTabs[index] != currentNumber) {
                hideOtherTabs(currentNumber);
                currentNumber = index;
                arrayOfTabsContent[currentNumber].classList.remove('fade');
                console.log(`Визибл таб - ${index}`);
            }
        });
    });
        setTime('.timer-numbers', end);
    counter.startCounting();

  

    slider.start();


    //запускаем все в том порядке, в каком есть на странице, т.е сверху вниз


    function hideOtherTabs(a) {
        for (let i = a; i < arrayOfHeaderTabs.length; i++) {
            arrayOfTabsContent[i].classList.add('fade');
        }
    }


    function waiting(endtime) {
        let z = Date.parse(end) - Date.parse(new Date()),
            minutes = Math.floor((z / 1000 / 60) % 60),
            seconds = Math.floor((z / 1000) % 60),
            hours = Math.floor((z / (1000 * 60 * 60))),
            days = Math.floor((z / (1000 * 60 * 60 * 24)));
        return {
            'total': z,
            // 'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setTime(objectTimer, endTime) {
        let timer = document.querySelector(objectTimer),
            //  days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateTime, 1000);


        function updateTime() {
            let t = waiting(endTime);
            // days.textContent = t.days;
            hours.textContent = `${t.hours} ч.`;
            minutes.textContent = `${t.minutes} м.`;
            seconds.textContent = `${t.seconds} с.`;

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }


});
