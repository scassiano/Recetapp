import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar, IonCol } from '@ionic/react';
import './Processing.css';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs'
import * as cocossd from "@tensorflow-models/coco-ssd";
import '@tensorflow/tfjs-backend-cpu';
import '@tensorflow/tfjs-backend-webgl';


const Processing: React.FC = () => {
    const history = useHistory();
    const location = useLocation();

    const runCoco = async () => {
        const net = await cocossd.load()
        const imageForModel = new Image()
        imageForModel.src = location.state.takenPhoto.webPath
        const obj = await net.detect(imageForModel)
        history.push('/ingredients', {ingredients: obj, takenPhoto: location.state.takenPhoto.webPath})
    }


    useEffect(()=>{runCoco()},[]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recetapp</IonTitle>
          <IonProgressBar type='indeterminate' color='orange'></IonProgressBar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <img src={location.state.takenPhoto.webPath}/>
        <IonCol>
          <p style={{margin: '2em'}}>Estamos detectando los ingredientes en la imagen, espera un momento...</p>
        </IonCol>
      </IonContent>
      
    </IonPage>
  );
};

export default Processing;
