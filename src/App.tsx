import AdminSidebar from "./components/AdminSidebar";
import Sidebar from "./components/AdminSidebar";
import AppRoutes from "./routes";
import "./styles/global.css";

function App() {
  return (
    <div className="flex h-screen overflow-hidden font-montserrat">
      <AdminSidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
