import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './CountryDetail.css'
import ThemeContext from './ThemeContext'

export default function CountryDetail() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [country, setCountry] = useState({});
  const { theme, themeStyles } = useContext(ThemeContext)

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://restcountries.com/v3.1/alpha/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCountry(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id]);

  const countryDetailStyle = {
    backgroundColor: themeStyles[theme].container,
    color: themeStyles[theme].color,
    backContainer: themeStyles[theme].backContainer,
    backButton: themeStyles[theme].backButton,
  }

  // const containerStyle = {
  //   backgroundColor: themeStyles[theme].container,
  // }

  return (
    <div className='container' style={countryDetailStyle}>
      <Navbar />
      <div className="countryDetailContainer">
        <div className="countryDetailCard" style={countryDetailStyle}>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="backContainer" id="backButton" style={{ ...countryDetailStyle, boxShadow: countryDetailStyle.backContainer, backgroundColor: countryDetailStyle.backButton  }}>
                <Link to="/">
                  <ArrowBackIcon style={{ fontSize: "medium", color: "black", ...countryDetailStyle, backgroundColor: countryDetailStyle.backButton }} />
                  <span className="backButton" style={{...countryDetailStyle, backgroundColor: countryDetailStyle.backButton}}>Back</span>
                </Link>
              </div>

              <div className="countryDetailsContainer" style={countryDetailStyle}>
                <img className="singleCountryFlag" src={country[0].flags.png} alt={`${country[0].name.common} Flag`} />

                <div className="singleCountryDetails" style={countryDetailStyle}>
                  <h1 style={countryDetailStyle}>{country[0].name.common}</h1>
                  <div className="CountryDetailsColumn" style={countryDetailStyle}>
                    <div className="leftSideContainer" style={countryDetailStyle}>

                      <h6 className="detailsHeading" style={countryDetailStyle}>Population:
                        <span className="details" style={countryDetailStyle}>{country[0].population}</span>
                      </h6>
                      <h6 className="detailsHeading" style={countryDetailStyle}>Region:
                        <span className="details" style={countryDetailStyle}>{country[0].region}</span>
                      </h6>
                      <h6 className="detailsHeading" style={countryDetailStyle}>Sub Region:
                        <span className="details" style={countryDetailStyle}>{country[0].subregion}</span>
                      </h6>
                      <h6 className="detailsHeading" style={countryDetailStyle}>Capital:
                        <span className="details" style={countryDetailStyle}>{country[0].capital}</span>
                      </h6>
                    </div>

                    <div className="rightSideContainer" style={countryDetailStyle}>

                      <h6 className="detailsHeading" style={countryDetailStyle}>Top Level Domain:
                        <span className="details" style={countryDetailStyle}>{country[0].tld} &nbsp;</span>
                      </h6>

                      <h6 className="detailsHeading" style={countryDetailStyle}>Currencies:
                        {country.map((countryData) => {
                          const currencyCode = Object.keys(countryData.currencies)[0];
                          const currency = countryData.currencies[currencyCode];
                          return (
                            <span key={countryData.cca3} className="details" style={countryDetailStyle}>{currency.name}</span>
                          );
                        })}
                      </h6>

                      <h6 className="detailsHeading" style={countryDetailStyle}>Languages:
                        {country[0].languages && (
                          <>
                            {Object.values(country[0].languages).map((language, index) => (
                              <span className="details" key={index} style={countryDetailStyle}>{language}</span>
                            ))}
                          </>
                        )}
                      </h6>
                    </div>

                    <h6 className="borderCountriesContainer" style={countryDetailStyle}>Border Countries:
                        {country[0].borders && country[0].borders.length > 0 ? (
                          country[0].borders.map((border, index) => (
                            <Link key={index} to={`/CountryDetail/country/${border}`} className="borderCountryLink" style={countryDetailStyle}>
                              {index !== 0 && <span className="borderCountrySeparator" style={countryDetailStyle}></span>}
                              <span className="borderCountries" style={countryDetailStyle}>{border}&nbsp;</span>
                            </Link>
                          ))
                        ) : (
                          <span className="borders" style={countryDetailStyle}>None</span>
                        )}
                      </h6>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}