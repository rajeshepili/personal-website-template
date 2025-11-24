import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState<'sm' | 'md' | '2xl'>('2xl');

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setScreenSize('sm');
            } else if (window.innerWidth < 1536) {
                setScreenSize('md');
            } else {
                setScreenSize('2xl');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return screenSize;
};

export default useScreenSize;
