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

export default togglePopUp;