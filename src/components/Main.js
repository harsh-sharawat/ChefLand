import { useState } from "react";
import Recipe from "./Recipe";
import IngredientsList from "./IngredientsList";
import Reset from "./Reset";


export default function Main(){

    const [Ingredients , addingredients] = useState([])

    function reset(){
        addingredients(oldarray => []);
        return;
    }
    
    function removeElement(element){
        addingredients(oldarray=>
        {
            return oldarray.filter((val)=>val!==element);
        }
        )
    }

    function addToList(form){
      
        
        const new_ingredient = form.get("ingredient").trim().toLowerCase();
        if(new_ingredient === "") return;
        console.log(new_ingredient);
        
        addingredients(oldarray =>{
            if(oldarray.includes(new_ingredient)) return oldarray;
            return [...oldarray , new_ingredient]});
        
    }

    return (

        <main className="main">
            <form action = {addToList} className = "add-ingredient">
                <input 
                    type = 'text'
                    placeholder = 'e.g. oregano'
                    aria-label = 'Add Ingredients'
                    name = "ingredient"
                />

                <button>Add Ingredients</button>

            </form>
            {Ingredients.length  > 0 && 
            <section className = "main-section">
                <div className = "ingredientList">
                    <IngredientsList Ingredients = {Ingredients} removeElement = {removeElement} />


                    <Reset clickHandler = {reset}/>
                </div>

                {Ingredients.length>=3 && 
                    <Recipe Ingredients = {Ingredients}/>
                }


            </section>}


        </main>

    );
}

