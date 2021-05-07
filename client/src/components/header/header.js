import React from 'react';
import './header.css';

const Header = () => {
    return (
        <header className="header__container row justify-content-center bg-secondary
                            align-items-center border rounded">
            <div className="p-2 border rounded bg-white">
                <strong>WEATHER APP</strong>
            </div>
        </header>
    );
}

export default Header;