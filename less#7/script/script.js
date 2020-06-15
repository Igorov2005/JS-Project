'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?');
    }
    while (!isNumber(money));
  };
start();

let appData = {
  income: {},
  addIncome: [], //дополнительныйе доходы
  expenses: {

  }, //дополнительные расходы
  addExpenses: [], //массив с возможными расходами
  deposit: false,
  mission: 60000,
  period: 6,
  // sum: 0,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');


    for (let i = 0; i < 2; i++) {
      let tricky = prompt('Введите обязательную статью расходов?'),
        amount = 0;

      do {
        amount = +prompt('Во сколько это обойдется?');
      } while (!isNumber(amount));
      appData.expenses[tricky] = amount;

    }
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let item in appData.expenses) {
      sum += appData.expenses[item];
    }
    appData.expensesMonth = sum;
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay1 = appData.budgetMonth / 30;

  },
  getTargetMonth: function () {

    return appData.mission / appData.budgetMonth;
  },
  getStatusIncome: function () {
    if (appData.budgetDay1 <= 0) {
      return ('Что то пошло не так');
    } else if (appData.budgetDay1 < 300) {
      return ('У вас низкий уровень дохода');
    } else if (appData.budgetDay1 <= 800) {
      return ('У вас средний уровень дохода');
    } else {
      return ('У вас высокий уровень дохода');
    }
  }, //метод опроса пользователя

};
appData.asking();
appData.getExpensesMonth();



console.log('Расходы за месяц ' + appData.expensesMonth);

let accumulatedMonth = appData.getBudget();

let target = appData.getTargetMonth();

if (target <= 0) {

  console.log('Цель не будет достигнута');
} else {
  console.log("Цель будет достигнута за " + Math.ceil(appData.getTargetMonth()) + " месяцев");
};

let budgetDay1 = accumulatedMonth / 30;

console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log('Свойство: ' + key + ', его значение - ' + appData[key]);
}