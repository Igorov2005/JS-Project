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

  countTimer('11 jule 2020');

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

        let width = document.documentElement.clientWidth; /
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


});