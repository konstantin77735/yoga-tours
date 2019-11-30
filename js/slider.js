document.addEventListener('DOMContentLoaded', function () {
    const slider = {
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
            try {
                for (let i = 0; i <= this.slides.length; i++) {

                    if (i == this.currentSlide) {
                        this.dots[i].classList.add('dot-active');
                    } else {
                        this.dots[i].classList.remove('dot-active');
                        this.dots[i].disabled = true;
                    }
                }
            } catch {
               
            }
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

    };
    slider.start();
});
