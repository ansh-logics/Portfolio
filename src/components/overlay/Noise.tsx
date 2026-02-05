import React from "react";

const Noise: React.FC = () => {
    return (
        <div
            className="fixed inset-0 w-full h-full pointer-events-none z-30 opacity-[0.02]"
            style={{
                backgroundImage: "url('https://www.ui-layouts.com/noise.gif')",
            }}
        />
    );
};

export default Noise;
