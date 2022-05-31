import './App.css';
import { VotePage,VoteResultPage } from "./components"
import {Routes, Route} from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<VotePage/>}></Route>
        <Route path='/voteresult' element={<VoteResultPage/>}></Route>
      </Routes>

       

    </>
  );
}

export default App;
