import AppRoutes from "./Components/Routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { userStore } from './Redux/UserStore';
function App() {

  return (
    <>
      <Provider store={userStore}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
