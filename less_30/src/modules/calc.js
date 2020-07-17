const calc = (price = 100) => {

  const calcItem = document.querySelectorAll('.calc-item'),
    calcBlock = document.querySelector('.calc-block'),
    calcType = document.querySelector('.calc-type'),
    calcSqure = document.querySelector('.calc-square'),
    calcDay = document.querySelector('.calc-day'),
    calcCount = document.querySelector('.calc-count'),
    totalValue = document.getElementById('total');

  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;


    const typeValue = calcType.options[calcType.selectedIndex].value,
      squeValue = +calcSqure.value;
    // console.log(!!typeValue);
    // console.log(!!squeValue);
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }
    if (typeValue && squeValue) {
      total = price * typeValue * squeValue * countValue * dayValue;
    }

    totalValue.textContent = total;
  };
  // countSum()


  calcBlock.addEventListener('change', (event) => {
    const target = event.target;
    // 1й вариант
    // if (target.matches('.calc-type') || target.matches('.calc-square') || target.matches('.calc-day') || target.matches('.calc-count')) {
    //   console.log(1);
    // }

    // 2й вариант
    // if (target === calcType || target === calcSqure || target === calcDay || target === calcCount) {
    //   console.log(2);
    // }

    // 3й вариант
    if (target.matches('select') || target.matches('unput')) {
      //   console.log(3);
    }
    countSum();
  });
};
export default calc;