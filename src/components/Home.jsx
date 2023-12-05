import React, { useContext, useEffect, useState } from 'react'
import Navbar from './Navbar'
import SearchIcon from '@mui/icons-material/Search';
import './Home.css'
import { Link } from 'react-router-dom';
import ThemeContext from './ThemeContext'

export default function Home() {
   const [countries, setCountries] = useState([]);
   const [searchCountry, setSearchCountry] = useState('');
   const [selectedRegion, setSelectedRegion] = useState('');
   const { theme, themeStyles } = useContext(ThemeContext)

   useEffect(() => {
      fetch("https://restcountries.com/v3.1/all")
         .then(response => response.json())
         .then(data => setCountries(data))
         .catch(error => console.log(error))
   }, [])

   const homeStyle = {
      backgroundColor: themeStyles[theme].backgroundColor,
      color: themeStyles[theme].color,
      countryCard: themeStyles[theme].countryCard,
      searchDropdownCommon: themeStyles[theme].searchDropdownCommon,
      selectRegions: themeStyles[theme].selectRegions,
   };

   const homeContainerStyle = {
      backgroundColor: themeStyles[theme].homeContainer
   }

   
   return (
      <div className="homeContainer" style={homeContainerStyle}>
         <Navbar />
         <div className="searchContainer searchDropdownCommon" style={{...homeStyle, boxShadow: homeStyle.searchDropdownCommon}}>
            <SearchIcon style={{ ...homeStyle, color: "gray" }} />
            <input type="text" className="searchInput" placeholder="Search for the country" onChange={(event) => setSearchCountry(event.target.value)} style={homeStyle} />
         </div>

         <div className="dropdownContainer searchDropdownCommon" style={homeStyle}>
            <select className="selectRegions" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} style={{...homeStyle, boxShadow: homeStyle.selectRegions}}>
               <option disabled hidden value="" style={homeStyle}>Filter By Region</option>
               <option value="Africa" style={homeStyle}>Africa</option>
               <option value="America" style={homeStyle}>America</option>
               <option value="Asia" style={homeStyle}>Asia</option>
               <option value="Europe" style={homeStyle}>Europe</option>
               <option value="Oceania" style={homeStyle}>Oceania</option>
            </select>
         </div>

         <div className="countriesContainer" style={homeContainerStyle}>
            {countries
               .filter((country) =>
                  country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
               )
               .filter(country => selectedRegion === "" || country.region.includes(selectedRegion))
               .filter(country => country.region !== "Antarctic") // Excluded Antarctica from countries list
               .map(country => (
                  <Link key={country.cca3} to={`/CountryDetail/country/${country.cca3}`} style={homeStyle}>
                     <div className="countryCard" style={{ ...homeStyle, boxShadow: homeStyle.countryCard }}>
                        <img className="countryFlag" src={country.flags.png} alt={`${country.name.common} flag`} style={homeStyle} />
                        <h1 className="countryName" style={homeStyle}>{country.name.common}</h1>
                        <h6 className="countryDetails" style={homeStyle}>
                           <span className="detailsHeading" style={homeStyle}>Population:</span>
                           {country.population}</h6>

                        <h6 className="countryDetails" style={homeStyle}>
                           <span className="detailsHeading" style={homeStyle}>Region:</span>
                           {country.region}</h6>

                        <h6 className="countryDetails" style={homeStyle}>
                           <span className="detailsHeading" style={homeStyle}>Capital:</span>
                           {country.capital}</h6>
                     </div>
                  </Link>
               ))
            }
         </div >
      </div>
   )
}
