import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonRow, IonCol, IonText, IonList, IonItem, IonLabel, IonButton, IonAlert, IonButtons } from '@ionic/react';
import { search } from 'ionicons/icons';
import './Ingredients.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Ingredients: React.FC = () => {
    const [detectedIngredients, setDetectedIngredients]= useState([])
    const history = useHistory();
    const location = useLocation();

    const searchRecipe = () => {
      history.push('/searchrecipe', {ingredients: detectedIngredients, takenPhoto: location.state.takenPhoto})
    };


    useEffect(() => {
        let aux = []
        location.state.ingredients.forEach(element => {
            aux.push(element.class)
        });
        aux = Array.from(new Set(aux))
        //No dejar duplicados
        setDetectedIngredients(aux)
    },[])

    const deleteIngredient = (ingrediente:string) => {
        const arr = detectedIngredients.filter(function(item) {
            return item !== ingrediente
        })

        setDetectedIngredients(arr)
    }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recetapp</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="solid" color='orange' onClick={() => searchRecipe()}>
              <IonIcon slot="end" icon={search}></IonIcon>
              Buscar receta
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <br></br>
      <IonText>Estos fueron los ingredientes encontrados en la foto. Si algún elemento de la lista es un error, puedes oprimir en el boton eliminar para quitarlo.</IonText>
      <br></br>
      <br></br>
      <IonList>
        {detectedIngredients.map((ingredient, index) => (
            <IonItem>
                <IonLabel>{ingredient}</IonLabel>
                <IonButton onClick={() => deleteIngredient(ingredient)} color='danger'>Eliminar</IonButton>
            </IonItem>
        ))}
      </IonList>
      <IonRow>
        <IonCol style={{textAlign: "center"}}>
        <IonButton id="present-alert" color='orange'>Agregar ingrediente</IonButton>
      <IonAlert
        header="Agregar ingrediente"
        trigger="present-alert"
        buttons={[
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled');
            },
          },
          {
            text: 'Agregar',
            role: 'confirm',
          },
        ]}
        inputs={[
          {
            placeholder: 'Ingrediente',
          },
        ]}
        onDidDismiss={({ detail }) => {
          if (detail.role == 'confirm' && detail.data.values[0].length > 0){
            //Bandera para ver si el elemento ya esta en el arreglo
            let flag = false;
            for (let index = 0; index < detectedIngredients.length; index++) {
              if (detectedIngredients[index] == detail.data.values[0]){
                flag = true
              }
            }
            if (flag == false){
              setDetectedIngredients([...detectedIngredients, detail.data.values[0]])
            }
          }
        }}
      ></IonAlert>
        </IonCol>
      </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Ingredients;
