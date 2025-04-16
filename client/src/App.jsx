import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Router />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
