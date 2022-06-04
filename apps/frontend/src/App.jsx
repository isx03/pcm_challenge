import { BrowserRouter, Routes, Route } from "react-router-dom"
import EditPage from "./pages/EditPage";
import IndexPage from "./pages/IndexPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <IndexPage /> } />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/edit/:id" element={ <EditPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
