import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonProgressBar, IonTextarea, IonButton, IonAlert, IonButtons, IonIcon } from '@ionic/react';
import './SearchRecipe.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {OpenAI} from 'openai';
import { home } from 'ionicons/icons';
import { Storage } from '@ionic/storage';


const SearchRecipe: React.FC = () => {
  const [queryText, setQueryText] = useState('')
  const [recipeText, setRecipeText] = useState('')
  const [recipeFound, setRecipeFound] = useState(false)
  const history = useHistory();
  const location = useLocation();
  const store = new Storage()

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
          aux = aux + location.state.ingredients[index] + " y "
      } else {
          aux = aux + location.state.ingredients[index] + ", "
      }
    }


    let aux2 = "Dame una receta que tenga "
    for (let index = 0; index < location.state.ingredients.length; index++) {
        //Debido a que es el ultimo elemento no se le pone coma al final
        //Si es el penultimo elemento poner "y"
        if (index == (location.state.ingredients.length-1)){
            aux2 = aux2 + location.state.ingredients[index] +". Dame el Nombre, los Ingredientes y la Preparación de la receta. No digas nada antes del nombre de la receta. Pon un signo $ al final del nombre de la receta. No digas nada más."
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
          <IonTitle color="medium">Recetapp</IonTitle>
          {!recipeFound &&
          <IonProgressBar type='indeterminate' color='orange'></IonProgressBar>}

          
          <IonButtons slot="end">
            <IonButton id="pro-alert" disabled={!recipeFound} fill="solid" color='orange' >Guardar receta</IonButton>
            <IonButton routerLink='/home'>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>
          
          
        </IonToolbar>
      </IonHeader>


      <IonContent fullscreen={true} className="ion-padding">
        {recipeFound && 
        <b>
           <IonTextarea className="search-text-color" autoGrow={true} readonly={true} aria-label="Receta" value={recipeText.split("$")[0].trim()}></IonTextarea>
        </b>}
        {recipeFound && 
        <IonTextarea className="search-text-color" autoGrow={true} readonly={true} aria-label="Receta" value={recipeText.split("$")[1].trim()}></IonTextarea>}
        {!recipeFound && 
        <IonTextarea className="search-text-color" autoGrow={true} readonly={true} aria-label="Busqueda" value={queryText}></IonTextarea>}
        <IonAlert
              header="La receta se va a guardar"
              message="Da click en aceptar para que tu receta se guarde y puedas verla más tarde"
              trigger="pro-alert"
              buttons={[
              {
                text: 'Aceptar',
                role: 'confirm',
                handler: async () => {
                  await store.create()
                  await store.set(recipeText.split("$")[0].trim(), recipeText.split("$")[1].trim())
                  window.location.replace("/");
                },
              },
              ]}
            ></IonAlert> 
      </IonContent>
    </IonPage>
  );
};

export default SearchRecipe;
