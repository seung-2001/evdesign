import React, { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState("");

    const clearSearch = () => {
        setSearchKeyword("");
    };

    return (
        <SearchContext.Provider
            value={{
                searchKeyword,
                setSearchKeyword,
                clearSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch must be used within a SearchProvider");
    }
    return context;
};

export default SearchContext;

