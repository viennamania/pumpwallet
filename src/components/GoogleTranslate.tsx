import React, { useEffect } from 'react';

declare global {
    interface Window {
        googleTranslateElementInit?: () => void;
        google?: any;
    }
}

const GoogleTranslate: React.FC = () => {
    useEffect(() => {
        const addGoogleTranslateScript = () => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
            script.async = true;
            document.body.appendChild(script);
        };

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                { pageLanguage: 'en' },
                'google_translate_element'
            );
        };

        addGoogleTranslateScript();

    }, []);

    return (
        <>
        <div id="google_translate_element" style={{ zIndex: 1000, position: 'absolute', top: 0, right: 0, }}></div>
        </>
    );
};

export default GoogleTranslate;