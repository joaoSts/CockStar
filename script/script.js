const btnMobile = document.getElementById("btn-mobile");
btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);
document.getElementById("btn").addEventListener("click", Search);

function toggleMenu(event) {
  if (event.type === "touchstart") event.preventDefault();
  const nav = document.getElementById("nav");
  nav.classList.toggle("active");
  const active = nav.classList.contains("active");
  event.currentTarget.setAttribute("aria-expanded", active);
  if (active) {
    event.currentTarget.setAttribute("aria-label", "Fechar Menu");
  } else {
    event.currentTarget.setAttribute("aria-label", "Abrir Menu");
  }
}
function carregar() {
  const url = (id) =>
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${i}`;
  const bebida = [];
  for (var i = 11000; i <= 11014; i++) {
    bebida.push(fetch(url(i)).then((res) => res.json()));
  }
  Promise.all(bebida).then((data) => {
    const lista = data.reduce((acumulador, data) => {
      acumulador += `<li class="list" id="${data.drinks[0].idDrink}""><img src="${data.drinks[0].strDrinkThumb}"><h2>${data.drinks[0].strDrink}</h2><h3>Categoria:</h3><p>${data.drinks[0].strCategory}-${data.drinks[0].strAlcoholic}</p><button onclick="modal(${data.drinks[0].idDrink})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Ver Detalhes</button>
       <span style="display:none" id="meu-${data.drinks[0].idDrink}">${data.drinks[0].idDrink}</span></li>`;
      return acumulador;
    }, "");
    const ul = document.querySelector(".lista");
    ul.innerHTML = lista;

  });
}
function ingredientes2() {
  const url = (id) =>
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=${i}`;
  const ingrediente = [];
  for (var i = 552; i <= 555; i++) {
    ingrediente.push(fetch(url(i)).then((res) => res.json()));
  }
  Promise.all(ingrediente).then((data) => {
    const lista = data.reduce((acumulador, data) => {
      acumulador += `<li class="lista-ingre"><img src="http://www.thecocktaildb.com/images/ingredients/ice-medium.png"><h2>${data.ingredients[0].strIngredient}</h2><h3>Descrição:</h3><p>${data.ingredients[0].strDescription}</p>button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">ver ingredientes</button></li>`;
      return acumulador;
    }, "");
    const ul = document.querySelector(".lista-ingre");
    ul.innerHTML = lista;
  });
}


function Search() {
  const search = document.getElementById("search").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

  const b = [];
  b.push(fetch(url).then((res) => res.json()));
  Promise.all(b).then((data) => {
    const lista = data.reduce((acumulador, data) => {
      for (let i = 0; i < data.drinks.length; i++) {
        acumulador += `<li class=".lista"><img src="${data.drinks[i].strDrinkThumb}"><h2 id="nome">${data.drinks[i].strDrink}</h2><h3>Categoria:</h3><p>${data.drinks[i].strCategory}-${data.drinks[i].strAlcoholic}</p> <button  onclick="modal(${data.drinks[i].idDrink})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">Ver Detalhes</button>
        <span style="display:none" id="meu-${data.drinks[i].idDrink}">${data.drinks[i].idDrink}</span></li>`;
      }
      return acumulador;
    }, "");
    let container = document.querySelector(".container");
    container.style.display = "none";
    const ul = document.querySelector(".lista-search");
    ul.innerHTML = lista;
  });
}




function modal(valorc) {
  const valor = document.getElementById(`meu-${valorc}`).textContent


  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${valor}`)
    .then(response => {
      return response.json();
    }).then(data => {


      document.querySelector('.modal-title').innerHTML = data.drinks[0].strDrink
      document.querySelector('.modal-body').innerHTML = `<div class="div-ingre">
  <img src="${data.drinks[0].strDrinkThumb}">
  <p>${data.drinks[0].strInstructions}</p>
  <h2 id="h2-ingre">Ingredientes</h2>
  <ul id="lista-ingre"></ul>
  </div>`

      detalhes(valor)
    })

}

function detalhes(valor) {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${valor}`)
    .then(response => {
      return response.json()
    })
    .then(data => {

      const acumuladorIngre = [
        {
          '0': data.drinks[0].strIngredient1
        },
        {
          '1': data.drinks[0].strIngredient2
        },
        {
          '2': data.drinks[0].strIngredient3
        },
        {
          '3': data.drinks[0].strIngredient4
        },
        {
          '4': data.drinks[0].strIngredient5
        },
        {
          '5': data.drinks[0].strIngredient6
        },
        {
          '6': data.drinks[0].strIngredient7
        },
        {
          '': data.drinks[0].strIngredient8
        },
        {
          '8': data.drinks[0].strIngredient9
        },
        {
          '9': data.drinks[0].strIngredient10
        }
      ]
      //pegar os objetos n vazios

      var objetosNaoVazios = acumuladorIngre.filter(objeto => {
        return Object.values(objeto).some(valor => {
          return valor !== null && valor !== undefined && valor !== '';
        });
      });
      var listingre = ''
      var li = ''
      var img;
      const tamanho = objetosNaoVazios.length;
      console.log(objetosNaoVazios)
      for (var i = 0; i < tamanho; i++) {

        img = `https://www.thecocktaildb.com/images/ingredients/${objetosNaoVazios[i][i]}-Small.png`
        listingre += '|' + objetosNaoVazios[i][i]
        li += `<li><img src="${img}"> ${objetosNaoVazios[i][i]}</li> `

      }
      console.log(listingre)
      const ul = document.getElementById("lista-ingre");
      ul.innerHTML = li


    })
}
carregar();
ingredientes2();
