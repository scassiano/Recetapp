import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonButton, IonTextarea, IonText } from '@ionic/react';
import { camera, arrowBack } from 'ionicons/icons';
import './Scan.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { useHistory } from 'react-router-dom';

const Scan: React.FC = () => {
  const history = useHistory();
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    history.push('/processing', {takenPhoto: photo})
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton color='orange' routerLink='/Home' routerDirection='back'>
            <IonIcon icon={arrowBack}/>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen={true} className='ion-padding'>
         <b>
          <IonText className='scan-title' color="medium">Crear una nueva receta
          </IonText>
        </b>

        <IonTextarea autoGrow={true} readonly={true} aria-label="Instrucciones">
          <IonText className='scan-instructions' color="medium">Oprime el boton en la parte inferior de la pantalla para tomar una fotografia de los ingredientes que quieres utilizar en tu receta.
          </IonText>
        </IonTextarea>

          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <IonFabButton color="orange" onClick={() => takePhoto()}>
              <IonIcon icon={camera}></IonIcon>
            </IonFabButton>
          </IonFab>

        </IonContent>
    </IonPage>
  );
};

export default Scan;
