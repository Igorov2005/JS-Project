window.addEventListener('DOMContentLoaded', () => {

  'use strict';
  //Timer
  let timerHours = document.getElementById('timer-hours'),
    timerMinutes = document.getElementById('timer-minutes'),
    timerSeconds = document.getElementById('timer-seconds');


  function countTimer(deadline) {

    function getTimeRemaining() {

      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining / 60) % 60),
        hours = Math.floor(timeRemaining / 60 / 60);


      return {
        timeRemaining,
        hours,
        minutes,
        seconds
      };
    }


    function updateClock() {

      let timer = getTimeRemaining();



      if (timer.hours < 10) {
        timerHours.textContent = "0" + timer.hours;
      } else {
        timerHours.textContent = timer.hours;
      }

      if (timer.minutes < 10) {
        timerMinutes.textContent = "0" + timer.minutes;
      } else {
        timerMinutes.textContent = timer.minutes;
      }

      if (timer.seconds < 10) {
        timerSeconds.textContent = "0" + timer.seconds;
      } else {
        timerSeconds.textContent = timer.seconds;
      }

      let newInterval = setInterval(updateClock, 1000);

      if (timer.timeRemaining > 0) {
        setTimeout(updateClock, 1000);
      }
      else {
        clearInterval(newInterval);
        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }

    }
    updateClock();
  }

  countTimer('15 jule 2020');

  //menu

  const toggleMenu = () => {

    const btnMenu = document.querySelector('.menu'),
      menu = document.querySelector('menu');
    //closeBtn = document.querySelector('.close-btn'),
    //menuItems = menu.querySelectorAll('ul>li');

    const handlerMenu = () => {
      menu.classList.toggle('active-menu');
    };
    // btnMenu.addEventListener('click', handlerMenu);
    // closeBtn.addEventListener('click', handlerMenu);
    // menuItems.forEach((elem) => elem.addEventListener('click', handlerMenu));


    menu.addEventListener('click', (event) => {
      if (event.target.classList.contains === 'close') {
        return;
      } else {
        handlerMenu();
      }
    });

    btnMenu.addEventListener('click', handlerMenu);
  };

  toggleMenu();


  //popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
      popupBtn = document.querySelectorAll('.popup-btn'),

      popupContent = document.querySelector('.popup-content');

    let startPoint = -500;
    let setAnimation;

    const popupBegin = () => {

      let width = document.documentElement.clientWidth;
      setAnimation = requestAnimationFrame(popupBegin);
      startPoint += 25;
      popupContent.style.top = startPoint + 'px';

      if (startPoint > (width / 10)) {
        cancelAnimationFrame(setAnimation);
      }
    };

    popupBtn.forEach((elem) => {

      elem.addEventListener('click', () => {

        let width = document.documentElement.clientWidth;
        if (width > 768) {
          popup.style.display = 'block';
          popupBegin();
        } else {
          popup.style.display = 'block';
        }
      });
    });



    popup.addEventListener('click', (event) => {
      let target = event.target;
      if (target.classList.contains('popup-close')) {
        popup.style.display = 'none';
      } else {
        target = target.closest('.popup-content');
        if (!target) {
          popup.style.display = 'none';
        };
      }

    });

  };
  togglePopUp();


  //Tabs 
  const tabs = () => {
    const tabHeader = document.querySelector('.service-header'),
      tab = tabHeader.querySelectorAll('.service-header-tab'),
      tabContent = document.querySelectorAll('.service-tab');


    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add('active');
          tabContent[i].classList.remove('d-none');
        } else {
          tab[i].classList.remove('active');
          tabContent[i].classList.add('d-none');
        };
      };
    };

    tabHeader.addEventListener('click', (event) => {
      let target = event.target;
      target = target.closest('.service-header-tab')
      // if(target.classList.contains('service-header-tab'))
      if (target) {

        tab.forEach((item, i) => {

          if (item === target) {

            toggleTabContent(i);
          };
        });
      };

    });

  };

  tabs();

  //slaider
  const slider = () => {

    const slide = document.querySelectorAll('.portfolio-item'),
      //btn = document.querySelectorAll('.portfolio-btn'), 
      //dot = document.querySelectorAll('.dot'), //отключить
      dots = document.querySelector('.portfolio-dots'), // в ul список будем добалять точки
      slider = document.querySelector('.portfolio-content');

    let currentSlide = 0,
      interval;

    // функция добавления точек
    const addDots = () => {

      // цикл кол-во слайдов равняеться кол-ву слайдр=ов
      for (let i = 0; i < slide.length; i++) {

        // создаем элементы в html документе
        let newDot = document.createElement('li');
        newDot.classList.add('dot');
        dots.appendChild(newDot);
      }
    };

    addDots(); // естественно , вызов функции

    const dot = document.querySelectorAll('.dot'); // после создания тчоек , получаем их со страницы

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    // функция пролистывания слайдера
    const autoPlaySlide = () => {

      // меняем классы active между слайдами
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      // определяем количество слайдов
      if (currentSlide >= slide.length) {
        currentSlide = 0; // возвращаем начальное значение
      }
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    // запуск слайдера
    const startSlide = (time = 2000) => {

      interval = setInterval(autoPlaySlide, time);
    };

    // стоп слайдера
    const stopSlide = () => {

      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {

      event.preventDefault();

      let target = event.target;

      if (!target.matches('.portfolio-btn , .dot')) {
        return;
      }

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (target.matches('#arrow-right')) {
        currentSlide++;
      } else if (target.matches('#arrow-left')) {
        currentSlide--;
      } else if (target.matches('.dot')) {
        dot.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }

      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }

      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }

      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });

    slider.addEventListener('mouseover', (event) => {

      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        stopSlide();
      }
    });

    slider.addEventListener('mouseout', (event) => {

      if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
        startSlide();
      }
    });

    startSlide(2000);
  };

  slider();

  //command foto

  const livePhotos = () => {


    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach((item) => {
      const lastImg = item.getAttribute('src');
      item.addEventListener('mouseenter', (event) => {

        const target = event.target;
        target.src = target.dataset.img;
        //event.target.src = event.target.dataset.img; // смена картинки
      });


      item.addEventListener('mouseleave', (event) => {

        const target = event.target;

        target.src = lastImg;
        //event.target.src = newImg; 
      });

    });
  };

  livePhotos();

  //calculator

  const calc = (price = 100) => {

    const calcItem = document.querySelectorAll('.calc-item'),
      calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSqure = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;


      const typeValue = calcType.options[calcType.selectedIndex].value,
        squeValue = +calcSqure.value;
      // console.log(!!typeValue);
      // console.log(!!squeValue);
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squeValue) {
        total = price * typeValue * squeValue * countValue * dayValue;
      }

      totalValue.textContent = total;
    };
    // countSum()


    calcBlock.addEventListener('change', (event) => {
      const target = event.target;
      // 1й вариант
      // if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
      //   console.log(1);
      // }

      // 2й вариант
      // if (target === calcType || target === calcSqure || target === calcDay || target === calcCount) {
      //   console.log(2);
      // }

      // 3й вариант
      if (target.matches('select') || target.matches('unput')) {
        //   console.log(3);
      }
      countSum();
    });
  };

  calc(100);

  //send -ajax-form
  const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
      loadMessage = `<div class="sk-rotating-plane"></div>`,
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';
    const form1 = document.getElementById('form1'),
      form2 = document.getElementById('form2'),
      form3 = document.getElementById('form3');

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem;`;

    const validePhone = (form) => {
      if (form.querySelector('.form-phone')) {
        form.querySelector('.form-phone').addEventListener('input', (e) => e.target.value = e.target.value.replace(/(?<!^)\+|[^\d+]/g, ''));
      }
      if (form.querySelector('.form-name')) {
        form.querySelector('.form-name').addEventListener('input', (e) => e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ''));
      }
      if (form.querySelector('.form-message')) {
        form.querySelector('.form-message').addEventListener('input', e => e.target.value = e.target.value.replace(/[^а-яА-Я ]/g, ''));
      }
    };
    validePhone(form1);
    validePhone(form2);
    validePhone(form3);

    form1.addEventListener('submit', e => {
      e.preventDefault();
      form1.appendChild(statusMessage);
      statusMessage.innerHTML = loadMessage;
      const formData = new FormData(form1);
      let body = {};
      formData.forEach((value, key) => body[key] = value);
      postData(body)
        .then(() => statusMessage.innerHTML = successMessage)
        .catch(error => { console.error(error); statusMessage.innerHTML = errorMessage; });

      form1.querySelectorAll('input').forEach(item => item.value = '');
    });
    form2.addEventListener('submit', e => {
      e.preventDefault();
      form2.appendChild(statusMessage);
      statusMessage.innerHTML = loadMessage;
      const formData = new FormData(form2);
      let body = {};
      formData.forEach((value, key) => body[key] = value);
      postData(body)
        .then(() => statusMessage.innerHTML = successMessage)
        .catch(error => { console.error(error); statusMessage.innerHTML = errorMessage; });

      form2.querySelectorAll('input').forEach(item => item.value = '');
    });
    form3.addEventListener('submit', e => {
      e.preventDefault();
      form3.appendChild(statusMessage);
      statusMessage.style.color = '#fff';
      statusMessage.innerHTML = loadMessage;

      const formData = new FormData(form3);
      let body = {};
      formData.forEach((value, key) => body[key] = value);
      postData(body)
        .then(() => statusMessage.innerHTML = successMessage)
        .catch(error => {
          console.error(error);
          statusMessage.innerHTML = errorMessage;
        });

      form3.querySelectorAll('input').forEach(item => item.value = '');
    });
    //отправка данных на сервер
    const postData = (body) => {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.addEventListener('readystatechange', () => {
          if (request.readyState !== 4) return;
          if (request.status === 200) resolve();
          else reject(request.status);
        });
        request.open('POST', './server.php');
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
      });

    };
  };
  sendForm();




























});