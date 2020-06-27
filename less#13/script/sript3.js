"use srtict";

let start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  expensesTitle = document.querySelector('.expenses-title'),
  expensesItems = document.querySelectorAll('.expenses-items'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  incomeItem = document.querySelectorAll('.income-items'),
  leftInputField = document.querySelector('.data'),
  rightInputField = document.querySelector('.result'),
  inputFields = leftInputField.querySelectorAll("input[type=text]");



let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,

  start: function () {

    if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
      return;
    }

    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.actionBlock();

    this.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    //rangePeriod.addEventListener('mousemove', this.getIncomePeriodValue);
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();

  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    }, this);
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItem[0].cloneNode(true);
    incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItem = document.querySelectorAll('.income-items');
    if (incomeItem.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function () {
    incomeItem.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    }, this);

    for (let key in appData.income) {
      this.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    }, this);
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (item.value !== '') {
        this.addIncome.push(itemValue);
      }
    }, this);
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      this.expensesMonth += +appData.expenses[key];
    }

  },
  getBudget: function () {

    this.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    this.budgetDay = appData.budgetMonth / 30;

  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  getStatusIncome: function () {
    if (this.budgetDay >= 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetDay > 600, this.budgetDay < 1200) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetDay <= 600) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else if (this.budgetDay < 0) {
      return ('Что то пошло не так');
    }
  },
  getInfoDeposit: function () {
    if (this.deposit) {
      do {
        this.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(this.percentDeposit));

      do {
        this.moneyDeposit = +prompt('Какая сумма заложена', 10000);
      } while (!isNumber(this.moneyDeposit));
    }
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  getIncomePeriodValue: function () {
    incomePeriodValue.value = budgetMonthValue.value * rangePeriod.value;
  },

  getTargetMonthText: function () {
    if (this.targetMonth < 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Вы достигните цели за ' +
        Math.floor(this.targetMonth) + ' месяцев';
    }
  },

  actionBlock: function () {
    let inputFields = leftInputField.querySelectorAll("input[type=text]");
    inputFields.forEach(function (item, index) {
      item.setAttribute('disabled', '');
    });
    start.style.display = 'none';
    cancel.style.display = 'inline';
    expensesPlus.removeEventListener('click', this.addExpensesBlock);
    incomePlus.removeEventListener('click', this.addIncomeBlock);
  },

  reset: function () {
    inputFields = leftInputField.querySelectorAll("input[type=text]");
    inputFields.forEach(function (item) {
      item.value = '';
      item.disabled = false;
    });

    inputFields = rightInputField.querySelectorAll("input[type=text]");
    inputFields.forEach(function (item) {
      item.value = '';
      item.disabled = false;
    });

    periodSelect.value = '1';
    periodAmount.innerHTML = '1';
    cancel.style.display = 'none';
    start.style.display = 'inline';
    incomePlus.style.display = 'inline';
    expensesPlus.style.display = 'inline';
    depositCheck.checked = false;

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.expenses = {};
    this.addIncome = [];
    this.addExpenses = [];


    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    periodSelect.removeEventListener('mousemove', appData.getIncomePeriodValue);

    let elements = document.querySelectorAll('.income-items');
    for (let i = 1; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }

    elements = document.querySelectorAll('.expenses-items');
    for (let i = 1; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }

  },
};

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.reset.bind(appData));;

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
});