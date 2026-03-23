import './App.css'
import LoginRegisterPage from './pages/LoginRegisterPage.jsx'
import CustomerRegistrationForm from './pages/CustomerRegPage.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard/Home.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import Footer from './components/Footer.jsx';
function App() {
    return (
    <>
      <Toaster position="top-right" duration={2000} />

      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          
          {/* Routes */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<LoginRegisterPage />} />
              <Route path="/login" element={<LoginRegisterPage />} />
              <Route path="/customerreg" element={<CustomerRegistrationForm />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />

        </div>
      </BrowserRouter>
    </>
  );
}

export default App
