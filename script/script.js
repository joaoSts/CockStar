const btnMobile = document.getElementById("btn-mobile");
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
btnMobile.addEventListener("click", toggleMenu);
btnMobile.addEventListener("touchstart", toggleMenu);

function carregar() {
  const url = (id) =>
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${i}`;
  const bebida = [];
  for (var i = 11000; i <= 11014; i++) {
    bebida.push(fetch(url(i)).then((res) => res.json()));
  }
  Promise.all(bebida).then((data) => {
    const lista = data.reduce((acumulador, data) => {
      acumulador += `<li class="list"><img src="${data.drinks[0].strDrinkThumb}"><h2>${data.drinks[0].strDrink}</h2><h3>Categoria:</h3><p>${data.drinks[0].strCategory}-${data.drinks[0].strAlcoholic}</p> <button>ver ingredientes</button></li>`;
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
      acumulador += `<li class="lista-ingre"><img src="http://www.thecocktaildb.com/images/ingredients/ice-medium.png"><h2>${data.ingredients[0].strIngredient}</h2><h3>Descrição:</h3><p>${data.ingredients[0].strDescription}</p>button>ver ingredientes</button></li>`;
      return acumulador;
    }, "");
    const ul = document.querySelector(".lista-ingre");
    ul.innerHTML = lista;
  });
}

document.getElementById("btn").addEventListener("click", Search);

function Search() {
  const search = document.getElementById("search").value;
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;

  const b = [];
  b.push(fetch(url).then((res) => res.json()));
  Promise.all(b).then((data) => {
    const lista = data.reduce((acumulador, data) => {
      for (let i = 0; i < data.drinks.length; i++) {
        acumulador += `<li class=".lista"><img src="${data.drinks[i].strDrinkThumb}"><h2>${data.drinks[i].strDrink}</h2><h3>Categoria:</h3><p>${data.drinks[i].strCategory}-${data.drinks[i].strAlcoholic}</p> <button>ver ingredientes</button></li>`;
      }
      return acumulador;
    }, "");
    let container = document.querySelector(".container");
    container.style.display = "none";
    const ul = document.querySelector(".lista-search");
    ul.innerHTML = lista;
  });
}

/*function Search(){
const url=`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`
const S=[]
fetch(url).then(res=>res.json())

.then(data=>{
  for(let i=0; i<data.drinks.length; i++){
   S.push(data.drinks[i].strDrink)
      console.log(data.drinks[i].strDrink);
      let SearchCont=document.querySelector(".container")
    }})
    const a=S.reduce((acu)=>{
           acu+=`${data.drinks[i].strDrink}`
           return acu
  })
  console.log(a);
}*/

carregar();
ingredientes2();
