
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { store } from './Redux/reducerStore.js'
import { Provider } from 'react-redux'
import StoreProvider from './Context/ContextHook.jsx'



createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    
    <Provider store={store}>
    <StoreProvider>
    <App />
    </StoreProvider>
    </Provider>

    </BrowserRouter>
)
