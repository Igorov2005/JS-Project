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

let start = function () {
  money = prompt('Ваш месячный доход?');
  // while (isNaN(money) || money.trim() === '' || money === null) {
  while (isNaN(parseFloat(money))) {
    // while (!isNumber(money)) {
    money = prompt('Ваш месячный доход?');
  }

};
start();

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1, expenses2;

console.log(addExpenses.toLowerCase().split(','));

let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {

    if (i === 0) {
      expenses1 = prompt('Введите обязательную статью расходов?');
    } else if (i === 1) {
      expenses2 = prompt('Введите обязательную вторую статью расходов?');
    }

    sum += +prompt('Во сколько это обойдется?');
  }
  // console.log(sum);
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

console.log("Цель будет достигнута за " + Math.ceil(getTargetMonth()) + " месяцев");

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