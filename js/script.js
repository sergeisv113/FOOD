window.addEventListener('DOMContentLoaded', () => {
//TABS
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');//родительски эл с делегированием

    //скрытие ненужных табов
    function hideTabContent() {
        tabsContent.forEach(item => {
            // item.style.display = 'none'; использ class
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })
        //убирание класса активности у табов, кот есть
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //показывает табы
    function showTabContent(i = 0) {
        // tabsContent[i].style.display = 'block';// использ class
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();//1 slider

    //навешиваем обработч событий
    tabsParent.addEventListener('click', (event) => {
        const target = event.target//перемен что бы короче писать
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                //item=tabe кот перебираем
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            })
        }
    });

    //TIMER
    //переменная дедлайн
    const deadline = '2022-05-11';

//ф-я между дедлайн и текущ времен
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),//string => num(ms)
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    //ф-я устанавл таймер на страничке
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),//переменная для эл page
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000); //обновл каждую sec
// МИГАНИЕ верстки
        updateClock();//запуск
        //ф-я добавления 0 к цифрам,кот меньше 10
        function getZero(num) {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        }

        //ф-я обновл timer seconds
        function updateClock() {
            const t = getTimeRemaining(endtime)//расчет t в данную sec
            days.innerHTML = getZero(t.days);//помещ на page
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //delete timeInterval
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal window
// назначаем дата атрибут для откр окна
// button data-modal class='btd btn_dark' прописываем data-modal
// button class='btd btn_withe'  прописываем data-modal

// назначаем дата атрибут для закрыт окна
//  <div class="modal__close">&times;</div>   прописываем data-close
    const modalTriger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');//крестик

    modalTriger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });
// с тоглом
    /*    modalTriger.addEventListener('click', () => {
            modal.classList.toggle('show')
            document.body.style.overflow = 'hidden';
        });
        modalCloseBtn.addEventListener('click', () => {
            modal.classList.toggle('show')
            document.body.style.overflow = '';
        });*/
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        //возвращ по умолчанию
        document.body.style.overflow = '';
    };
    modalCloseBtn.addEventListener('click', closeModal);
    //close modal click темную подложку
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    //close modal press escape
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    })
    //вызов модального окна через время
    const modalTimerId = setTimeout(openModal, 3000);

    //фция откр окна
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        //убираем скрол страницы
        document.body.style.overflow = 'hidden';
        //если user open modal сам, убираем ф-цию
        clearInterval(modalTimerId)
    };

    function showModalByScroll() {
        if (window.pageYOffset + document
            .documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
        }//прокрученная часть+видимая часть сейчас
    }

    //показ окно когад долист до конца
    window.addEventListener('scroll', showModalByScroll);

    // ИСПОЛЬЗУЕМ КЛАССЫ ДЛЯ КАРТОЧЕК
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {//parentSelector-сюда помещаем div
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;//[]
            this.paretn = document.querySelector(parentSelector);//dom el.
            this.transfer = 27;//курс валют
            this.changeToUAH();
        }

        changeToUAH() {//конвертация $ в UAH
            this.price = this.price * this.transfer;
        }

        render() {//верстка
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item'//по умолчанию
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));//перебир [] и назнач класс диву
            }
            element.innerHTML = ` 
<!--                    <div class="menu__item">-->
<!-- this.classes-->
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
<!--                </div>-->
              `;
            this.paretn.append(element);//помещаем в родителя el
        }
    }

    new MenuCard(//передаем аргументы
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд:' +
        ' больше свежих овощей и фруктов. Продукт активных и здоровых людей.' +
        ' Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container', 'menu__item'//родительский класс
    ).render();//вызывается obj 1 раз, на месте, del
    new MenuCard(//передаем аргументы
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки,' +
        ' но и качественное исполнение блюд. Красная рыба, морепродукты, ' +
        'фрукты - ресторанное меню без похода в ресторан!',
        15,
        '.menu .container', 'menu__item'//родительский класс
    ).render();
    new MenuCard(//передаем аргументы
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов:' +
        ' полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки,' +
        ' правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        22,
        '.menu .container', 'menu__item'//родительский класс
    ).render();
    // || const div = new MenuCard(
    // "img/tabs/elite.jpg",
    //         "elite",
    //         'Меню “Премиум”',
    //         'В меню “Премиум” мы используем не только красивый дизайн упаковки,' +
    //         ' но и качественное исполнение блюд. Красная рыба, морепродукты, ' +
    //         'фрукты - ресторанное меню без похода в ресторан!',
    //         15,
    //         '.menu . container'//родительский класс);
    //div.render();

    //Forms
    const form = document.querySelectorAll('form')//получ всех форм 2
    const message = {
        loading: 'Загрузка',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'ЧТо то пошло не так...'

    };
// подвязываем под формы postData
    form.forEach(item => {
        postData(item);//обработч событий при отправке
    })

    function postData(form) {//ф-ция постинга данных
        form.addEventListener('submit', (e) => {//отмена перезагрузки браузера
            e.preventDefault();
            //создание блока с смс
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');//
            statusMessage.textContent = message.loading;
            form.append(statusMessage);//add form cmc

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');//настройка запроса
            //отправка инпутов 1)formData 2)json
            // 1) formData
            //при связке XMLHttpRequest+FormData, заголовок пропис авто
            // request.setRequestHeader('Content-type', 'multipart/form-data') //заголовок для сервера, какой файл пришол,формат
            /*const formData = new FormData(form);//!!обязательно name!!
            request.send(formData);  //отправка
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);// дописать, ваши данные отправленны
                    statusMessage.textContent = message.success;// add cmc
                    //закрытие формы и очистка massage
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }*/

            // 2)JSON
            request.setRequestHeader('Content-type', 'application/json') //заголовок для сервера, какой файл пришол,формат
            const formData = new FormData(form);//!!обязательно name!!
            // на прямую formData не сделать json
            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            const  json = JSON.stringify(object);

            request.send(json);  //отправка
            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);// дописать, ваши данные отправленны
                    statusMessage.textContent = message.success;// add cmc
                    //закрытие формы и очистка massage/
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = message.failure;
                }
            });
        });
    }

});



