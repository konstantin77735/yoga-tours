$(document).ready(function () {

    let popupBtn1 = document.querySelectorAll('.description-btn'),
        popupBtn2 = document.querySelector('.more'),
        popupClose = document.querySelector('.popup-close'),
        popupSubmit = document.querySelector('.popup-form__btn'),
        popupInput = document.querySelector('.popup-form__input '),

        overlay = document.querySelector('.overlay');


    function showOrHidePopup() {
        if (overlay.classList.contains('fade')) {
            overlay.classList.remove('fade');
        } else {
            overlay.classList.add('fade');
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
    AddListener(popupSubmit, 'click', getValueOfPopupInput);

    function AddListener(elem, event, func) {
        if (func) {
            elem.addEventListener(event, func);


        } else {
            elem.addEventListener(event, function (e) {

            });
        }
    }

});
