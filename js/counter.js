document.addEventListener('DOMContentLoaded', function () {

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
    counter.startCounting();
});
