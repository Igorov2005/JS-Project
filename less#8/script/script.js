'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
};
let isText = function (str) {
  return !(str === null || null === "" || isNumber(str));
};



let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?', '12000');
    }
    while (!isNumber(money));
  };
start();


let appData = {
  income: {},
  addIncome: [], //дополнительныйе доходы
  expenses: {}, //дополнительные расходы
  addExpenses: [], //массив с возможными расходами
  deposit: false,
  mission: 60000,
  period: 6,
  budget: money,
  percentDeposit: 0,
  moneyDeposit: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let itemIncome;
    let cashIncome;
    if (confirm('Есть ли у вас дополнительный доход?')) {

      do {
        itemIncome = prompt('Какой у вас дополнительный зароботок?', 'таксую');
      } while (!isText(itemIncome));

      do {
        cashIncome = +prompt('Сколько в месяц вы зарабатываете?', '2000');
      }
      while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'кино, театр, комунал');
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

  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = +prompt('Какой годовой процент по депозиту?', '9');
      } while (!isNumber(appData.percentDeposit));
      do {
        appData.moneyDeposit = +prompt('Какая сумма на депозите?', '10000');
      } while (!isNumber(appData.moneyDeposit));
    }

  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  },

};


appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();
appData.calcSavedMoney();

for (let i = 0; i < appData.addExpenses.length; i++) {
  appData.addExpenses[i] = appData.addExpenses[i].trim();
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].substring(1);

};
console.log(appData.addExpenses.join(', '));

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

console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());





for (let key in appData) {
  console.log('Свойство: ' + key + ', его значение - ' + appData[key]);
};