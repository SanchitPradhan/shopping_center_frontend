import './App.css';
import { Routes, Route } from "react-router-dom";
import UserDrawerLayout from './Components/UserDrawerLayout';
import Home from './Components/Home';
import Mobiles from './Components/Mobiles';
import Laptops from './Components/Laptops';
import Books from './Components/Books';
import Clothes from './Components/Clothes';
import AdminDrawerLayout from './Components/AdminDrawerLayout';
import UserList from './Components/UserList';
import OrderDetails from './Components/OrderDetails';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ProductDetails from './Components/ProductDetails';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />}>
        <Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
      </Route>
      <Route path='/User' element={<UserDrawerLayout />}>
      <Route path='/User' element={<Home />} />
        <Route path='/User/Home' element={<Home />} />
        <Route path='/User/Mobiles' element={<Mobiles />} />
        <Route path='/User/Laptops' element={<Laptops />} />
        <Route path='/User/Books' element={<Books />} />
        <Route path='/User/Clothes' element={<Clothes />} />
        <Route path='/User/ProductDetails/:_id' element={<ProductDetails />} />
      </Route>
      <Route path='/Admin' element={<AdminDrawerLayout />}>
      <Route path='/Admin' element={<Home />} />
        <Route path='/Admin/UserList' element={<UserList />} />
        <Route path='/Admin/OrderDetails' element={<OrderDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
