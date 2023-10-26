import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonButton } from '@ionic/react';
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
      <IonContent fullscreen>
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
