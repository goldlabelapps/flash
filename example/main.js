import React from 'react';
import ReactDOM from 'react-dom/client';
import { Flash } from '@goldlabelapps/flash';
import './reset.css';

function App() {
  return React.createElement(
    'div',
    { style: { height: '100%' } },
    React.createElement(Flash, {
      movie: 'pingpong',
      color: '#0b564a',
      debug: true,
    }),
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(React.StrictMode, null, React.createElement(App)),
);
