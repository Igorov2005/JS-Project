document.addEventListener('DOMContentLoaded', () => {
  'use strict';


  let textDate;

  const arr = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],

    date = new Date(),
    day = date.getDay(),
    time = date.toLocaleTimeString('ru'),
    dateStop = new Date('1 January 2021'),
    daysRemaining = Math.floor((dateStop.getTime() - date.getTime()) / 1000 / 60 / 60 / 24),
    elem = document.createElement('div'),
    hours = date.getHours();


  if (hours > 18) {
    textDate = 'Добрый вечер!';
  } else if (hours > 12) {
    textDate = 'Добрый день!';
  } else if (hours > 6) {
    textDate = 'Доброе утро!';
  } else textDate = 'Доброй ночи!';

  elem.innerHTML = `<p>${textDate}</p>
    <p>Сегодня: ${arr[day]}</p>
    <p>Текущее время: ${time}</p>
    <p>До нового года осталось ${daysRemaining} дней</p>
    `;

  document.body.append(elem);
});