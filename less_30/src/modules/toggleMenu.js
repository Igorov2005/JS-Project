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

export default toggleMenu;