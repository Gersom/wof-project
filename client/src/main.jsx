// packages
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import { Auth0Provider } from '@auth0/auth0-react';
import { AuthProvider } from './context/auth-provider/authProvider.jsx';


// App
import App from './ui/App.jsx'
import store from '@common/store/store.js'

// styles
import '@styles/main.js';

//envs
import { AUTH_DOMAIN, CLIENT_ID, LOADING } from './config/envs.js';
import { useContext } from 'react';

// Init Project
ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <AuthProvider>
    <Auth0Provider
      domain={AUTH_DOMAIN}
      clientId={CLIENT_ID}
      authorizationParams={{
        redirect_uri: LOADING
      }}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </Auth0Provider>
  </AuthProvider>
)

