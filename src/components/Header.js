import React from 'react'
//import Logo from './components/logo.png'
import './Header.css'

const Header = ({black}) => {
  return (
    <header className={black ? 'black' : ''}>
        <div className='header--logo'>
            <a href="/">
                <img src='https://cdn.discordapp.com/attachments/941093408586489916/989602277583126568/Sem_nome_1000_1000_px.png' alt="logo-Netflix" />
            </a>
        </div>
        <div className='header--user'>
            <a href="/">
                <img src="https://i.pinimg.com/originals/c0/8e/6c/c08e6c9595e03202a46a95f66578799f.png" alt="User" />
            </a>
        </div>
    </header>
  )
}

export default Header