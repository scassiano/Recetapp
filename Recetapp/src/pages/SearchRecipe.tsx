import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import './SearchRecipe.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SearchRecipe: React.FC = () => {
  const [queryText, setQueryText] = useState("Dame una receta que tenga ")
  const history = useHistory();
  const location = useLocation();


  useEffect(()=>{
    let aux = queryText
    for (let index = 0; index < location.state.ingredients.length; index++) {
        //Debido a que es el ultimo elemento no se le pone coma al final
        //Si es el penultimo elemento poner "y"
        if (index == (location.state.ingredients.length-1)){
            aux = aux + location.state.ingredients[index] +"."
        } else if (index == (location.state.ingredients.length-2)){
            aux = aux + location.state.ingredients[index] + " y "
        } else {
            aux = aux + location.state.ingredients[index] + ", "
        }
    }

    setQueryText(aux)
  },[])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recetapp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText>{queryText}</IonText>
      </IonContent>
    </IonPage>
  );
};

export default SearchRecipe;
