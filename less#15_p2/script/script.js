'use strict'

class First {
  constructor(hello) {
    this.hello = 'Привет я метод родителя!';
    console.log(this.hello);
  }
};

class Second extends First {
  constructor(hello) {
    super(hello);
    this.created = 'А я наследуемый метод!'
    console.log(this.created);

  }

};

const second = new Second();

second.hello();