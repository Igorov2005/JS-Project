let money = 5000;
let income = 'Дополнительный доход';
let addExpenses = 'Pасходы, Такcи, Проживание, Кино, Девушка';
let deposit = true;
// let deposit = 2000; //если правильно понял по заданию то числовое значение не надо задавать
let mission = 1000000;
let period = 6;



// console.log(money, income, deposit);// по заданию не до конца понял вывести в консоль по отдельности или в одну строку поэтому написал два варианта 

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
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));
// 5-е задание
let budgetDay = (money / 30);
console.log(Math.round(budgetDay) + ' ' + 'в день');