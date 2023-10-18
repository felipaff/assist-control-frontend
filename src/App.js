import logo from './logo.svg';
import './App.css';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeesComponent from './components/ListEmployeesComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddEmployeeComponent } from './components/AddEmployeeComponent';

function App() {
  return (
    <div >
      <BrowserRouter>
        <HeaderComponent/>
        <div className='container'>
          <Routes>
            <Route exact path='/' element={<ListEmployeesComponent/>}></Route>
            <Route path='/employees' element={<ListEmployeesComponent/>}></Route>
            <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route>
            <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>}></Route>
          </Routes>
        </div>
        <FooterComponent/>
      </BrowserRouter>
    </div>
  );
}

export default App;
