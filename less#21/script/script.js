// слайдер 
const slider = () => {

  const slide = document.querySelectorAll('.portfolio-item'),
    //btn = document.querySelectorAll('.portfolio-btn'), // ПОКА НЕ ИСПОЛЬЗУЕТСЯ
    //dot = document.querySelectorAll('.dot'), // если получать точки сейчас , будет ошибка , так как элементы не созданы
    dots = document.querySelector('.portfolio-dots'), // так как остался только ul список , в который будем добалять точки
    slider = document.querySelector('.portfolio-content');

  let currentSlide = 0,
    interval;

  // функция добавления точек
  const addDots = () => {

    // цикл : "сколько слайдов , столько и точек"
    for (let i = 0; i < slide.length; i++) {

      // создаем элементы в html документе (странице) для дальнешей работы с ними
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

  // функция пролистывания слайдера (autoplay)
  const autoPlaySlide = () => {

    // меняем классы active между слайдами
    prevSlide(slide, currentSlide, 'portfolio-item-active');
    prevSlide(dot, currentSlide, 'dot-active');
    currentSlide++;
    // ограничим количество слайдов
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