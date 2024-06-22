import NavBar from "./NavBar";
import React from 'react';

export default function Layout({ children }) {
    return (
        <>
            <div className="page-container" style={{
                backgroundImage: 'url(assets/images/background.jpg)',
                backgroundSize: 'cover', // Cover the whole page
                backgroundRepeat: 'no-repeat', // Prevent repeats
                backgroundAttachment: 'fixed', // Fix the position
                backgroundPosition: 'left center', // Position to the left
                height: '100vh'
            }}>
                <NavBar />
                {children}
            </div>
        </>
    );
}
