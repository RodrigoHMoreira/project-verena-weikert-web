import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import "./styles/global.css";

function App() {
  return (
    <div className="flex h-screen overflow-hidden font-montserrat">
      <Sidebar />
      <AppRoutes />
    </div>
  );
}

export default App;
