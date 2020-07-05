'use strict';

const сalculationBtn = document.querySelector('#start'),
  userQuit = document.getElementById('cancel'),
  btnPlus = document.getElementsByTagName('button'),
  plusInc = btnPlus[0],
  plusExp = btnPlus[1],
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

  // checkBox = document.getElementById('deposit-check'),
  depositCheck = document.getElementById('deposit-check'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),

  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  //incomeTitle = document.querySelector('.income-title'),
  // incomeItems = document.querySelectorAll('.income-items'),
  //expensesTitle = document.querySelector('.expenses-title'),
  // expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  rangePeriod = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),

  leftInputField = document.querySelector('.data'),
  rightInputField = document.querySelector('.result');
// inputFields = leftInputField.querySelectorAll("input[type=text]");
let incomeItems = document.querySelectorAll('.income-items'), ///////////////////////
  expensesItems = document.querySelectorAll('.expenses-items'), //////
  inputFields = leftInputField.querySelectorAll("input[type=text]");

class appData {
  constructor(
    budget = 0,
    budgetDay = 0,
    budgetMonth = 0,
    expensesMonth = 0,
    income = {},
    incomeMonth = 0,
    addIncome = [],
    expenses = {},
    addExpenses = [],
    deposit = false) {

    this.budget = budget;
    this.budgetDay = budgetDay;
    this.budgetMonth = budgetMonth;
    this.expensesMonth = expensesMonth;
    this.income = income;
    this.incomeMonth = incomeMonth;
    this.addIncome = addIncome;
    this.expenses = expenses;
    this.addExpenses = addExpenses;
    this.deposit = deposit;
    // this.percentDeposit = 0;
  }

  сalculationBtn() {

    if (isNaN(salaryAmount.value) || salaryAmount.value.trim() === '') {
      сalculationBtn.readOnly = true;
      return;
    }
    if (isNaN(depositPercent.value) || depositPercent.value.trim() === '' ||
      depositPercent.value > 100 || depositPercent.value <= 0) {
      this.changePercent.readOnly = true;
      alert('Введите корректное значение в поле проценты');
      return;
    }

    if (isNaN(depositAmount.value) || depositAmount.value.trim() === '') {
      this.changePercent.readOnly = true;
      alert('Введите корректное значение в поле сумма');
      return;
    }


    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    this.getBudget();
    this.actionBlock();
    this.showResult();

  }

  showResult() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.floor(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    rangePeriod.addEventListener( /*'click'*/ 'mousemove', this.getIncomePeriodValue);
  }

  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true),
      cloneTitle = cloneExpensesItem.querySelector('.expenses-title'),
      cloneAmount = cloneExpensesItem.querySelector('.expenses-amount');
    cloneTitle.value = '';
    cloneAmount.value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, plusExp);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      plusExp.style.display = 'none';
    }
  };

  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true),
      cloneTitle = cloneIncomeItem.querySelector('.income-title'),
      cloneAmount = cloneIncomeItem.querySelector('.income-amount');
    cloneTitle.value = '';
    cloneAmount.value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, plusInc);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      plusInc.style.display = 'none';
    }
  };

  getIncome() {
    incomeItems.forEach((item) => {
      const itemIncome = item.querySelector('.income-title').value;
      const cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in this.income) {
      this.incomeMonth += this.income[key];
    }
  };

  getAddIncome() {
    additionalIncomeItem.forEach((item) => {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        this.addIncome.push(itemValue);
      }
    });
  };

  getExpenses() {
    expensesItems.forEach((item) => {
      const itemExpenses = item.querySelector('.expenses-title').value;
      const cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  };

  getAddExpenses() {
    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      item = item.charAt(0).toUpperCase() + item.slice(1);
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  }

  getExpensesMonth() {
    for (let key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);


    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = this.budgetMonth / 30;
  };

  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }

  getStatusIncome() {
    if (this.budgetDay < 300) {
      return ('Низкий уровыень доходов');
    } else if (this.budgetDay <= 800) {
      return ('Средний уровень доходов');
    } else {
      return ('Высокий уровень дохода');
    }
  }

  calcPeriod() {
    return this.budgetMonth * rangePeriod.value;
  };

  getIncomePeriodValue() {
    incomePeriodValue.value = budgetMonthValue.value * rangePeriod.value;
  }

  getTargetMonthText() {
    if (this.targetMonth < 0) {
      return 'Цель не будет достигнута';
    } else {
      return 'Вы достигните цели за ' +
        Math.floor(this.targetMonth) + ' месяцев';
    }
  }

  actionBlock() {
    const inputFields = leftInputField.querySelectorAll("input[type=text]");
    inputFields.forEach((item) => {
      item.setAttribute('disabled', '');
    });
    сalculationBtn.style.display = 'none';
    userQuit.style.display = 'inline';
    plusExp.removeEventListener('click', this.addExpensesBlock);
    plusInc.removeEventListener('click', this.addIncomeBlock);
  }

  reset() {
    inputFields = leftInputField.querySelectorAll("input[type=text]");
    inputFields.forEach((item) => {
      item.value = '';
      item.disabled = false;
    });

    inputFields = rightInputField.querySelectorAll("input[type=text]");
    inputFields.forEach((item) => {
      item.value = '';
      item.disabled = false;
    });

    rangePeriod.value = '1';
    periodAmount.innerHTML = '1';
    userQuit.style.display = 'none';
    сalculationBtn.style.display = 'inline';
    plusInc.style.display = 'inline';
    plusExp.style.display = 'inline';
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


    plusExp.addEventListener('click', appData.addExpensesBlock);
    plusInc.addEventListener('click', appData.addIncomeBlock);
    rangePeriod.removeEventListener('mousemove', appData.getIncomePeriodValue);

    let elements = document.querySelectorAll('.income-items');
    for (let i = 1; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }

    elements = document.querySelectorAll('.expenses-items');
    for (let i = 1; i < elements.length; i++) {
      elements[i].parentNode.removeChild(elements[i]);
    }
  }
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }

  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
    }
    // else if (!isNaN(+depositPercent.value) && +depositPercent.value >= 0 && +depositPercent.value <= 100) {
    //   // calculateButton.disabled = false;
    //   alert('Введите корректное значение в поле проценты');
    //   // return changePercent()
    // }
    else {
      depositPercent.value = valueSelect;

    };

  };


  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      // depositPercent.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);

    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
      depositPercent.style.display = 'none';

    };
  }


  eventsListeners() {

    rangePeriod.addEventListener('input', () => {
      periodAmount.innerHTML = rangePeriod.value;
    });

    сalculationBtn.addEventListener('click', this.сalculationBtn.bind(this));
    userQuit.addEventListener('click', this.reset.bind(this));
    plusExp.addEventListener('click', this.addExpensesBlock.bind(this));
    plusInc.addEventListener('click', this.addIncomeBlock.bind(this));

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  };
};


const newAppData = new appData();

newAppData.eventsListeners();