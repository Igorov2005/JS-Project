const sendForm = () => {

  const errorMesage = 'Что то пошло не так.....',
    loadMessage = 'Загрузка ....',
    succesMessage = 'Спасибо! Мы скоро с Вами свяжемся!';

  const form = document.getElementById('form1');

  const statusMessage = document.createElement('div');
  statusMessage.textContent = 'Тут будет сообщение';
  statusMessage.style.css = 'font-size: 2rem';

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.appendChild(statusMessage);
    statusMessage.textContent = loadMessage;
    const formData = new FormData(form);
    let body = {};
    //первый вариант вывода body
    for (let val of formData.entries()) {
      // console.log(val);
      body[val[0]] = val[1];
    }
    //второй вариант вывода body
    // formData.forEach((val, key) => {
    //   body[key] = val;
    // });

    // console.log(body);

    postData(body, () => {
      statusMessage.textContent = succesMessage;
    }, (error) => {
      statusMessage.textContent = errorMesage;
    });
  });

  const postData = (body, outputData, errorData) => {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {

      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        outputData();

      } else {
        errorData(request.status);

      };
    });

    request.open('POST', 'server.php');
    request.setRequestHeader('Content-Type', 'application/json');

    request.send(JSON.stringify(body));
  };
};
export default sendForm;