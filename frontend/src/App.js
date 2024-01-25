import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WrapperComponent from "./Pages/Wrraper";
import AdminPage from "./Pages/Admin";
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" exact element={<WrapperComponent />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
