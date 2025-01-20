import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function renderApp() {
    const container = document.getElementById('root');
    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(
            <React.StrictMode>
                <App />
            </React.StrictMode>
        );
    } else {
        console.error('Container element not found');
        console.log('Document body:', document.body.innerHTML);
    }
}
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderApp);
} else {
    renderApp();
}