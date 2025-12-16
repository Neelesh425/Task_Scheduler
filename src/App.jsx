import { useEffect } from 'react';
import Layout from './components/Layout';
import To_Do from './components/To_Do';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';
import { Route, Routes } from 'react-router-dom';

function App() {

  useEffect(() => {
    document.title = "Task_Scheduler";
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SignIn />} />
          <Route path="todo" element={<To_Do />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;