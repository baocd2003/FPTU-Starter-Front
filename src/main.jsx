import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import  AuthProvider from 'react-auth-kit'
import './index.css';
import createStore from 'react-auth-kit/createStore';
const store = createStore({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure:false,
})
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider 
        store={store}
    >
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthProvider>
)