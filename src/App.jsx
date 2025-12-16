import { useEffect } from 'react';
import Layout from './components/Layout'
import To_Do from './components/To_Do'
import SiginIn from './components/signIn'
import { Route, Routes } from 'react-router-dom';

function App(){

  useEffect(() => {
    document.title = "Task_Schuduller"
  })

  return(
    <>
      <Routes>
        <Route path "/" element = {<Layout />}>
        <Route element = {<SiginIn />} />
        <Route element ={<To_Do />} />
        </Route>
      </Routes>
    </>
  );
}
export default App