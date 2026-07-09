import { createRoot } from 'react-dom/client'
import App from './features/App/App.jsx'
import { Provider } from 'react-redux'
import { store } from './features/App/App.store.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
