import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { Auth0Provider } from '@auth0/auth0-react';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <Auth0Provider
    domain="unrecetapp.us.auth0.com"
    clientId="JnpYjiZW59Jl2QBEROXRALFCB997IYN6"
    useRefreshTokens={true}
    useRefreshTokensFallback={false}
    authorizationParams={{
      redirect_uri: "com.unal.recetapp://unrecetapp.us.auth0.com/capacitor/com.unal.recetapp/callback"
    }}
  >
    <App />
  </Auth0Provider>
);