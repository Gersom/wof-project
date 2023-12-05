// packages
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from "@common/context/authProvider";


// App
import App from './ui/App.jsx'
import store from '@common/store/store.js'

// styles
import '@styles/main.js';

//envs
import { AUTH_DOMAIN, AUTH_CLIENT_ID, LOADING_URL } from '@common/constants/envs.js';

// Init Project
ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <AuthProvider>
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={AUTH_CLIENT_ID}
      authorizationParams={{
        redirect_uri: LOADING_URL
      }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </AuthProvider>
)

