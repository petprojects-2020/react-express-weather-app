import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer__container row justify-content-start
                            align-items-center bg-secondary border rounded text-white">
            <div className="p-4">Copyright &copy; Weather APP 2021</div>
        </footer>
    );
}

export default Footer;