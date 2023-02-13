// const h1 = document.querySelector('h1');
// const input = document.querySelector('input');

// console.log(input.value);

// /* innerHTML nos permite escribir código HTML directamente
// de la etiqueta que hayas seleccionado. */

// h1.innerHTML = `Ups <br> It's not here`;

// // innerText convierta todo el código a texto, nos protege.

// // h1.innerText = `Ups <br> It's not here`;

// // getAttribute nos ayuda a leer atributos.

// h1.getAttribute()

// // setAttribute modifica el valor de un atributo.

// h1.setAttribute("class", "rojo");

// // classList es una forma más eficience de hacer cosas con las clases.

// h1.classList.add("rojo");

// /* document.createElement nos ayuda a crear el elemento HTML
// que nosotros necesitemos. */

function eventOnClick() {
    console.log(input.value);
};

let input = document.querySelector("#destino");
let botonBuscar = document.querySelector("#buscar");

botonBuscar.addEventListener("click", eventOnClick);