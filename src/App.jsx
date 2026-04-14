import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateEntry from './pages/CreateEntry';
import ViewEntry from './pages/ViewEntry';
import EditEntry from './pages/EditEntry';
import MapPage from './pages/MapPage';
import Settings from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="entry/new" element={<CreateEntry />} />
            <Route path="entry/:id" element={<ViewEntry />} />
            <Route path="entry/:id/edit" element={<EditEntry />} />
            <Route path="map" element={<MapPage />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
