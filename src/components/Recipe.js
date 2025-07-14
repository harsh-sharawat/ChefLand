import { useState } from "react"
import { HfInference } from '@huggingface/inference'
import ReactMarkdown from 'react-markdown'

const SYSTEM_PROMPT = `You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page`

export default function Recipe(props){
    const [ans , setRecipe] = useState("")

    const hf = new HfInference(process.env.REACT_APP_ACCESS_TOKEN)

    async function getRecipeFromMistral(ingredientsArr) {
        const ingredientsString = ingredientsArr.join(", ")
        try {
            const response = await hf.chatCompletion({
                model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
                ],
                max_tokens: 1024,
            })
            return response.choices[0].message.content
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function GenerateRecipe(){
        let recipe = "";
        
            
        try{
            recipe =  await getRecipeFromMistral(props.Ingredients )

        }catch (err){
            alert("something went wrong!")

        }
        
        
        if(recipe === "") return ;
        
        setRecipe(oldvalue => oldvalue = recipe);
        return;

    }
    return (
        <>
            <div className = "recipe-generator">
                <div>
                    <h3>Ready for the recipe?</h3>
                    <p>generate a recipe from available ingredients here</p>
                </div>
                <button
                    onClick = {GenerateRecipe}
                >Generate</button>

            </div>

            {ans !== "" && 
            <div className ="display-recipe">
                <h2>Chef Recommends:</h2>
                <ReactMarkdown>{ans}</ReactMarkdown>

            </div>
            }
        </>
    )
}