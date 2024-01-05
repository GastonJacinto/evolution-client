// 1 - Escriba una función que retorne el mayor elemento de un array de números
// No vale utilizar el método .sort()
function greatestElement(numbers) {
  let max = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    numbers[i] > max && (max = numbers[i]);
  }
  return max;
}
let numeros = [10, 9, 5, 45, 15];
let numeros2 = ['a', 'b', 'c', 'd', 'e'];

console.log('el elemento mas grande es: ' + greatestElement(numeros));

// 2 - Escriba una función que calcule la suma de todos los elementos numéricos de un array
function suma(numbers) {
  let suma = 0;
  numbers.forEach((number) => {
    suma += number;
  });
  return suma;
}
console.log('la suma es: ' + suma(numeros));

// 3 - Escriba una función que retorne true si una String es un palíndromo
function isPalindromo(string) {
  let stringReversed = string.split('').reverse().join('');
  return stringReversed === string ? true : false;
}
console.log('Es palindromo? ' + isPalindromo('neuquen'));
// 4 - Escriba una función que combine 2 listas alternando sus elementos.
// ej: [a,b,c], [1,2,3] → [a,1,b,2,c,3].

function combineList(list1, list2) {
  const newArray = [];
  for (let i = 0; i < list1.length; i++) {
    newArray.push(list1[i]);
    newArray.push(list2[i]);
  }
  return newArray;
}
console.log('Combine: ' + combineList(numeros, numeros2));
// 5 - Escribe una función que calcule la lista de los primeros 100 números Fibonacci
// Los primeros números Fibonacci son 1 y 1.
// El enésimo numero Fibonacci se calcula agregando el enésimo-1 con el enésimo-2
//  1, 1, 1+1=2, 1+2=3, 2+3=5, 3+5=8.
function fibonacci(number) {
  if (number <= 1) {
    return 1;
  }
  return number - 1 + fibonacci(number - 2);
}
console.log('fibonacci: ' + fibonacci(5));
// 6 - Escribir función para tomar un array de Strings e imprimir, cada palabra en una línes
// dentro de un cuadro retangular.
// Por ejemplo la lista ["Hello", "World", "in", "a", "frame"] debería salir así:
//
// *********
// * Hello *
// * World *
// * in    *
// * a     *
// * frame *
// *********
function imprimirEnCuadro(strings) {
  const maxLength = Math.max(...strings.map((word) => word.length));

  console.log('*'.repeat(maxLength + 4));
  strings.forEach((word) => {
    const spaces = ' '.repeat(maxLength - word.length);
    console.log(`* ${word}${spaces} *`);
  });
  console.log('*'.repeat(maxLength + 4));
}

// Ejemplo de uso
const lista = ['Hello', 'World', 'in', 'a', 'frame'];
imprimirEnCuadro(lista);
// 7 - Escribir función para converter un texto en código-morse y vice-versa
// ej: toMorseCode("SOS") debería ser retornar "...---..."

// 8 - A partir de 2 Strings, escribir un programa que encuentre la sequencia comun de caracteres más grande
// ej: subsequence("Hola soy una String", "Hola soy una otra String")
// debería retornr "Hola soy una "
// ojo que la palabra "String" también es una sequencia comun, bien como "una", "soy", la letra "a"...
// pero hay que retornar la string comun más grande posible

// 9 - If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
// If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
// NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
function factorial(n) {
  if (n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
console.log('factorial: ', factorial(7));
// 10 - If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

function consonants(string) {
  const vocals = 'a' || 'e' || 'i' || 'o' || 'u';
  let vocalsQuantity = 0;
  let consonantsQuantity = 0;
  for (let i = 0; i < string.split('').length; i++) {
    if (
      string[i] == 'a' ||
      string[i] == 'e' ||
      string[i] == 'i' ||
      string[i] == 'o' ||
      string[i] == 'u'
    ) {
      vocalsQuantity++;
    }
    consonantsQuantity++;
  }
  return `Consonants: ${consonantsQuantity}, vocals: ${vocalsQuantity}`;
}

console.log('Letters: ', consonants('metamorfosis'));

function bubbleSort(array) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i] < array[j]) {
        let aux = array[i];
        array[i] = array[j];
        array[j] = aux;
      }
    }
  }
  return array;
}

console.log('bubble: ', bubbleSort([1, 5, 7, 2, 8, 3, 4, 12]));
