// src/Footer.jsx
import React from 'react';

function Footer() {
    return (
    <footer className="bottom-0 bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 mt-8 rounded-t-lg shadow-lg">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-2xl font-bold tracking-wide hover:text-yellow-300 transition-colors duration-300 cursor-pointer">
                Land Registration App
            </h3>
            <p className="text-sm opacity-80">Securing your land, one registration at a time.</p>
        </div>

        <div className="mb-4 md:mb-0">
            <nav className="flex justify-center md:justify-start space-x-6">
                <a href="/home" className="hover:text-yellow-300 transition-colors duration-300 font-medium">Home</a>
                <a href="/about" className="hover:text-yellow-300 transition-colors duration-300 font-medium">About Us</a>
                <a href="/contact" className="hover:text-yellow-300 transition-colors duration-300 font-medium">Contact</a>
                <a href="/privacy" className="hover:text-yellow-300 transition-colors duration-300 font-medium">Privacy Policy</a>
            </nav>
        </div>

        <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-300 transition-colors duration-300">
                <i className="fab fa-linkedin-in"></i>
            </a>
        </div>
    </div>
    <div className="text-center mt-4 text-sm opacity-80">
        &copy; {new Date().getFullYear()} Land Registration App. All rights reserved.
    </div>
</footer>
    );
}

export default Footer;
