'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};


let mission = 10000;
let period = 6;
let money;
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let income = 'Дополнительный доход';

// let start = function () {
//   money = prompt('Ваш месячный доход?');
//   // while (isNaN(money) || money.trim() === '' || money === null) {
//   while (isNaN(parseFloat(money))) {
//     // while (!isNumber(money)) {
//     money = prompt('Ваш месячный доход?');
//   }

// };
// start();
let start = function () {
  do {
    money = +prompt('Ваш месячный доход?');
  }
  while (!isNumber(money));
};

start();

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses = [];

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function () {
  let sum = 0;
  let amount = 0;

  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt('Введите обязательную статью расходов?');
    do {
      amount = +prompt('Во сколько это обойдется?');
    } while (!isNumber(amount));
    sum += amount;
  };

  console.log(expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц ' + expensesAmount);

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};


let accumulatedMonth = getAccumulatedMonth();
console.log('Накопления за месяц ' + accumulatedMonth);


let getTargetMonth = function () {
  return mission / accumulatedMonth;

};

let target = getTargetMonth();

if (target <= 0) {

  console.log('Цель не будет достигнута');
} else {
  console.log("Цель будет достигнута за " + Math.ceil(getTargetMonth()) + " месяцев");
};

// console.log("Цель будет достигнута за " + Math.ceil(getTargetMonth()) + " месяцев");

let budgetDay1 = accumulatedMonth / 30;


let getStatusIncome = function () {
  if (budgetDay1 <= 0) {
    return ('Что то пошло не так');
  } else if (budgetDay1 < 300) {
    return ('У вас низкий уровень дохода');
  } else if (budgetDay1 <= 800) {
    return ('У вас средний уровень дохода');
  } else {
    return ('У вас высокий уровень дохода');
  }

};

console.log(getStatusIncome());