$(document).ready(function () {

    function popup() {
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
                    overlay.style.opacity = 1;
                }, 270);
            } else {
                overlay.style.visibility = 'hidden';
                overlay.style.opacity = 0;
                setTimeout(function () {
                    overlay.classList.add('fade');
                }, 270);

            }
        }

        function getValueOfPopupInput() {
            let plus = popupInput.value.indexOf('+'),
                seven = popupInput.value.indexOf('7');
            // fourNum = popupInput.value.charAt(4),
            // sevenNum = popupInput.value.charAt(7);
            if (popupInput.value.length === 12 && plus === 0 && seven === 1) {
                showOrHidePopup();
            }

        }

        popupBtn1.forEach(function (item, index) {
            AddListener(popupBtn1[index], 'click', showOrHidePopup);
        });

        AddListener(popupBtn2, 'click', showOrHidePopup);
        AddListener(popupClose, 'click', showOrHidePopup);
        AddListener(overlay, 'click');
        AddListener(popupSubmit, 'click', getValueOfPopupInput);
        AddListener(document, 'keydown');

        console.log( AddListener(popupBtn2, 'click', showOrHidePopup));

        function AddListener(elem, event, func) {
            if (func) {
                elem.addEventListener(event, func);

            } else {
                elem.addEventListener(event, function (e) {
                    if (e.target == overlay || (e.type == 'keydown' && 27 === e.keyCode && !overlay.classList.contains('fade'))) {
                        //keyCode === 27 - клавиша Esc
                        showOrHidePopup();
                    }
                });

            }
        }
        
    }
    popup();
});