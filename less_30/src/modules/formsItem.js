const formsItem = () => {

  // const formsItem = (form) => {
  const formPhone = document.querySelectorAll('.form-phone'),// поля с вводом
    formBlock = document.getElementById('form1');// весь блок

  formPhone.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^[^+\d]*(\+|\d)|\D/g, '$1');

      //варианты маски к телефону
      // (/^[^+\d]*(+|\d)|\D$/ig, '');
      //(/[^[^+\d]*(\+|\d)|\D/g, '$1'); //(/\+\(\d{3}\) \d{3}\-\d{4}/g, ''); //(/[^[^+\d]*(\+|\d)|\D/g, '');   (/\D/g, '');
    });
  });


  //валидация email 
  const formEmail = document.querySelectorAll('.form-email');
  formEmail.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[+()]/g, '');
    });
  });

  //валидация по имени
  const formName = document.querySelectorAll('.form-name');
  formName.forEach(item => {
    item.addEventListener('input', () => {
      item.value = item.value.replace(/[^а-яА-Я ]/g, '');
    });
  });
  //Очистка инпута
  document.querySelectorAll('.form-btn')
    .forEach(function (elem) {
      elem.onclick = function (e) {

        let selector = this.dataset.clearSelector;
        document.querySelectorAll(selector)
          .forEach(function (item) {
            item.value = '';
          });
      };
    });
};
export default formsItem;