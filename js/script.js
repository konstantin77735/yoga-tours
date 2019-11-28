//Я ПРОВЕРИЛ НА ДЕНВЕРЕ ФОРМУ! ОНА РАБОТАЕТ И ПОСЫЛАЕТ ПИСЬМО В ПАПКУ СЕНДМАИЛ. НА РЕАЛЬНОМ ХОСТИНГЕ ВСЕ ПРАВИЛЬНО БУДЕТ


document.addEventListener('DOMContentLoaded', function () {

    let currentNumber = 0, //нескрытый номер таба, соответствующий номеру названия
        arrayOfHeaderTabs = document.querySelectorAll('.info-header-tab'), // массив Заголовков Табов
        arrayOfTabsContent = document.querySelectorAll('.info-tabcontent'), //массив Самих Табов   
        end = '2019-12-31'; //дата до которой идёт таймер
      


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
