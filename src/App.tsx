import { BrowserRouter, Route, Routes } from "react-router";

import AppLayout from "@/layouts/AppLayout";
import HomePage from "@/pages/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
