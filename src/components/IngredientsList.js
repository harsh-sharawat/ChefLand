import remove from "../images/remove.png";
export default function IngredientsList(props){

    const elements = props.Ingredients.map((element,index) => {

                        return ( 
                            <div className = "each-element">
                                <li key = {index}>{element}</li>
                                <button
                                onClick = {() => props.removeElement(element)}
                                >   <img src = {remove} alt = "Click me" />
                                </button>
                            </div>
                        );
                      });

    
    return (
        <div >
            <h2>Ingredients in hand:</h2>
            <ul className = "elements">
                {elements}

            </ul>
        </div>

    );
}