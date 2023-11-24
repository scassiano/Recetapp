import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonRow, IonCol, IonText, IonList, IonItem, IonLabel, IonButton, IonAlert, IonButtons } from '@ionic/react';
import {  home, handRight, search } from 'ionicons/icons';
import './Ingredients.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';


const Ingredients: React.FC = () => {
    //Creamos un diccionario que permite traducir los elementos detectados de ingles a espanol
    const diccionario = {banana:"Banano", apple:"Manzana", orange:"Naranja",broccoli:"Brócoli", carrot:"Zanahoria"}
    const palabrasValidas = ["banana","apple","orange","broccoli","carrot"]
    const [detectedIngredients, setDetectedIngredients]= useState([])
    const history = useHistory();
    const location = useLocation();

    const searchRecipe = () => {
      history.push('/searchrecipe', {ingredients: detectedIngredients, takenPhoto: location.state.takenPhoto})
    };


    useEffect(() => {
        let aux = []
        location.state.ingredients.forEach(element => {
          if (palabrasValidas.includes(element.class)){
            aux.push(diccionario[element.class])
          }
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
            <IonButton routerLink='/home'>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
      <br></br>
      <IonCol className='ingredientes-text'>
        <p style={{margin: '2em'}}>Estos fueron los ingredientes encontrados en la foto. Si algún ingrediente en la lista es un error, puede eliminarse con el boton "Eliminar".</p>
        <p style={{margin: '2em'}}>Si algun ingrediente no fue detectado, puedes agregarlo presionando el boton "Agregar ingrediente".</p>
      </IonCol>
      <br></br>
      <br></br>
      <IonCol className='ingredients-container'>   
        <IonList>
          {detectedIngredients.map((ingredient, index) => (
              <IonItem className='ingredientes-items'>
                  <IonLabel>{ingredient}</IonLabel>
                  <IonButton onClick={() => deleteIngredient(ingredient)} color='danger'>Excluir</IonButton>
              </IonItem>
          ))}
        </IonList>
      </IonCol>
      <IonRow>
        <IonCol style={{textAlign: "center"}}>
        <IonButton id="present-alert" color='orange'>Agregar ingrediente</IonButton>
      <IonAlert
        header="Adicionar ingrediente"
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
            text: 'Adicionar',
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
