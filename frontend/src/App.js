import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./components/users/Register";
import Login from "./components/users/Login";
import Dashboard from "./components/users/UserDashboard";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import Home from "./components/Home/Home";
import { useAuth } from "./AuthContext/AuthContext";
import AuthRoute from "./AuthRoute/AuthRoute";
import BlogPostAIAssistant from "./components/ContentGeneration/GenerateContent";
import Plans from "./components/Plans/Plan";
import FreePlanSignup from "./components/StripePayment/FreePlanSignup";
import CheckoutForm from "./components/StripePayment/CheckoutForm";
import PaymentSuccess from "./components/StripePayment/PaymentSuccess";
import ContentGenerationHistory from "./components/ContentGeneration/ContentGenerationHistory";
import AppFeatures from "./components/AppFeatures/AppFeatures";
import AboutUs from "./components/About/AboutUs";

export default function App() {
  const { isAuthenticated } = useAuth();
  return (
    <>

      <BrowserRouter>
        {/* Navbar */}
        {isAuthenticated ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={
            <AuthRoute>
              <Dashboard />
            </AuthRoute>
          } />
          <Route path="/generate-content" element={
            <AuthRoute>
              <BlogPostAIAssistant />
            </AuthRoute>
          } />
          <Route path="/history" element={
            <AuthRoute>
              <ContentGenerationHistory />
            </AuthRoute>
          } />
          <Route path="/home" element={<Home />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/free-plan" element={
            <AuthRoute>
              <FreePlanSignup />
            </AuthRoute>
          } />
          <Route path="/home/free-plan" element={
            <AuthRoute>
              <FreePlanSignup />
            </AuthRoute>
          } />
          <Route path="/checkout/:plan" element={
            <AuthRoute>
              <CheckoutForm />
            </AuthRoute>
          } />
          <Route path="/success" element={
            <AuthRoute>
              <PaymentSuccess />
            </AuthRoute>
          } />
          <Route path="/features" element={<AppFeatures />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}