import { Navigate, Route, Routes } from "react-router-dom";
import './styles.scss';
import Navbar from './components/Navbar';
import { Login, Signup, Products } from "./pages";
import Container from "./components/Container";
import { useAuthContext } from "./context/AuthContext";
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { auth } = useAuthContext();

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route exact path="/" element={!auth ? <Login /> : <Navigate to="/products" />} />
          <Route path="/signup" element={!auth ? <Signup /> : <Navigate to="/products" />} />
          <Route path="/products" element={auth ? <Products /> : <Navigate to="/" />} />
        </Routes>
      </Container>
      <ToastContainer position="bottom-right" theme="dark" newestOnTop transition={Flip} />
    </>
  );
}

export default App;
