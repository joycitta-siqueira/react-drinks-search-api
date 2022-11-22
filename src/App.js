// import logo from './logo.svg'; //retirar
import "./App.css";
import axios from "axios";
import { useState } from 'react';

function App() {
  const [drinks, setDrinks] = useState([]); //cria uma variavel que vai guardar todos os drins e a funão que muda o valor dos drinks. useState é do react que faz isso. 

async function getDrinksByIngredient(ingredient) {
  if (ingredient) {
    try {
      let drinks = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient
      );
      if (drinks.data){
        setDrinks(drinks.data.drinks); 
      } else {
        setDrinks([]);
      }
    } catch (error) {
      console.error("Erro!", error.message);
      setDrinks([]);
    }
  } else {
    setDrinks([]);
  }
}
  return <div className="App">
    {/* apagar conteudo da div */}
    <label> Ingrediente: </label>
    <input type="text" 
    name="ingredient" 
    onChange={
      (event)=>getDrinksByIngredient(event.currentTarget.value)
      }></input>
      {
        drinks.map(
          (drinks) =>  //map é como se fosse um for 
            <div>
              <span> Drink: {drinks.strDrink} </span> <br/>
              {/* strDrink nome da api */}
              <img src={drinks.strDrinkThumb}></img>
            </div>
        )
      }
    </div>;
}

export default App;
