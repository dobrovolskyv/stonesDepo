import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();



const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    spaceBetween: 0,
    centeredSlides: false,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false
    },
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    // navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    // },


});

const navItems = document.querySelectorAll('.header__nav-item')

//popup
const close = document.querySelector('.popup__close')
const popupBtn = document.querySelectorAll('.form__btn')
const popup = document.querySelector('.popup')
const dark = document.querySelector('.dark')

//menu
// const menuBtn = document.querySelector('.header__menu-img');
// const closeMenu = document.querySelector('.header__close');
// const nav = document.querySelector('.header__mobile-nav');

// menuBtn.addEventListener('click', () => {
//     nav.classList.remove('transform')
//     dark.classList.remove('none');
//     document.body.style.overflow = 'hidden'
// })
// closeMenu.addEventListener('click', () => {
//     nav.classList.add('transform')
//     dark.classList.add('none');
//     document.body.style.overflow = 'auto'
// })

// navItems.forEach((item) => {
//     item.addEventListener('click', () => {
//         navItems.forEach((link) => link.classList.remove('active'))
//         item.classList.add('active')
//     })
// })

popupBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        popup.classList.remove('none')
        dark.classList.remove('none');
        document.body.style.overflow = 'hidden'
    })
})

close.addEventListener('click', () => {
    popup.classList.add('none')
    dark.classList.add('none');
    document.body.style.overflow = 'auto'
    document.body.style.overflowX = 'hidden'
})


// БАЗОВАЯ ВАЛИДАЦИЯ ИНПУТОВ
document.querySelector('#popup__input-name').addEventListener('input', function () {
    this.value = this.value.replace(/[^a-zA-Zа-яА-ЯёЁ\s.]/g, '');
});

document.querySelector('#popup__input-tel').addEventListener('input', function () {
    this.value = '+' + this.value.replace(/[^0-9\s.]/g, '');
});

//интеграция с телеграмомм
const form = document.getElementById('tg-form');
const submitBtn = document.getElementById('submit-btn');

const TOKEN = '8177680926:AAGIS8bkM2t2q5FDlbuoHi9Gh29zs7Sx5Dw'; // замени на свой
const CHAT_ID = '-4676984495'; // замени на свой
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

form.addEventListener('submit', function (e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Отправка... <span class="spinner"></span>';

    const name = form.name.value.trim();
    const phone = form.phone.value.trim();

    const message = `*Заявка с сайта!*\n\n*Отправитель:* ${name}\n*Перезвони братишке по этому телефону:* ${phone}`;

    fetch(URI_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            // parse_mode: 'Markdown',
            text: message
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                form.reset();
                alert('Заявка успешно отправлена!');
            } else {
                alert('Ошибка при отправке!');
                console.warn('Telegram error:', data);
            }
        })
        .catch(error => {
            alert('Ошибка сети!');
            console.error('Network error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить!';
        });

    console.log("chat_id:", CHAT_ID);
    console.log("message:", message);
    console.log("URI_API:", URI_API);
});

