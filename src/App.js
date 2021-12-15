import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Layout from './component/UI/Layout';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/"/> 
      </Routes>
    </Layout>
  );
}

export default App;
