import { IonButton, 
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
         IonTitle, 
         IonToolbar } from '@ionic/react';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


import './Home.css';

const Home: React.FC = () => {

  const { loginWithRedirect } = useAuth0();
  const login = async () => {
    await loginWithRedirect({
      async openUrl(url) {
         // Redirect using Capacitor's Browser plugin
        await Browser.open({
          url,
          windowName: "_self"
        });
      }
    });
  };

  const { handleRedirectCallback } = useAuth0();
  useEffect(() => {
    // Handle the 'appUrlOpen' event and call `handleRedirectCallback`
    CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
        await handleRedirectCallback(url);
      }
      // No-op on Android
      await Browser.close();
    });
  }, [handleRedirectCallback]);

  return (
    <IonPage className='home-page'>
      <IonContent fullscreen>
        <IonRow>
          <IonGrid>
            <IonCol>
              <IonCard color='orange'> 
                <IonTitle className='home-title'>Bienvenid@ a Recetapp</IonTitle>
              </IonCard>       
            </IonCol>
            <IonCol className='home-img'>
              <IonCard className='home-card'>
                <IonImg src='https://www.clara.es/medio/2023/08/09/crema-de-calabacin-portada_c555f0e9_230809160701_1280x1109.jpg'></IonImg>
              </IonCard>
            </IonCol>
            <IonCol>
              <p className='home-parrafo'>Una aplicación innovadora, creada para los curiosos y para los cocineros.</p>
            </IonCol>
            <IonCol className='home-col-btns'>
              <IonButton
                className='home-btn' 
                shape='round' 
                color='orange' 
                onClick={login}>
                Hacer login
              </IonButton>
              <IonButton 
                  className='ion-text-wrap'
                  color='orange' 
                  shape='round' 
                  routerLink='/Scan' 
                  routerDirection='root' 
                  >
                Escanear ingredientes
              </IonButton>
            </IonCol>
          </IonGrid>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Home;
