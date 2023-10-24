// packages
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"

// App
import App from './ui/App.jsx'
import store from '~common/store/store.js'

// styles
import '~styles/main.js';

// Init Project
ReactDOM.createRoot(
  document.getElementById('root')
)
.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)