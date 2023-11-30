import { IonButton, 
    IonButtons, 
    IonCard, 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonImg, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonNavLink, 
    IonPage, 
    IonRow, 
    IonText, 
    IonTitle, 
    IonToolbar } from '@ionic/react';
import {Storage} from '@ionic/storage'

import './MyRecipes.css';
import { useEffect, useState } from 'react';
import { home } from 'ionicons/icons';
import { useHistory } from 'react-router';

const MyRecipes: React.FC = () => {
    const store = new Storage()
    const [savedRecipes, setSavedRecipes]= useState([])
    const history = useHistory();

    const viewRecipe = (key) => {
        history.push('/viewrecipe', {llave: key})
    };

    useEffect(() => {
        store.create()
        let aux = []
        store.forEach((value, key, index) => {
            aux.push({value, key, index})
            aux = Array.from(new Set(aux))
            setSavedRecipes(aux)
        });
    }, [])

return (
<IonPage>
    <IonToolbar>
        <IonTitle color="medium">Mis recetas guardadas</IonTitle>
            <IonButtons slot="end">
                <IonButton onClick={() => window.location.replace("/")}>
            <IonIcon icon={home} />
         </IonButton>
        </IonButtons>          
    </IonToolbar>

    <IonContent fullscreen>
     <IonGrid>  
       <IonCol>
         <IonList>
            {savedRecipes.map((element, index) => {
                return(
                    <IonItem detail={true} onClick={() => viewRecipe(element.key)}>
                        <IonLabel>
                            {element.key}
                        </IonLabel>
                    </IonItem>
                );
            })}
         </IonList>
       </IonCol>


     </IonGrid>
 </IonContent>
</IonPage>
);
};

export default MyRecipes;
