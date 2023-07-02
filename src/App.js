import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx'
import CountryDetail from './components/CountryDetail';
import { useState, useEffect } from 'react';
import ThemeContext from './components/ThemeContext'

function App() {
  const storedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(storedTheme || 'light')

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? "dark" : "light"))
  }

  const themeStyles = {
    light: {
      backgroundColor: '#fff',
      color: '#000',
      countryCard: '0.1rem 0.1rem 0.5rem 0.2rem rgb(235, 233, 233)',
      searchDropdownCommon: '0.1rem 0.1rem 0.5rem 0.2rem rgb(235, 233, 233)',
      selectRegions: '0.1rem 0.1rem 0.5rem 0.2rem rgb(235, 233, 233)',
      homeContainer: '#fff',
      countryDetailContainer: '#fff',
      backContainer: '0.1rem 0.1rem 0.5rem 0.2rem rgb(235, 233, 233)',
    },
    dark: {
      backgroundColor: '#2B3743',
      color: '#fff',
      countryCard: '0 0 0 0.2rem rgba(22, 31, 38, 0)',
      searchDropdownCommon: '0.1rem 0.1rem 0.5rem 0.2rem rgb(22, 31, 38)',
      selectRegions: '0.1rem 0.1rem 0.5rem 0.2rem rgb(22, 31, 38)',
      homeContainer: '#202D36',
      countryDetailContainer: '#202D36',
      container: '#202D36',
      backContainer: '0.1rem 0.1rem 0.5rem 0.2rem rgb(22, 31, 38)',
      backButton: '#2B3743'
    },
  }

  // useEffect(() => {
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeStyles }}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/CountryDetail/country/:id' element={<CountryDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;