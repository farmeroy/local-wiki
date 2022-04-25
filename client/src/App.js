import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import TopNav from './components/TopNav';
import Pages from './components/Pages';
import Editor from './components/Editor';


function App() {

  return (
    <div >
      <TopNav />
      <Routes>
        <Route path='/' element={<Navigate to='/pages/Main Page' replace/>} />
        <Route path='/pages/:name' element={<Pages />} />
        <Route path='/pages/:name/edit' element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
