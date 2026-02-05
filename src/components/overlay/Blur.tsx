import { useState, useEffect } from "react";

const Blur = () => {
    const [scrollOpacity, setScrollOpacity] = useState(1);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const bodyHeight = document.body.scrollHeight; // Get full scrollable height
        const bottomThreshold = bodyHeight - windowHeight - 25;

        // Set opacity based on scroll position
        const opacity = scrollY >= bottomThreshold ? 0 : 1;
        setScrollOpacity(opacity);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div
            className={`fixed bottom-0 inset-0 p-1 w-full h-full backdrop-blur-[8px] pointer-events-none z-50 overlay-mask`}
            style={{ opacity: scrollOpacity }} // Dynamically apply opacity
        />
    );
};

export default Blur;
