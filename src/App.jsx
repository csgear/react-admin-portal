import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./pages/AdminLayout";
import UserList from "./pages/UserList";
import Login from "./pages/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/users" element={<UserList />} />
        </Route>
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
