 $(document).ready(function () {

     let currentNumber = 0, //нескрытый номер таба, соответствующий номеру названия
         arrayOfHeaderTabs = document.querySelectorAll('.info-header-tab'), // массив Заголовков Табов
         arrayOfTabsContent = document.querySelectorAll('.info-tabcontent'), //массив Самих Табов   

         
         countDownDate = new Date('Dec 31, 2019 00:00:00').getTime(),
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
             secondsSpan.textContent = seconds;
         }, 1000);

   


 arrayOfHeaderTabs.forEach(function (item, index) {
     arrayOfHeaderTabs[index].addEventListener('click', function () {
         if (arrayOfHeaderTabs[index] != currentNumber) {
             hideOtherTabs(currentNumber);
             currentNumber = index;
             arrayOfTabsContent[currentNumber].classList.remove('fade');
         }
     });
 });


 function hideOtherTabs(a) {
     for (let i = a; i < arrayOfHeaderTabs.length; i++) {
         arrayOfTabsContent[i].classList.add('fade');
     }
 }

 });
