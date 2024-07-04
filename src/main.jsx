import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { reduxStore } from './redux/store.js';
const store = createStore({
    authName: '_auth',
    authType: 'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false,
})
ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider
        store={store}
    >
        <Provider store={reduxStore}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </AuthProvider>
)