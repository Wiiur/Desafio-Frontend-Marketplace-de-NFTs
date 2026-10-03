// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    // @ts-expect-error: ignorar tipagem temporaria do router
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(async () => {
  // A SOLUÇÃO: Só importamos o App e o Socket DEPOIS do MSW estar ativo!
  const { App } = await import('./App');
  
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});