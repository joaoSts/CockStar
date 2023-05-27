var valor = window.location.href;

console.log('t')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${valor.includes("drink")}`)
    .then(response=>{
      return response.json()})
    .then(data=>{
      console.log(data.drinks[0])
     
      let contador=10 ;
      var strIngredient=0
      const acumuladorIngreFinal=[]
      const acumuladorIngre = [
        {
          'strIngredient1':data.drinks[0].strIngredient1
        },
        {
          'strIngredient2':data.drinks[0].strIngredient2
        },
        {
          'strIngredient3':data.drinks[0].strIngredient3
        },
        {
          'strIngredient4':data.drinks[0].strIngredient4
        },
        {
          'strIngredient5':data.drinks[0].strIngredient5
        },
        {
          'strIngredient6':data.drinks[0].strIngredient6
        },
        {
          'strIngredient7':data.drinks[0].strIngredient7
        },
        {
          'strIngredient8':data.drinks[0].strIngredient8
        },
        {
          'strIngredient9':data.drinks[0].strIngredient9
        },
        {
          'strIngredient10':data.drinks[0].strIngredient10
        }
      ]
   //pegar os objetos n vazios
      objetosNaoVazios = acumuladorIngre.filter(objeto => {
        return Object.values(objeto).some(valor => {
          return valor !== null && valor !== undefined && valor !== '';
        });
      });
      console.log(objetosNaoVazios)
     
  
    
      
    })
  