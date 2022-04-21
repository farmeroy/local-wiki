import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import Pages from './components/Pages';


function App() {

  return (
    <div >
      <TopNav />
      <Routes>
        <Route path='/' element={<Navigate to='/pages/Main_Page' replace/>} />
        <Route path='/pages' element={<Pages />} />
      </Routes>
    </div>
  );
}

export default App;
