import { React, useContext } from 'react'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import './Navbar.css'
import ThemeContext from './ThemeContext'

export default function Navbar() {
    const { theme, toggleTheme, themeStyles } = useContext(ThemeContext)

    const navbarStyle = {
        backgroundColor: themeStyles[theme].backgroundColor,
        color: themeStyles[theme].color,
    };

    return (
        <>
            <div className="navbar" style={navbarStyle}>
                <h1 className="heading" style={navbarStyle}>Where in the world?</h1>
                <div className="toggleModeDiv" style={navbarStyle}>
                    <div onClick={toggleTheme} style={navbarStyle}>
                        {theme === "light" ? (
                            <div className="lightModeContainer" style={navbarStyle}>
                                <LightModeOutlinedIcon style=
                                {{...navbarStyle, fontSize: "1.5rem" }} className="icons" />
                                <span className="modeText" style={navbarStyle}>Light Mode</span>
                            </div>
                        ) : (
                            <div className="darkModeContainer" style={navbarStyle}>
                                <DarkModeOutlinedIcon style=
                                    {{...navbarStyle, fontSize: "1.5rem" }} className="icons" />
                                <span className="modeText" style={navbarStyle}>Dark Mode</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
