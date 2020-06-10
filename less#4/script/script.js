'use strict';

let mission = 1000000;
let period = 6;
let money = +prompt('Ваш месячный доход');
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную вторую статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');
let income = 'Дополнительный доход';


let showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


// console.log(addExpenses.length + ' длина строки');
console.log('Период равен' + ' ' + period + ' ' + 'месяцев');
console.log('Цель заработать ' + mission + ' долларов');
// console.log(addExpenses.toLowerCase().split(', ')); //добавлен split в одну строку 


// let budgetDay = (money / 30);
// console.log(Math.round(budgetDay) + ' ' + 'в день');


// let getExpensesMonth = function () {
//   return amount1 + amount2;
// };
function getExpensesMonth() {
  return amount1 + amount2;
};

console.log('Расходы за месяц ' + getExpensesMonth());

// let budgetMonth = money - (amount1 + amount2); // удалены внешние скобки
// console.log('Бюджет на месяць ' + budgetMonth);

let getAccumulatedMonth = function () {
  return money - getExpensesMonth();
};
// getAccumulatedMonth();
// console.log('Накопления за месяц ' + getAccumulatedMonth());
let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц ' + accumulatedMonth);

// let missinMonth = (mission / budgetMonth);
// console.log('Цель будет достигнута за ' + Math.round(missinMonth) + ' месяцев');
const getTargetMonth = function (accumulatedMonth) {
  return Math.ceil(mission / accumulatedMonth);
};
console.log("Цель будет достигнута за " + Math.ceil(mission / getTargetMonth(accumulatedMonth)) + " месяцев");

let budgetDay1 = (accumulatedMonth / 30);
console.log('Бюджет на день ' + Math.floor(budgetDay1));

let getStatusIncome = function () {
  if (budgetDay1 > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay1 < 1200 && budgetDay1 >= 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay1 < 600 && budgetDay1 >= 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else if (budgetDay1 <= 0) {
    return ('Что то пошло не так');
  }
};
// getStatusIncome();
console.log(getStatusIncome());

// if (budgetDay1 > 1200) {
//   console.log('У вас высокий уровень дохода');
// } else if (budgetDay1 < 1200 && budgetDay1 >= 600) {
//   console.log('У вас средний уровень дохода');
// } else if (budgetDay1 < 600 && budgetDay1 >= 0) {
//   console.log('К сожалению у вас уровень дохода ниже среднего');
// } else if (budgetDay1 <= 0) {
//   console.log('Что то пошло не так');
// };