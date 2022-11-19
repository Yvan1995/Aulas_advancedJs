/**
 * Coding Challenge #2
This is more of a thinking challenge than a coding challenge 🤓
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!

(1. Pegue o IIFE abaixo e ao final da função, anexe um event listener que
muda a cor do elemento h1 selecionado ('cabeçalho') para azul, toda vez
o elemento do corpo é clicado. Não selecione o elemento h1 novamente!)

2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.
(function () {
const header = document.querySelector('h1');
header.style.color = 'red';
})();
 */
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';
    })();