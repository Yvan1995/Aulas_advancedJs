'use strict';
console.log('----------Data structures, modern operators and strings---------');
// Data needed for a later exercise
// const flights =
// '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // abaixo cálculo so pra demonstração
  [weekdays[4 + 1]]: {
    open: 0, // Open 24 hours
    close: 12 + 12,
  },
};

// Data needed for first part of the section
const restaurant = {
  nome: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  // ES6 enhanced object literals
  openingHours,
  // openingHours: openingHours,

  //order: function (starterIndex, mainIndex) => old way
  order(starterIndex, mainIndex) {
    // this se refere a esse objeto.
    // com os parametros podemos acessar qualquer indice do array
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Order received! ${this.mainMenu[mainIndex]}
    will be delivered to ${address} at ${time}`);
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(`Here is your delicious pasta with ${ing1},
    ${ing2}, ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};
/**
 * exemplo para nulish coalition operator
 const rest1 = {
   name: 'Capri',
   // numGuests: 20,
   numGuests: 0,
 };
 const rest2 = {
   name: 'La Piazza',
   owner: 'Giovanni Rossi',
 };
*/
const flights = '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Delayed departure from FAD to TXL (11h25)
//          Arrival from BRU to FAD (11h45)
// Delayed arrival from HEL to FAD (12h05)
//          Departure from FAD to LIS (12h30)

console.log(flights.split('+'));

const getCode = str => str.slice(0,3).toUpperCase();

for(const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `
   ${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll('_', '')} 
   ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})
  `.padStart(36);
  console.log(output);
}



/**
 *  // Working with strings part 3
 The split() method splits a string into an array of substrings.
 The split() method returns the new array.
 The split() method does not change the original string.
 If (" ") is used as separator, the string is split between words.
 ////////////////////////////////////////////////////////////////
 The join() method returns an array as a string.
 The join() method does not change the original array.

 console.log('a+very+nice+string'.split('+'));
 console.log('Yvan Rondon'.split(' '));
 
 // Usando desestruturação para armazenar strings em variaveis.
 const [firstName, lastName] = 'Yvan Rondon'.split(' ');
 console.log(firstName, lastName);
 
 //o metodo join simplesmente junta as strings, em seu parametro definimos como sera essaa junção,
 // seja um espaço, ou ate mesmo uma string
 const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
 console.log(newName);
 
 const capitalizeName = function (name) {
   const names = name.split(' ');
   const namesUpper = [];
 
   for (const n of names) {
     // namesUpper.push(n[0].toUpperCase() + n.slice(1));
     //outra forma para resolver
     namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
   }
   console.log(namesUpper.join(' '));
 };
 
 capitalizeName('jessica ann smith davies');
 capitalizeName('yvan rondon de barros neto');
 
 // Padding
 
 const message = 'Go to gate 23';
 console.log(message.padStart(25, '+').padEnd(30, '+'));
 console.log('yvan'.padStart(5, '+').padEnd(10, '+'));
 
 // Real use case of padding
 
 const maskCreditCard = function (number) {
   // ao usar o sinal de '+' com uma string, js converte tudo para string
   const str = number + '';
   const last = str.slice(-4); 
   return last.padStart(str.length, '*');
 };
 
 console.log(maskCreditCard(1324654132131231));
 console.log(maskCreditCard('1324654132134188'));
 
 // Repeat
 const message2 = 'Bad waether... All departues Delayed';
 console.log(message2.repeat(5));
 
 const planesInLine = function (n) {
   console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
 };
 
 planesInLine(5);
 planesInLine(4);
  // Working with strings part 2
  const airline = 'TAP Air Portugal';
  const plane = 'A320';
 
 console.log(airline.toLowerCase());
 console.log(airline.toUpperCase());
 
 // Fix capitalization in name
 
 const passenger = 'yVAn'; //=> Jonas
 const passengerLower = passenger.toLowerCase();
 const passengerCorrect =
   passengerLower[0].toUpperCase() + passengerLower.slice(1);
 console.log('=>', passengerCorrect);
 
 // with function
 const capitalizationFn = function (string) {
   let toLower = string.toLowerCase();
   let Correct = toLower[0].toUpperCase() + toLower.slice(1);
   console.log(Correct);
 };
 
 capitalizationFn('YVAN');
 capitalizationFn('bRuno');
 capitalizationFn('jOnas');
 
 //comparing emails
 
 const email = 'hello@jonas.io';
 const loginEmail = '  Hello@Jonas.Io \n';
 
 // const lowerEmail = loginEmail.toLowerCase();
 // const trimEmail = lowerEmail.trim();
 // console.log(trimEmail);
 
 const normalizedEmail = loginEmail.toLowerCase().trim();
 console.log(normalizedEmail);
 
 // with function
 const normalizedFn = function (email) {
   const normalized = email.toLowerCase().trim();
   console.log(normalized);
 };
 
 normalizedFn('  Hello@YvAn.Io \n');
 normalizedFn('GMAil@Teste.com \n');
 normalizedFn(loginEmail);
 
 // Replacing
 
 const priceBR = '288,50R';
 const priceUS = priceBR.replace('R', '$').replace(',', '.');
 console.log(priceUS);
 
 const announcement =
   'All passengers come to boarding door 23. Boarding door 23!';
 // console.log(announcement.replace('door', 'gate'));
 console.log(announcement.replaceAll('door', 'gate'));
 
 // Booleans
 // nos retorna true ou false caso contenha a string declarada no parametro do metodo
 const newplane = 'Airbus A320neo';
 
 console.log(newplane.includes('A320'));
 console.log(newplane.includes('Boeing'));
 console.log(newplane.startsWith('Air'));
 
 if (newplane.startsWith('Airbus') && newplane.endsWith('neo')) {
   console.log('Part of the new Airbus family!');
 }
 
 const checkBagage = function (items) {
   const baggage = items.toLowerCase();
   if (baggage.includes('knife') || baggage.includes('gun')) {
     console.log('You are not allowed on board');
   } else {
     console.log('Welcome aboard');
   }
 };
 
 checkBagage('I have a laptop, some food, and a pocket KniFe');
 checkBagage('Socks and cameras');
 checkBagage('Got some snacks and a Gun for protection');

 // Working with strings part 1
 const airline = 'TAP Air Portugal';
 const plane = 'A320';
 
 console.log(plane[0]);
 console.log(plane[1]);
 console.log(plane[2]);
 console.log('B737'[0]);
 
 console.log(airline.length);
 console.log('B737'.length);
 
 console.log(airline.indexOf('r'));
 console.log(airline.lastIndexOf('r'));
 console.log(airline.indexOf('Portugal'));
 
 console.log(airline.slice(4));
 console.log(airline.slice(4, 7));
 
 console.log(airline.slice(0, airline.indexOf(' ')));
 console.log(airline.slice(airline.lastIndexOf(' ') + 1));
 
 console.log(airline.slice(-2));
 // tira o primeiro e o ultimo
 console.log(airline.slice(1, -1));
 
 const checkMiddleSet = function (seat) {
   // B and E are middle seats
   const s = seat.slice(-1);
   if (s === 'B' || s === 'E') {
     console.log('You got the middle seat!');
   } else {
     console.log('You got lucky 😉');
   }
 };
 
 checkMiddleSet('11B');
 checkMiddleSet('23C');
 checkMiddleSet('3E');
 
 console.log(new String('Yvan'));
 console.log(typeof new String('Yvan'));

 const question = new Map([
   ['question', 'what is the best programing language in the world?'],
   [1, 'C'],
   [2, 'Java'],
   [3, 'JavaScript'],
   ['correct', 3],
   [true, 'Correct 😉'],
   [false, 'Try again!'],
 ]);
 console.log(question);
 
 // Convert Objects to map
 console.log(Object.entries(openingHours));
 const hoursMap = new Map(Object.entries(openingHours));
 console.log(hoursMap);
 
 // Quiz app
 console.log(question.get('question'));
 for (const [key, value] of question) {
   if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
 }
 //const answer = Number(prompt('Your answer'));
 // console.log(answer);
 // print the correct answer (challenge)
 // a comparação dentro do metodo get nos devolve um boolean
 // que cai dentro do objeto question
 // console.log(question.get(question.get('correct') === answer));
 
 // Convert map to array
 console.log([...question]);
 console.log(question.entries());
 console.log(question.keys());
 console.log(question.values());
 
 // Map fundamentals
 // setando os valores
 const rest = new Map();
 rest.set('name', 'Classico Italiano');
 rest.set(1, 'Firenze, Italy');
 console.log(rest.set(2, 'Lisbon, Portugal'));
 
 rest
   .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
   .set('open', 11)
   .set('close', 23)
   .set(true, 'We are open!')
   .set(false, 'We are closed');
 
 // acessando os valores
 console.log(rest.get('name'));
 console.log(rest.get(true));
 console.log(rest.get(1));
 
 const time = 8;
 //(short-circuiting &&)
 // apesar das partes estarem de certa forma desacopladas, ou seja, nao fazerem parte de uma mesma chave:valor
 // usar comparação logica nos retorna um valor true ou false, com isso podemos comparar diferentes "pedaços"
 // para um retorno desejado, no caso a chave:valor 'open':11 ou 'close':23 (valores booleanos)
 // se 'time' for maior na comparação, nos retorna 'true', nos levando assim para a chave:valor true => 'We are open'
 console.log(rest.get(time > rest.get('open') && time < rest.get('close')));
 
 console.log(rest.has('categories'));
 rest.delete(2);
 //rest.clear() => limpa o Map
 
 const arr = [1, 2];
 rest.set(arr, 'Test');
 rest.set(document.querySelector('h1'), 'Heading');
 console.log(rest.size);
 //caso usassemos a sintaxe literal rest.get([1,2]) para tentar acessar o Map
 // isso seria undefined, pois [1,2] ja existem em memoria, entao o correto seria armazenar em uma nova variavel
 // pois assim estariamos criando um novo espaço "livre" em memoria.
 console.log(rest.get(arr));

 // O método Set nos devolve um valor unico, ou seja,
 // não repete valores iguais em seu retorno basicamente
 const ordersSets = new Set([
   'Pasta',
   'Pizza',
   'Pizza',
   'Risotto',
   'Pasta',
   'Pizza',
 ]);
 console.log(ordersSets);
 
 //strings tambem são iteraveis, no exemplo abaixo o retorno sera:
 //Set(4) { 'Y', 'v', 'a', 'n' }
 console.log(new Set('Yvan'));
 
 console.log(ordersSets.size);
 console.log(ordersSets.has('Pizza'));
 console.log(ordersSets.has('Bread'));
 ordersSets.add('Garlic bread');
 ordersSets.add('Garlic bread');
 ordersSets.delete('Risotto');
 //ordersSets.clear(); => deleta todos os elementos
 console.log(ordersSets);
 
 for (const order of ordersSets) console.log(order);
 
 // example of use case. Remove duplicate itens.
 const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
 
 // transformando em array e desempacotando os items
 const staffUnique = [...new Set(staff)];
 console.log(staffUnique);
 
 console.log(
   new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
 );
 
 console.log(new Set('yvanrondon').size);
 
 // Property NAMES
 const properties = Object.keys(openingHours);
 //properties vem formato de array, logo da pra iterar sob ele
 console.log(properties);
 
 let openStr = `We are open ${properties.length} days:`;
 
 for (const day of properties) {
  openStr += `${day},`;
 }
 console.log(openStr);
 
 //Property VALUES
 const values = Object.values(openingHours);
 console.log(values);
 
 //Entire object
 const entries = Object.entries(openingHours);
 console.log(entries);
 
 for (const [key, { open, close }] of entries) {
   console.log(`On ${key} we open at ${open} and close at ${close}`);
 }
 //Optional CHAINING
 if (restaurant.openingHours && restaurant.openingHours.mon)
   console.log(restaurant.openingHours.mon.open);
 
 //WITH optional chaining
 console.log(restaurant.openingHours.mon?.open);
 console.log(restaurant.openingHours?.mon?.open);
 
 //example
 const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
 
 for (const day of days) {
   console.log(day);
   const open = restaurant.openingHours[day]?.open ?? 'closed';
   console.log(`On ${day}, we open at ${open}`);
 }
 
 //methods
 console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
 console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');
 
 // Arrays
 const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
 
 console.log(users[0]?.name ?? 'User array empty');
 //////////////////////////////////////////////////////////////////
 // The for-of loop
 
 const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
 for (const item of menu) console.log(item);
 
 for (const [i, el] of menu.entries()) {
   console.log(`${i + 1}: ${el}`);
   // old school 👇
   // console.log(`${item[0] + 1}: ${item[0]}`);
 }
 
 // for (const item of menu) {
 // o metodo entries(), nos devolve um array com duas posições,
 //uma com o indice e outra com o elemento atualmente iterado => [i, el]
 //caso não usassemos o menu.entries(), estariamos acessando na iteração,
 //a posição de cada elemento da string em si, ou seja ['Focaccia', 'Bruschetta' etc.... ] => F e o, B e r
 //e assim sucessivamente.
 // console.log(`${item[0] + 1}: ${item[1]}`);
 // }
 // console.log([...menu.entries()]);
 ///////////////////////////////////////////////////////////////////
 // OR assignment operator
 // rest1.numGuests = rest1.numGuests || 10;
 // rest2.numGuests = rest2.numGuests || 10;
 // operador lógico para não repetir variveis.
 // rest1.numGuests ||= 10;
 // rest2.numGuests ||= 10;
 
 // nullish assignment operator (null or undefined)
 rest1.numGuests ??= 10;
 rest2.numGuests ??= 10;
 
 //OBS como 'rest2.owner' realmente existe no obj ou seja gerará um valor TRUE,
 //o curto circuito ocorre no operando da direita caso ele seja TRUE tambem,
 //no exemplo da linha abaixo rest2.owner = TRUE e '<ANONYMOUS>' tambem é TRUE, pois não é uma string vazia(FALSE),
 // então o retorno é a string <ANONYMOUS>.
 //=>rest2.owner = rest2.owner && '<ANONYMOUS>';
 //nesse exemplo abaixo temos um resultado FALSE no operador da esquerda, pois não existe a propiedade no objeto,
 //logo o retorno é undefined, e o JS nem analisa o resultado da direita, pois a expressão ja foi finalizada.
 //=>rest1.owner = rest1.owner && '<ANONYMOUS>';
 
 rest1.owner &&= '<ANONYMOUS>';
 rest2.owner &&= '<ANONYMOUS>';
 
 console.log(rest1);
 console.log(rest2);
 //OBS BUG Node v12.16.1, não suporta nullish coalescing operator
 // The nullish coalescing operator (??) (operador de coalescencia nula)
 restaurant.numGuests = 0;
 const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
 console.log(guests1);
 
 const guests2 = restaurant.numGuests || 10;
 console.log(guests2);
 
 // Nullish: null and undefined (NOT 0 or '').
 //Na prática o que o operador (??) faz é reconhecer como TRUE valores null ou undefined
 // O operador de coalescência nula (??) é um operador lógico que retorna o seu operando
 // do lado direito quando o seu operador do lado esquerdo é null ou undefined.
 // Caso contrário, ele retorna o seu operando do lado esquerdo.  16 de jul. de 2021, by MDN contributors
 const guestCorrect = restaurant.numGuests ?? 10;
 console.log(guestCorrect);
 // Short circuiting (&& and ||)
 console.log('------OR-----');
 // primeiro valor TRUE é retornado.
 // Podem ser usado com qualquer tipo de dados, e retornar,
 // qualquer tipo de dado tambem. (short-circuiting)
 console.log(3 || 'Jonas');
 console.log('' || 'Jonas'); // string vazia é false.
 console.log(true || 0);
 console.log(undefined || null); // undefined e null é false.
 
 console.log(undefined || 0 || '' || 'Hello' || 23 || null); // =>'Hello'
 
 //OBS: caso 'restaurant.numGuests', for 0 (que é um valor false), não aconteceria um curto circuito
 restaurant.numGuests = 0;
 const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
 console.log(guests1);
 
 const guests2 = restaurant.numGuests || 10;
 console.log(guests2);
 
 console.log('------ AND ------');
 //No caso do operador lógico AND, o curto circuito acontece retornando o primeiro valor 'false',
 // e isso faz sentido, pois de qualquer maneira a expressão já está condenada a um retorno 'false',
 // recapitulando: TRUE && TRUE => TRUE, TRUE && FALSE ou FALSE && TRUE => FALSE.
 console.log(0 && 'Jonas');
 console.log(7 && 'Yvan');
 
 console.log('Hello' && 23 && null && 'Jonas');
 
 // Practical example
 if (restaurant.orderPizza) {
   restaurant.orderPizza('mushrooms', 'spinach');
 }
 
 //OBS: Nesse exemplo podemos notar a utilidade do curto circuito AND em fazer a exata mesma função do bloco IF acima,
 //como 'restaurant.orderPizza' existe no objeto (TRUE), podemos invocar o método(função) orderPizza() do objeto restaurant.
 //caso não existisse o objeto ou o método, a expressão nem seria mais avaliada, pois o retorno será FALSE.

 restaurant.orderPizza && restaurant.orderPizza('cheese', 'onion');

 // REST Pattern and parameters
 // 1) Destructuring
 // SPREAD, pq está a direita de ' = '.
 const arr = [1, 2, ...[3, 4]];
 
 // REST, pq está a esquerda de ' = '.
 // importante observar o contexto em que se está usando o REST, ja que sua sintaxe (...),
 // é exatamente a mesma do SPREAD (...), abaixo o uso dele (REST) esta sendo feito para colocar
 // o restante dos elementos que estão sendo desestruturados, em um array própio, ou seja,
 // seu funcionamente é exatamente o contrário do SPREAD, ja que ele embala os elementos em um array unico,
 // enquanto o SPREAD, 'desempacota' os elementos individualmente.
 const [a, b, ...others] = [1, 2, 3, 4, 5]; //=> 1 2 [ 3, 4, 5 ]
 console.log(a, b, others);
 
 //Nesse exemplo temos a desestruturação do array 'mainMenu' do objeto restaurant,
 // 'mainMenu' tem 3 elementos que foram atribuidos as variaveis pizza['Pizza'], o segundo foi pulado,
 //no terceito temos a variavel risotto['Risotto'], a variavel REST(...otherFood), captura em um array
 // os elementos do array 'starterMenu', que estão espalhados individualmente pelo SPREAD operator(na direita) (...restaurant.starterMenu),
 //são então condensados em um novo array.[]
 //OBS: REST precisa ser o ultimo elemento da desestruturação.
 const [pizza, , risotto, ...otherFood] = [
   ...restaurant.mainMenu,
   ...restaurant.starterMenu,
 ];
 console.log(pizza, risotto, otherFood);
 
 // Objects {variaveis devem conter o mesmo nome que esta no objeto}
 const { sat, ...weekDays } = restaurant.openingHours;
 console.log(sat, weekDays);
 
 // 2) Functions
 // O uso de REST em parametros de funções é extremamente util, ao meu ver o uso é muito natural e lógico,
 // pois podemos lidar tanto com arrays(caso do array x), como argumentos passados individualmente na chamada da função.
 // Ainda temos a possibilidade de usar SPREAD na chamada da função para descompactar um array, e então com REST,
 // podemos compactar novamente no argumento, tornando extremamente util e versatil os argumentos das funções.
 const add = function (...numbers) {
   let sum = 0;
   for (let i = 0; i < numbers.length; i++) {
     sum += numbers[i];
   }
   console.log(sum);
 };
 add(2, 3);
 add(5, 3, 7, 2);
 add(8, 2, 5, 3, 2, 1, 4);
 
 const x = [23, 5, 7];
 add(...x);
 
 restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
 restaurant.orderPizza('mushrooms');

 // The Spread operator (...)
 const arr = [7, 8, 9];
 const badNewArray = [1, 2, arr[0], arr[1], arr[2]];
 console.log(badNewArray);
 
 // spread operator
 //OBS: o operador spread, coloca elemento por elemento do array no novo array,
 //não somente inserindo o array inteiro como um objeto(que o que um array é em js afinal)
 const newArr = [1, 2, ...arr];
 //const newArr = [1, 2, arr]; => [1,2, Array(3)]// sem spread
 console.log(newArr);
 //podemos notar o lançamento individual dos elemetos no console
 console.log(...newArr);
 
 // importante lembrar que so podemos usar o operador spread em lugares onde,
 // teriamos que acessar os elementos atraves de virgulas, com o operador spread
 // isso não é necessario, ja que ele esparrama os elementos individualmente.
 const newMenu = [...restaurant.mainMenu, 'Gnocci'];
 console.log(newMenu);
 
 // Copy array
 const mainMenuCopy = [...restaurant.mainMenu];
 console.log(mainMenuCopy);
 
 // Join 2 array or more (challenge) join starterMenu e mainMenu.
 const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
 console.log(menu);
 
 // Iterables: arrays, strings, maps, sets, NOT objects.
 const str = 'Yvan';
 const letters = [...str, ' ', 'S.'];
 console.log(letters);
 console.log(...str); //=> Y v a n
 //console.log(`${...str} Rondon`);=> não é possivel usar spread em templates literal
 
 // Example with prompt(user input) client side
 const ingredients = [
   // prompt("let's make pasta! Ingredient 1?"),
   // prompt('ingredient 2?'),
   // prompt('ingredient 3?'),
 ];
 console.log(ingredients);
 
 //restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
 restaurant.orderPasta(...ingredients);
 
 //Objects (ES2018)
 const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
 console.log(newRestaurant);
 
 const restaurantCopy = { ...restaurant };
 restaurantCopy.nome = 'Ristorant Roma';
 console.log(restaurantCopy.nome);
 console.log(restaurant.nome);

 //Destructuring objets, e renomeando variaveis.
 restaurant.orderDelivery({
   time: '22:30',
   address: 'Via del Sole, 21',
   mainIndex: 2,
   starterIndex: 2,
 });
 
 restaurant.orderDelivery({
   address: 'Via del Sole, 21',
   starterIndex: 1,
 });
 const { nome, openingHours, categories } = restaurant;
 console.log(nome, openingHours, categories);
 
 const {
   nome: restaurantName,
   openingHours: hours,
   categories: tags,
 } = restaurant;
 console.log(restaurantName, hours, tags);
 
 // Default values
 // assim como arrays, podemos definir valores padrões para objetos, no exemplo abaixo,
 // (menu) não existe no objeto 'restaurant', entretanto definimos uma valor default pra ele,
 //OBS: atributos que existem no objeto não é possivel atribuir um valor default
 const { menu = [], starterMenu: starters = [] } = restaurant;
 console.log(menu, starters);
 
 // Mutating variables
 let a = 111;
 let b = 999;
 const obj = { a: 23, b: 7, c: 14 };
 // OBS: Pode parecer meio confuso e sem sentido desestruturar objetos ou arrays,
 //entretanto isso nos ajuda a não repetir nomes de variaveis a todo momento(DRY: dont repeat yourself)
 //ex: obj.a + obj.a - (obj.b + obj.c), na linha abaixo podemos ja observar o poder da desestruturação
 ({ a, b } = obj);
 console.log(a, b);
 
 // nested objects(objetos aninhados)
 const {
   fri: { open, close },
 } = openingHours;
 console.log(open, close);
 // Destructuring Arrays 
 const arr = [2, 3, 4];
 const a = arr[0];
 const b = arr[1];
 const c = arr[2];
 
 const [x, y, z] = arr;
 console.log(x, y, z);
 
 // para acessarmos um elemento do array que não esteja na ordem linear
 // basta deixarmos um espaço em branco
 let [main, , secondary] = restaurant.categories;
 console.log(main, secondary);
 
 // Switiching variables
 // const temp = main;
 // main = secondary;
 // secondary = temp;
 // console.log(main, secondary);
 
 [main, secondary] = [secondary, main];
 console.log(main, secondary);
 
 // console.log(restaurant.order(2, 0));
 
 // Receive 2 return values from a function
 const [starter, mainCourse] = restaurant.order(2, 0);
 console.log(starter, mainCourse);
 
 // Arrays aninhados
 const nested = [2, 4, [5, 6]];
 // const [i, , j] = nested;
 // console.log(i, j);
 const [i, , [j, k]] = nested;
 console.log(i, j, k);
 console.log(i + j + k);
 
 // Default values
 // podemos adicionar um valor padrao para valores que por ventura possam
 // ser undefined(ou que não exista no array)
 const [p = 1, q = 1, r = 1] = [8, 9];
 console.log(p, q, r);
 */
