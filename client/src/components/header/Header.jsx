import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css"

function Header({ fullName, picture,logout,signInWithGoogle }) {

    
    return (
        <div>
            <header>
                <nav>
                    <ul className="left">
                        <li>
                            <Link to="/">Todoly</Link>
                        </li>
                    </ul>
                    <ul className="right">
                        {fullName ? <li className="profile">
                            <Link to="profile">{fullName}
                                
                            </Link>
                            <img className="profile-pic" src={picture} alt={fullName} />
                            <button className="logout" onClick={ logout}>Logout
                                
                            </button>
                        </li> :
                            <li>
                                <Link onClick={signInWithGoogle }>Login</Link>
                            </li>
                        }
                        
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header
