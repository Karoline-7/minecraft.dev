// datos de los mobs
const mobs = [
  {
    icono: "🟩",
    nombre: "Creeper",
    desc: "Explota al acercarse y puede destruir construcciones.",
    hp: 20,
    bioma: "Overworld"
  },
  {
    icono: "🧟",
    nombre: "Zombie",
    desc: "Aparece de noche y ataca al jugador cuerpo a cuerpo.",
    hp: 20,
    bioma: "Overworld"
  },
  {
    icono: "💀",
    nombre: "Esqueleto",
    desc: "Ataca desde lejos usando un arco y flechas.",
    hp: 20,
    bioma: "Cuevas"
  },
  {
    icono: "🐷",
    nombre: "Piglin",
    desc: "Vive en el Nether y está relacionado con el oro.",
    hp: 16,
    bioma: "Nether"
  },
  {
    icono: "🟪",
    nombre: "Enderman",
    desc: "Puede teletransportarse y se enfada si lo miras directamente.",
    hp: 40,
    bioma: "The End"
  },
  {
    icono: "🧑‍🌾",
    nombre: "Aldeano",
    desc: "Vive en aldeas y puede intercambiar objetos.",
    hp: 20,
    bioma: "Aldeas"
  },
  {
    icono: "🐉",
    nombre: "Ender Dragon",
    desc: "Es el jefe principal de The End.",
    hp: 200,
    bioma: "The End"
  },
  {
    icono: "🐺",
    nombre: "Lobo",
    desc: "Puede domesticarse con huesos y convertirse en compañero.",
    hp: 8,
    bioma: "Bosques"
  }
];


// crea una tarjeta para cada mob
function crearTarjetaMob(mob, indice) {

  return `
    <div class="mc-card mob-card" data-mob="${indice}">

      <div class="mob-top">
        <div class="block-icon">${mob.icono}</div>

        <h3>${mob.nombre}</h3>
      </div>

      <p>${mob.desc}</p>

      <div class="mob-stats">

        <span class="hp">
          ❤️ ${mob.hp} HP
        </span>

        <span class="biome">
          ${mob.bioma}
        </span>

      </div>

    </div>
  `;
}


// muestra los mobs
function renderMobs(lista = mobs) {

  const contenedor =
    document.getElementById("mobsRow");

  if (!contenedor) {
    return;
  }

  let html = "";

  // recorremos la lista de mobs
  for (let i = 0; i < lista.length; i++) {

    // buscamos la posición original del mob
    const indiceOriginal =
      mobs.indexOf(lista[i]);

    html +=
      crearTarjetaMob(lista[i], indiceOriginal);
  }

  contenedor.innerHTML = html;

  activarMobs();
}


// activa el clic de cada tarjeta
function activarMobs() {

  const tarjetas =
    document.querySelectorAll(".mob-card");

  tarjetas.forEach(function(tarjeta) {

    tarjeta.addEventListener("click", function() {

      // obtenemos el índice original
      const indice =
        Number(tarjeta.getAttribute("data-mob"));

      // buscamos el mob
      const mob =
        mobs[indice];

      mostrarInformacionMob(mob);

    });

  });
}


// muestra la información del mob seleccionado
function mostrarInformacionMob(mob) {

  const contenedor =
    document.getElementById("mobsRow");

  if (!contenedor) {
    return;
  }

  contenedor.innerHTML = `

    <div class="mc-card mob-card mob-seleccionado">

      <div class="mob-top">

        <div class="block-icon">
          ${mob.icono}
        </div>

        <h3>
          ${mob.nombre}
        </h3>

      </div>

      <p>
        ${mob.desc}
      </p>

      <div class="mob-stats">

        <span class="hp">
          ❤️ ${mob.hp} HP
        </span>

        <span class="biome">
          ${mob.bioma}
        </span>

      </div>

      <button
        class="volver-mobs"
        id="volverMobs">

        ← Ver todos los mobs

      </button>

    </div>
  `;


  // botón para volver a la lista
  const botonVolver =
    document.getElementById("volverMobs");

  if (botonVolver) {

    botonVolver.addEventListener("click", function(event) {

      // evita que el clic vuelva a seleccionar la tarjeta
      event.stopPropagation();

      renderMobs();

    });

  }

}


// mostrar todos los mobs al comenzar
renderMobs();


// ----------------------------------
// FILTRO DE MOBS
// ----------------------------------

const filtroBioma =
  document.getElementById("filtroBioma");


if (filtroBioma) {

  filtroBioma.addEventListener("change", function() {

    const filtro =
      filtroBioma.value;


    // si seleccionamos todos
    if (filtro === "todos") {

      renderMobs();

      return;
    }


    // filtramos los mobs
    const mobsFiltrados =
      mobs.filter(function(mob) {

        return mob.bioma === filtro;

      });


    // mostramos solamente los que coinciden
    renderMobs(mobsFiltrados);

  });

}


// ----------------------------------
// MOB ALEATORIO
// ----------------------------------

const botonAleatorio =
  document.getElementById("mobAleatorio");


if (botonAleatorio) {

  botonAleatorio.addEventListener("click", function() {

    // número aleatorio
    const numero =
      Math.floor(Math.random() * mobs.length);

    // seleccionamos el mob
    const mob =
      mobs[numero];

    // mostramos el resultado
    mostrarMobAleatorio(mob);

  });

}


