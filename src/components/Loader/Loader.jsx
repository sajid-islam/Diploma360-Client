import React from "react";

const Loader = ({ size }) => {
    return (
        <div
            className={`size-${size} border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin`}
        />
    );
};

export default Loader;
