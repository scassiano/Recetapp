import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonProgressBar, IonTextarea } from '@ionic/react';
import './SearchRecipe.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {OpenAI} from 'openai';


const SearchRecipe: React.FC = () => {
  const [queryText, setQueryText] = useState('')
  const [recipeText, setRecipeText] = useState('')
  const [recipeFound, setRecipeFound] = useState(false)
  const history = useHistory();
  const location = useLocation();

  const openai = new OpenAI(
    {apiKey: '',
     dangerouslyAllowBrowser:true}
  );

  const search = async (text: any) => {
    const completion = await openai.chat.completions.create({
      messages: [{role: "system", content:text}],
      model: "gpt-3.5-turbo",
    })

    setQueryText(text)
    console.log(completion)
    if (completion.choices[0].finish_reason == "stop"){
      setRecipeFound(true)
      setRecipeText(completion.choices[0].message.content)
    }
  }

  useEffect(()=>{

    let aux = "Estamos creando una receta con "
    for (let index = 0; index < location.state.ingredients.length; index++) {
      //Debido a que es el ultimo elemento no se le pone coma al final
      //Si es el penultimo elemento poner "y"
      if (index == (location.state.ingredients.length-1)){
          aux = aux + location.state.ingredients[index] +".\n\nEspera un momento, este proceso puede demorar alrededor de un minuto..."
      } else if (index == (location.state.ingredients.length-2)){
          aux = aux + location.state.ingredients[index] + " e "
      } else {
          aux = aux + location.state.ingredients[index] + ", "
      }
    }


    let aux2 = "Dame una receta que tenga "
    for (let index = 0; index < location.state.ingredients.length; index++) {
        //Debido a que es el ultimo elemento no se le pone coma al final
        //Si es el penultimo elemento poner "y"
        if (index == (location.state.ingredients.length-1)){
            aux2 = aux2 + location.state.ingredients[index] +". Dame el nombre, los Ingredientes y la Preparación de la receta, no digas nada más."
        } else if (index == (location.state.ingredients.length-2)){
            aux2 = aux2 + location.state.ingredients[index] + " y "
        } else {
            aux2 = aux2 + location.state.ingredients[index] + ", "
        }
    }

    setQueryText(aux)
    search(aux2)
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recetapp</IonTitle>
          {!recipeFound &&
          <IonProgressBar type='indeterminate' color='orange'></IonProgressBar>}
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        {recipeFound && 
        <IonTextarea autoGrow={true} readonly={true} aria-label="Receta" value={recipeText}></IonTextarea>}
        {!recipeFound && 
        <IonTextarea autoGrow={true} readonly={true} aria-label="Busqueda" value={queryText}></IonTextarea>}
      </IonContent>
    </IonPage>
  );
};

export default SearchRecipe;
