'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
/**
 * 
 // Data
 const account1 = {
   owner: 'Jonas Schmedtmann',
   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
   interestRate: 1.2, // %
   pin: 1111,
 };
 
 const account2 = {
   owner: 'Jessica Davis',
   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
   interestRate: 1.5,
   pin: 2222,
 };
 
 const account3 = {
   owner: 'Steven Thomas Williams',
   movements: [200, -200, 340, -300, -20, 50, 400, -460],
   interestRate: 0.7,
   pin: 3333,
 };
 
 const account4 = {
   owner: 'Sarah Smith',
   movements: [430, 1000, 700, 50, 90],
   interestRate: 1,
   pin: 4444,
 };
 
 const accounts = [account1, account2, account3, account4];
 
 // Elements
 const labelWelcome = document.querySelector('.welcome');
 const labelDate = document.querySelector('.date');
 const labelBalance = document.querySelector('.balance__value');
 const labelSumIn = document.querySelector('.summary__value--in');
 const labelSumOut = document.querySelector('.summary__value--out');
 const labelSumInterest = document.querySelector('.summary__value--interest');
 const labelTimer = document.querySelector('.timer');
 
 const containerApp = document.querySelector('.app');
 const containerMovements = document.querySelector('.movements');
 
 const btnLogin = document.querySelector('.login__btn');
 const btnTransfer = document.querySelector('.form__btn--transfer');
 const btnLoan = document.querySelector('.form__btn--loan');
 const btnClose = document.querySelector('.form__btn--close');
 const btnSort = document.querySelector('.btn--sort');
 
 const inputLoginUsername = document.querySelector('.login__input--user');
 const inputLoginPin = document.querySelector('.login__input--pin');
 const inputTransferTo = document.querySelector('.form__input--to');
 const inputTransferAmount = document.querySelector('.form__input--amount');
 const inputLoanAmount = document.querySelector('.form__input--loan-amount');
 const inputCloseUsername = document.querySelector('.form__input--user');
 const inputClosePin = document.querySelector('.form__input--pin');

 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const displayMovements = function(movements, sort = false) {
 // limpando o HTML
 containerMovements.innerHTML = '';

 const movs = sort ? movements.slice().sort((a,b) => a - b) : movements;

 movs.forEach(function(mov, i) {
   const type = mov > 0 ? 'deposit' : 'withdrawal';

   const html = `
   <div class="movements__row">
     <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
     <div class="movements__value">${mov} €</div>
   </div>
   `;
   // metodo insertAdjacentHTML aceita duas strings como arg, o primeiro é a posição,
   // o segundo é a string do elemento que queremos adicionar.
   containerMovements.insertAdjacentHTML('afterbegin', html)
 });
};

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements.filter(mov => mov >= 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  const out = acc.movements.filter(mov => mov <= 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} €`

  const interest = acc.movements
  .filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) /100)
  .filter((int, i, arr) => {
    console.log(arr);
    return int >= 1;
  })
  .reduce((acc, int) => acc + int, 0)
  labelSumInterest.textContent = `${interest} €`
}

const createUserNames = function (accs) {
  accs.forEach(function(acc) {
    acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
  })
}

createUserNames(accounts); 

const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
}

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // evitar o envio do formulario por padrao
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  
  inputTransferAmount.value = inputTransferTo.value = '';

  if(
    amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    //update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    // Delete account
    accounts.splice(index, 1);
    
    // Hide UI
    containerApp.style.opacity = 0;
  }
  // limpar os campos apos preencher
  inputCloseUsername.value = inputClosePin.value = '';
})

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
 
 /////////////////////////////////////////////////
 /////////////////////////////////////////////////
 // LECTURES
 
 const currencies = new Map([
   ['USD', 'United States dollar'],
   ['EUR', 'Euro'],
   ['GBP', 'Pound sterling'],
 ]);
 
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 */

/////////////////////////////////////////////////

/**
 * 
 // SLICE
 let arr = ['a', 'b', 'c', 'd', 'e' ];
 console.log(arr.slice(2));
 console.log(arr.slice(2,4));
 console.log(arr.slice(-2));
 console.log(arr.slice(-1));
 console.log(arr.slice(1, -2));
 
 // SPLICE
 
 // console.log(arr.splice(2));
 arr.splice(-1);
 console.log(arr);
 arr.splice(1,2);
 console.log(arr);
 
 // REVERSE
 
 arr = ['a', 'b', 'c', 'd', 'e' ];
 const arr2 = ['j', 'i', 'h', 'g', 'f'];
 console.log(arr2.reverse());
 console.log(arr2);
 
 // CONCAT
 
 const letters = arr.concat(arr2);
 console.log(letters);
 console.log([...arr, ...arr2]);
 
 // JOIN
 
 console.log(letters.join(' - '));
 // aula 143
 const arr = [23, 11, 64];
 console.log(arr[0]);
 console.log(arr.at(0));
 
 // getting last array element
 console.log(arr[arr.length - 1]);
 console.log(arr.slice(-1)[0]);
 console.log(arr.at(-1));
 console.log(arr.at(-2));
 
 // at é iteravel com strings
 
 console.log('yvan'.at(0));
 console.log('yvan'.at(-1));
 // aula 143
 // aula 144

 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

 // for (const movement of movements) 
   for (const [i, movement] of movements.entries()) {
   if (movement > 0) {
     console.log(`movement ${i + 1}: You deposited ${movement}`);
   } else {
     console.log(`movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
   }
 }
 
 console.log('- - - - - - FOREACH - - - - - - ');
 
 // OBS: seguir ordem dos argumentos
 // primeiro argumento: os elementos do array que estamos fazendo a iteração
 // segundo argumento: o que vai receber o indice do array
 // terceiro argumento: o que recebe o array inteiro
 // forEach não contem break, então não é possivel parar a iteração
 movements.forEach(function(movement, i, array) {
   if (movement > 0) {
     console.log(`movement ${i + 1}: You deposited ${movement}`);
   } else {
     console.log(`movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
   }
 })
// aula 144
 */