// muestra el mob aleatorio
function mostrarMobAleatorio(mob) {

  const resultado =
    document.getElementById("resultadoAleatorio");

  if (!resultado) {
    return;
  }

  resultado.innerHTML = `

    <div class="random-mob">

      <span class="random-icon">
        ${mob.icono}
      </span>

      <div>

        <strong>
          ${mob.nombre}
        </strong>

        <p>
          ${mob.desc}
        </p>

        <small>
          ❤️ ${mob.hp} HP · 🌎 ${mob.bioma}
        </small>

      </div>

    </div>

  `;

}


// ----------------------------------
// CALCULADORA DE DIAMANTES
// ----------------------------------

const DIAMANTES_POR_PICO = 3;


function calcularPicos(totalDiamantes) {

  const picos =
    Math.floor(
      totalDiamantes / DIAMANTES_POR_PICO
    );

  const sobrantes =
    totalDiamantes % DIAMANTES_POR_PICO;


  return `
    Con ${totalDiamantes} diamantes puedes fabricar
    ${picos} pico(s) de diamante
    y sobran ${sobrantes}.
  `;
}


const cardDiamante =
  document.getElementById("cardDiamante");


const textoDiamante =
  document.getElementById("textoDiamante");


const cantidadDiamantes =
  document.getElementById("cantidadDiamantes");


const calcularDiamantes =
  document.getElementById("calcularDiamantes");


if (
  calcularDiamantes &&
  cantidadDiamantes &&
  textoDiamante
) {

  calcularDiamantes.addEventListener("click", function(event) {

    // evita que se active el clic de la tarjeta
    event.stopPropagation();


    const cantidad =
      Number(cantidadDiamantes.value);


    if (cantidad < 0 || cantidadDiamantes.value === "") {

      textoDiamante.textContent =
        "Escribe una cantidad válida de diamantes.";

      return;
    }


    textoDiamante.textContent =
      calcularPicos(cantidad);

  });

}


// ----------------------------------
// SERVIDOR
// ----------------------------------


// conexión simulada con un servidor
function conectarServidor() {

  return new Promise(function(resolve) {

    const demora =
      1200 + Math.random() * 1200;


    setTimeout(function() {

      const jugadores =
        Math.floor(Math.random() * 40) + 1;


      resolve(jugadores);

    }, demora);

  });

}


// muestra el estado del servidor
async function mostrarEstadoServidor() {

  const elemento =
    document.getElementById("estadoServidor");


  if (!elemento) {
    return;
  }


  const jugadores =
    await conectarServidor();


  elemento.textContent =
    `🟢 Servidor en línea — ${jugadores} jugadores conectados`;

}


mostrarEstadoServidor();


// ----------------------------------
// BOTÓN VOLVER ARRIBA
// ----------------------------------


// crea el botón
function crearBotonInicio() {

  const boton =
    document.createElement("button");


  boton.textContent = "⬆";

  boton.id = "btnInicio";

  boton.title = "Volver arriba";


  document.body.appendChild(boton);


  boton.addEventListener("click", function() {

    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  });

}


crearBotonInicio();


// muestra u oculta el botón
window.addEventListener("scroll", function() {

  const boton =
    document.getElementById("btnInicio");


  if (!boton) {
    return;
  }


  if (window.scrollY > 500) {

    boton.classList.add("mostrar");

  } else {

    boton.classList.remove("mostrar");

  }

});


// ----------------------------------
// INFORMACIÓN PARA PRINCIPIANTES
// ----------------------------------


// conceptos básicos
const conceptos = [

  {
    titulo: "¿Qué es Minecraft?",

    texto:
      "Es un juego donde puedes explorar, conseguir materiales, construir estructuras y sobrevivir."
  },

  {
    titulo: "¿Qué hago primero?",

    texto:
      "Lo primero es conseguir madera. Con ella puedes fabricar herramientas y una mesa de crafteo."
  },

  {
    titulo: "¿Qué es un bloque?",

    texto:
      "Casi todo el mundo está formado por bloques. Puedes romperlos, recoger algunos y colocarlos en otros lugares."
  },

  {
    titulo: "¿Qué es un mob?",

    texto:
      "Son las criaturas que aparecen en el juego. Algunos son tranquilos y otros pueden atacarte."
  }

];


// crea las tarjetas para principiantes
function mostrarConceptos() {

  const contenedor =
    document.getElementById("conceptosPrincipiante");


  if (!contenedor) {
    return;
  }


  let html = "";


  for (let i = 0; i < conceptos.length; i++) {

    html += `

      <div class="mc-card beginner-card">

        <h3>
          ${conceptos[i].titulo}
        </h3>

        <p>
          ${conceptos[i].texto}
        </p>

      </div>

    `;

  }


  contenedor.innerHTML = html;

}


mostrarConceptos();


// contador de conceptos vistos
let conceptosVistos = 0;


const tarjetasPrincipiante =
  document.querySelectorAll(".beginner-card");


tarjetasPrincipiante.forEach(function(tarjeta) {

  tarjeta.addEventListener("click", function() {

    if (
      !tarjeta.classList.contains("vista")
    ) {

      tarjeta.classList.add("vista");


      conceptosVistos++;


      console.log(
        `Conceptos vistos: ${conceptosVistos}`
      );

    }

  });

});


// ----------------------------------
// DIMENSIONES
// ----------------------------------


const tarjetasDimensiones =
  document.querySelectorAll(".dim-card");


tarjetasDimensiones.forEach(function(tarjeta) {

  tarjeta.addEventListener("click", function() {

    const nombre =
      tarjeta.querySelector("h3").textContent;


    alert(
      `Has seleccionado: ${nombre}`
    );

  });

});


// ----------------------------------
// CARGA DE LA PÁGINA
// ----------------------------------


window.addEventListener("load", function() {

  console.log(
    "Guía de Minecraft cargada correctamente."
  );

});

