import './App.css';
import HomePage from './components/HomePage/HomePage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        toastOptions={{
          style: {
            background: '#1a1a1a',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          },
          iconTheme: {
            primary: '#0bfffe',
            secondary: '#dd00d3',
          },
        }}
        position='top-center'
      />
      <HomePage />
    </>
  );
}

export default App;
