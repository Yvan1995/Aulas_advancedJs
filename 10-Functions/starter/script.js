'use strict';
console.log('section 10: A closer look at functions!');
console.log('****************************************');
console.log(' ');
/**
  
 const bookings = [];
 
 // default values no parametro(ES6)
 //importante notar que os valores default so soa aplicados caso não há um valor passado
 //na chamada da função, ou seja um valor undefined, caso houver ele é ignorado em detrimento 
 //do valor que está sendo passado
 const createBooking = function(flightNum, numPassengers = 1, 
     price = 199 * numPassengers) {
     //aplicando valores padrao aos parametros(ES5)
     // numPassengers = numPassengers || 1;
     // price = price || 199;
 
     const booking = {
         flightNum,
         numPassengers,
         price
     }
     console.log(booking);
     bookings.push(booking);
 }
 
 createBooking('LH123')
 createBooking('LH123', 2, 800)
 createBooking('LH123', 2)
 createBooking('LH123', 5)
 //caso queira deixar o valor default no parametro, um truque é passar undefined para o argumento,
 //pois não podemos usar como a desestruturação[arg1, ,arg2], ou seja, pulando um elemento.
 createBooking('LH123', undefined,1000)

 //aula 130
 const flight = 'LH24';
 const yvan = {
     name: 'Yvan Rondon',
     passport: 24739479284
 };
 
 const checkIn = function(flightNum, passenger) {
     flightNum = 'LH999';
     passenger.name = 'Mr. ' + passenger.name;
 
     if(passenger.passport === 24739479284) {
         alert('Checked in')
     } else {
         alert('Wrong passport')
     }
 }
 
 // checkIn(flight, yvan);
 // console.log(flight);
 // console.log(yvan);
 
 //É a mesma coisa que...
 // const flightNum = flight;
 // const passenger = yvan;
 
 const newPassport = function(person) {
     person.passport = Math.trunc(Math.random() * 100000)
 }
 
 newPassport(yvan);
 checkIn(flight, yvan);
 //130
 
 //aula 131 
 //juntando as palavras removendo os espaços vazios
 const oneWord = function(str) {
     return str.replace(/ /g, '').toLowerCase();
 }
 
 //unindo as palavras novamente e deixando a primeira letra maiuscula
 const upperFirstWord = function(str) {
     const [first, ...others] = str.split(' ');
     return [first.toUpperCase(), ...others].join(' ');
 }
 
 //Higher order function => função de ordem superior
 const transformer = function (str, fn) {
     console.log(`Original string: ${str}`);
     console.log(`Transformed string: ${fn(str)}`);
 
     console.log(`Transformed by: ${fn.name}`);
 }
 
 transformer('JavaScript is awesome!!', upperFirstWord);
 console.log('///////////////////////////////////////');
 transformer('JavaScript is awesome!!', oneWord);
 
 const high5 = function() {
     console.log('👏');
 }
 document.body.addEventListener('click', high5);
 
 ['Jonas', 'Martha', 'Adam'].forEach(high5);
 //aula 131

 //aula 132
 const greet = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
 }
 
 const greeterHey = greet('Hey');
 
 // Ao salvarmos o valor da função, podemos invocar novamente a função
 //armazenando seu estado anterior
 greeterHey('Jonas');
 greeterHey('Yvan');
 
 greet('Hey')('Teste');
 
 //small challenge(reescrever a função greet usando arrow => function)
 
 const greetNew = greeting => name => console.log(`${greeting} ${name}`);
 
 greetNew('Hi')('Yvan');
 //aula 132
 
 
 //aula 133
 const lufthansa = {
    airline: 'Lufthansa',
    iataCode: 'LH',
    bookings: [],
    // old way => book: function () {}
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline}
        flight ${this.iataCode}${flightNum}`
        );
        this.bookings.push({flight: `${this.iataCode}${flightNum}`, name});
    }
 }
 
 lufthansa.book(239, 'Yvan Rondon');
 lufthansa.book(635, 'John Smith');
 console.log(lufthansa);
 
 const eurowings = {
    airline: 'Eurowings',
    iataCode: 'EW',
    bookings: [],
 }
 
 const book = lufthansa.book;
 
 // Does not work
 // book(23, 'Sarah Willians'); 
 
 // Call method
 book.call(eurowings, 23, 'Sarah Willians');
 console.log(eurowings);
 
 book.call(lufthansa, 239, 'Mary Cooper');
 console.log(lufthansa);
 
 const swiss = {
    airline: 'Swiss Air Lines',
    iataCode: 'LX',
    bookings: [],
 };
 
 book.call(swiss, 583, 'Mary Cooper');
 console.log(swiss);
 
 // Apply method
 // o metodo aplly passa um array de argumentos para a função
 const flightData = [583, 'George Cooper'];
 book.apply(swiss, flightData)
 console.log(swiss);
 
 // Ao inves usarmos Apply podemos apenas usar spread operator 
 // para esparramar os elementos no argumento do metodo call,
 // eliminando assim a necessidade de usar o metodo Apply
 book.call(eurowings, ...flightData)
 console.log(eurowings);
 //aula 133
 
 //aula 134
 // Bind method
 // book.call(eurowings, 23, 'Sara Willians');
 
 const bookEW = book.bind(eurowings);
 const bookLH = book.bind(lufthansa);
 const bookLX = book.bind(swiss);
 
 bookEW(23, 'Steven Willians');
 
 const bookEW23 = book.bind(eurowings, 23);
 bookEW23('Yvan R. Barros neto');
 bookEW23('Martha Cooper');
 
 // WITH event listeners
 lufthansa.planes = 300;
 lufthansa.buyPlane = function() {
     console.log(this);
 
     this.planes++
     console.log(this.planes);
 }
 // lufthansa.buyPlane();
 
 document.querySelector('.buy').addEventListener('click', lufthansa.buyPlane.bind(lufthansa));
 
 // Partial aplication
 
 const addTax = (rate, value) => value + value * rate;
 
 console.log(addTax(0.1, 200));
 
 const addVAT = addTax.bind(null, 0.23);
 // addVAT = value => value + value * 0.23;
 
 console.log(addVAT(100));
 console.log(addVAT(23));
 
 const addTaxRate = function(rate) {
     return function(value) {
         return value + value * rate;
     }
 }
 const addVAT2 = addTaxRate(0.23);
 console.log(addVAT2(100));
 console.log(addVAT2(23));
 //aula 134
 
 //aula 136
 const runOnce = function () {
     console.log('this will never run again');
 };
 runOnce();
 
 // IIFE
 (function() {
     console.log('this will never run again!!');
 })();
 
 (() => console.log('this will ALSO never run again!!'))();
 //aula 136
 
 //aula 137

 const secureBooking = function () {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    } 
}

// aparentemente o booker armazena o estadi let passengerCount = 0;
// dessa forma ele pode ser incrementado toda ves no retorno da função anonima dentro de secureBooking
const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);
//aula 137
 */

//aula 138

// Example 1
let f;

const g = function () {
    const a = 23;
    f = function () {
        console.log(a * 2);
    };
};


const h = function() {
    const b = 777;
    f = function () {
        console.log(b * 2);
    }
}

g();
f();
console.dir(f);

// Re-assigning f function
h();
f();
console.dir(f);

// Example 2

const boardPassengers = function(n, wait) {
    //para testar o escopo global comente a linha abaixo
    const perGroup = n / 3;

    setTimeout(function(){
        console.log(`We are boarding all ${n} passengers`);
        console.log(`There are 3 groups, each with ${perGroup} passengers `);
    }, wait * 1000 )

    console.log(`Will start boarding in ${wait} seconds`);
}

//closure tem prioridade sobre o escopo global, esse trecho não funcionaria
const perGroup = 1000;
// wait in seconds
boardPassengers(180, 3); 
