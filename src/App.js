import './App.css';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeesComponent from './components/ListEmployeesComponent';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AddEmployeeComponent } from './components/AddEmployeeComponent';
import { AddPositionComponent } from './components/AddPositionComponent';
import { ListPositionsComponent } from './components/ListPositionsComponent';
import { ListContractTypesComponent } from './components/ListContractTypesComponent';
import { AddContractTypeComponent } from './components/AddContractTypeComponent';
import { AddHoursWorkedComponent} from './components/AddHoursWorkedComponent';
import { ListHoursWorkedComponent} from './components/ListHoursWorkedComponent';

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
            <Route path='/add-position' element={<AddPositionComponent/>}></Route>
            <Route path='/edit-employee/:id' element={<AddEmployeeComponent/>}></Route>
            <Route path='/positions' element={<ListPositionsComponent/>}></Route>
            <Route path='/edit-position/:id' element={<AddPositionComponent/>}></Route>
            <Route path='/contractTypes' element={<ListContractTypesComponent/>}></Route>
            <Route path='/add-contractType' element={<AddContractTypeComponent/>}></Route>
            <Route path='/edit-contractType/:id' element={<AddContractTypeComponent/>}></Route>
            <Route path='/hours-worked/:id' element={<ListHoursWorkedComponent/>}></Route>
            <Route path='/add-hoursWorked/:id' element={<AddHoursWorkedComponent/>}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
