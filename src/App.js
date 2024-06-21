import './App.css';
import { BrowserRouter as Router,  } from "react-router-dom";
import { Theme } from '@radix-ui/themes';
import RoutesComponent from './RoutesComponent';
import { AuthProvider } from './utils/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
function App() {
  return (
    <AuthProvider>
<Router>
      <div className="App">
        <Theme>
        <RoutesComponent />
        <ToastContainer/>
        </Theme>
      </div>
      </Router>
       </AuthProvider>
  );
}

export default App;