// aula 145
// Map => [key, value] 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
})

// Set
// Set não possue key nem indices
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// underline => variavel ou argumento descartavel
currenciesUnique.forEach(function(value, _ , map) {
  console.log(`${value}: ${value}`);
})
// aula 145

// aula 149
 /**
   *********** MAP ************

   👉 map returns a new array containing
  the results of applying an operation
  on all original array elements

   *********** FILTER ************
   👉 filter returns a new array
  containing the array elements that
  passed a specified test condition

   *********** REDUCE ************
   👉 reduce boils (“reduces”) all array
  elements down to one single value
  (e.g. adding all elements together)

  // aula 149
  // aula 150
  // *********** MAP ************
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
  const eurToUsd = 1.1;
 
  const movementsUSD = movements.map(mov => mov * eurToUsd);
 
  console.log(movements);
  console.log("USD =>", movementsUSD);
 
  const movementsUsdFor = [];
  for (const mov of movements) movementsUsdFor.push(mov * eurToUsd);
  console.log(movementsUsdFor);
 
 const movementsDescriptions = movements.map((mov, i) => 
   `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(mov)}`
 ); 
 
 console.log(movementsDescriptions);
 // aula 150
 // aula 151
 const createUserNames = function (accs) {
   accs.forEach(function(acc) {
     acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
   })
 }
 
 createUserNames(accounts); 
 console.log(accounts);
 // aula 151
 
 // aula 152
 // Filter method
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
 const deposits = movements.filter(function(mov) {
   return mov > 0;
 })
 console.log(movements);
 console.log(deposits);
 
 // for
 const depositsFor = [];
 for(const mov of movements) if (mov > 0) depositsFor.push(mov)
 console.log("For =>",depositsFor);
 
 const withdrawal = movements.filter(mov => mov < 0 );
 console.log(withdrawal);
 // aula 152
 
 // aula 153
 // Reduce method
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
 console.log(movements);
 
 // const balance = movements.reduce(function(acc, cur, i, arr) {
 //   console.log(`Iteration ${i}: ${acc}`);
 //   return acc + cur;
 // }, 0);// => um outro argumento que podemos adicionar é o valor inicial do acumulador por padrão
 // // por exemplo nesse caso é 0. Então na primeira iteração dependendo do valor ele é adicionado ao acumulador.
 // console.log(balance);
 
 // Usando arrow function 
 const balance = movements.reduce((acc, cur) => acc + cur , 0);
 console.log(balance);
 
 // for
 let balance2 = 0;
 for (const mov of movements) balance2 += mov
 console.log(balance2);

 // Maximum value
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 const max = movements.reduce((acc, mov) => {
  console.log(`acc:${acc} mov:${mov}`);
  if (acc > mov) {
    return acc
  } else {
    return mov
  }
 }, movements[0])
 console.log(max);
 // aula 153
 // aula 155
 const eurToUsd = 1.1;
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
 // PIPELINE
 const totalDepositsUSD = movements.filter(mov => mov > 0)
 // .map(mov => mov * eurToUsd)
 // no exemplo abaixo podemos usar o terceiro argumento do map para inspecionar o fluxo do encadeamento
 // no caso o terceiro argumento (arr), isso pode ser util caso no final nos retorne um resultado estranho
 // como por exemplo um valor negativo ou qualquer outra coisa do tipo, por isso pode ser util inspecionar o array.
 .map((mov, i, arr) => {
   // console.log(arr);
   return mov * eurToUsd;
 })
 .reduce((acc, mov) => acc + mov, 0);
 console.log(totalDepositsUSD);

 // aula 157
 // FIND METHOD => util para encontrar e retornar um elemento unico em um array de objetos por exemplo.
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
 const firstWithdrawal = movements.find(mov => mov < 0);
 
 console.log(movements);
 console.log(firstWithdrawal);
 
 console.log(accounts);
 
 const account = accounts.find(acc => acc.owner === 'Jessica Davis');
 console.log(account);
 
 // aula 157
 */
