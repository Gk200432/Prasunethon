import './CollabDoc.css';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import EditorPage from './components/EditorPage';
import { Toaster } from 'react-hot-toast';

function CollaboratedDocument() {
  return (
    <>
    <div>
      <Toaster  position='top-center'></Toaster>
    </div>
    <Routes>
     <Route path='/' element={ <Home /> } />
     <Route path='/editor/:roomId' element={ <EditorPage /> } />
    </Routes>
    </>
  );
}

export default CollaboratedDocument;
