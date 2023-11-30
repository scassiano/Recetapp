import { Redirect, Route } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { IonApp, 
         IonRouterOutlet, 
         setupIonicReact, 
         IonMenu, 
         IonToolbar, 
         IonHeader,
         IonTitle,
         IonContent,
         IonPage,
         IonButtons,
         IonMenuButton,
         IonList,
         IonItem,
         IonIcon} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cameraOutline } from 'ionicons/icons';
import Home from './pages/Home/Home';
import Scan from './pages/Scan/Scan';
import Processing from './pages/Processing/Processing'
import Ingredients from './pages/Ingregients/Ingredients'
import SearchRecipe from './pages/SearchRecipe/SearchRecipe'
import MyRecipes from './pages/MyRecipes/MyRecipes'
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id="RecetappMenu">
        <Route exact path="/home" component={Home} /> 
        <Route exact path="/scan" component={Scan} />
        <Route exact path="/processing" component={Processing} />
        <Route exact path="/ingredients" component={Ingredients} />
        <Route exact path="/searchrecipe" component={SearchRecipe} />
        <Route exact path="/myrecipes" component={MyRecipes}/>
        <Route exact path="/viewrecipe" component={ViewRecipe}/>
        <Redirect to="/home" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
