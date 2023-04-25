import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import Employees from "./pages/Employees";

const ROLES_LIST = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* protected routes */}
      <Route element={<PersistLogin />}>
        <Route
          element={
            <RequireAuth
              allowedRoles={[
                ROLES_LIST.Admin,
                ROLES_LIST.Editor,
                ROLES_LIST.User,
              ]}
            />
          }
        >
          <Route path="/employees" element={<Employees />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
