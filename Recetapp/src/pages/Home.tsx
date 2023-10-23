import { IonButton, IonCol, IonContent, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const history = useHistory();

  const goToScan = () => {
    history.push('/scan')
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recetapp</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Recetapp</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonRow>
          <IonCol style={{textAlign: "center"}}>
            <IonButton color = 'orange' style={{textAlign: "center"}} onClick={() => goToScan()} >
              Ir a escanear comida
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
