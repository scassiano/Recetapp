import { IonAlert, IonButton, 
    IonButtons, 
    IonCard, 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonImg, 
    IonNavLink, 
    IonPage, 
    IonRow, 
    IonText, 
    IonTextarea, 
    IonTitle, 
    IonToolbar } from '@ionic/react';

import './ViewRecipe.css';
import { useLocation } from 'react-router';
import { useEffect, useState } from 'react';
import {Storage} from '@ionic/storage'
import { home, trash } from 'ionicons/icons';

const ViewRecipe: React.FC = () => {
    const location = useLocation();
    const [recipeTitle, setRecipeTitle] = useState("")
    const [recipeContent, setRecipeContent] = useState("")
    const store = new Storage()

    async function getContent() {
        await store.create()
        setRecipeTitle(location.state.llave)
        const contenido = await store.get(location.state.llave)
        setRecipeContent(contenido)
        console.log()
    }


    useEffect(() => {
        getContent()
    },[])


return (
<IonPage className='home-page'>
    <IonHeader>
        <IonToolbar>
            <b>
          <IonTitle color="medium">{recipeTitle}</IonTitle>
          </b>
          <IonButtons slot="end">
            <IonButton id="del-alert" fill="outline" color='danger'>
              <IonIcon icon={trash}></IonIcon>
            </IonButton>
          </IonButtons>
          <IonButtons slot="start">
            <IonButton routerLink='/home'>
              <IonIcon icon={home} />
            </IonButton>
          </IonButtons>

        </IonToolbar>
    </IonHeader>
 <IonContent fullscreen>
     <IonGrid>  
               
       <IonCol className='home-parrafo3'>
        <IonTextarea className="view-text-color" autoGrow={true} readonly={true} aria-label="Receta" value={recipeContent}></IonTextarea>
       </IonCol>

       <IonAlert
              header="La receta se va a eliminar"
              message="¿Estas seguro de que quieres eliminarla?"
              trigger="del-alert"
              buttons={[
            {
                text: 'Cancelar',
                role: 'cancel'
            }
            ,
              {
                text: 'Aceptar',
                role: 'confirm',
                handler: async () => {
                    await store.create()
                    await store.remove(location.state.llave)
                    window.location.replace("/");
                },
              },
              ]}
            ></IonAlert> 

     </IonGrid>
 </IonContent>
</IonPage>
);
};

export default ViewRecipe;
