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
         IonText, 
         IonTitle, 
         IonToolbar } from '@ionic/react';



import './Home.css';

const Home: React.FC = () => {

  

  return (
    <IonPage className='home-page'>
      <IonContent fullscreen>
          <IonGrid>  
            <IonRow>
              <IonCol className='home-img'>
                <IonImg src="LogoRecetapp.png" className='home-logo'></IonImg>
              </IonCol>
            </IonRow>

            <IonCol className='home-parrafo'>
              <b>
              <IonText color='medium'>Recetapp</IonText>
              </b>     
            </IonCol>

            <IonCol className='home-parrafo2'>
              <IonText color='medium'>¡Escanea y cocina!</IonText>     
            </IonCol>

            
            <IonCol className='home-parrafo3'>
              <IonText color='medium'>Recetapp es una aplicación innovadora, creada para los curiosos y para los cocineros.</IonText> 
            </IonCol>


            <IonCol className='home-col-btns'>
              <IonButton 
                  className='ion-text-wrap'
                  color='orange' 
                  href='/scan' 
                  >
                Crear una nueva receta
              </IonButton>
            </IonCol>


            <IonCol className='home-col-btns'>
              <IonButton
                color='orange'
                href='/myrecipes' >
                Ver mis recetas
              </IonButton>
            </IonCol>

          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
