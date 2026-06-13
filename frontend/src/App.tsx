import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ActorPage } from "./pages/ActorPage";
import { DirectorPage } from "./pages/DirectorPage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { MovieListPage } from "./pages/MovieListPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MovieListPage />} />
          <Route path="/movies/:id" element={<MovieDetailPage />} />
          <Route path="/actors/:id" element={<ActorPage />} />
          <Route path="/directors/:id" element={<DirectorPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
