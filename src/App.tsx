import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { NonPlumbingContactPage } from "./pages/NonPlumbingContactPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<NonPlumbingContactPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
