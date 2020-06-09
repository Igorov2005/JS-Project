'use strict';

let money = 5000;
let income = 'Дополнительный доход';
let addExpenses = 'Одежда, Такcи, Проживание, Кино, Девушка';
let deposit = true;
let mission = 1000000;
let period = 6;

//1-е задание
console.log(typeof (money));
console.log(typeof (income));
console.log(typeof (deposit));
// 2-е задание
console.log(addExpenses.length + ' длина строки');
// 3-е задание 
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать ' + mission + ' долларов');
// 4-e задание
console.log(addExpenses.toLowerCase().split(', ')); //добавлен split в одну строку 

// 5-е задание
let budgetDay = (money / 30);
console.log(Math.round(budgetDay) + ' ' + 'в день');


//задание 1
money = +prompt('Ваш месячный доход');
// console.log('Бюджет на месяць:' + money);

//задание 2
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// console.log(addExpenses);

//задание 3 
deposit = confirm('Есть ли у вас депозит в банке?');
// console.log(deposit);

// задание 4
let expenses1 = prompt('Введите обязательную статью расходов?');
// console.log(expenses1);
let expenses2 = prompt('Введите обязательную вторую статью расходов?');
// console.log(expenses2);

let amount1 = +prompt('Во сколько это обойдется?');
// console.log(amount1);
let amount2 = +prompt('Во сколько это обойдется?');
// console.log(amount2);

//задание 5
let budgetMonth = money - (amount1 + amount2); // удалены внешние скобки
console.log('Бюджет на месяць ' + budgetMonth);

//задание 6
let missinMonth = (mission / budgetMonth);
console.log('Цель будет достигнута за - ' + Math.round(missinMonth) + ' месяцев');

//задание 7
let budgetDay1 = (budgetMonth / 30);
console.log('Бюджет на день ' + Math.floor(budgetDay1));

//задание 8

if (budgetDay1 > 1200) {
  console.log('У вас высокий уровень дохода');
} else if (budgetDay1 < 1200 && budgetDay1 >= 600) {
  console.log('У вас средний уровень дохода');
} else if (budgetDay1 < 600 && budgetDay1 >= 0) {
  console.log('К сожалению у вас уровень дохода ниже среднего');
} else if (budgetDay1 <= 0) {
  console.log('Что то пошло не так');
};