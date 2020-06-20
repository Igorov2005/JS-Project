'use strict'

const books = document.querySelectorAll('.book'),
  titleBook = document.querySelectorAll('h2'),
  titleLink = document.getElementsByTagName('a'),
  advertising = document.querySelector('.adv'),
  bodyImg = document.getElementsByTagName('body'),
  listContent = document.getElementsByTagName('li');


//Восстановить порядок книг
books[0].before(books[1]);
books[5].after(books[2]);
books[3].before(books[4]);


//Заменить картинку заднего фона на другую из папки image
bodyImg[0].style.backgroundImage = "url('./image/you-dont-know-js.jpg')";

//Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")

titleLink[2].textContent = 'Книга 3. this и Прототипы Объектов';

// titleBook[4].titleLink[4].children[0].children[0].textContent = 'Книга 3. this и Прототипы Объектов';

//Удалить рекламу со страницы
advertising.remove();

//Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
listContent[9].after(listContent[12]);
listContent[16].before(listContent[8]);
listContent[10].before(listContent[13]);

listContent[37].after(listContent[45]);
listContent[43].before(listContent[39]);
listContent[44].after(listContent[41]);

//в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
// console.log(listContent);

const dopElement = document.createElement('li');
dopElement.textContent = 'Глава 8: За пределами ES6 ';
listContent[55].append(dopElement);


// console.log(dopElement);
// console.log(books);
// console.log(titleBook);
// console.log(advertising);