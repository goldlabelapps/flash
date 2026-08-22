import React from 'react';
import ReactDOM from 'react-dom/client';
import { Flash } from '@goldlabelapps/flash';

function App() {
  return React.createElement(
    'div',
    { style: { fontFamily: 'sans-serif', padding: 24 } },
    React.createElement(Flash, {
      movie: 'logo',
      width: 300,
      height: 180,
      color: '#111111',
      debug: true,
    }),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App)),
);
