import React, { useState, useEffect } from 'react';
import Search from '@splunk/react-ui/Search';

const SearchResults = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = (e, { value: search_term }) => {
        setSearchQuery(search_term);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendSearchValue(searchQuery);
        }
    };

    const sendSearchValue = async (search_term) => {
        try {
            const response = await fetch(`http://localhost:8000/servicesNS/search/${search_term}/`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const searchData = await response.json();
            setSearchResults(searchData);
        } catch (error) {
            console.error('There was a problem with the search:', error);
        }
    };

    useEffect(() => {
        // Only perform the search when the query is not empty
        if (searchQuery.trim() !== '') {
            sendSearchValue(searchQuery);
        } else {
            // Clear search results when the query is empty
            setSearchResults([]);
        }
    }, [searchQuery]);

    return (
        <div>
            <Search
                inline
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                value={searchQuery}
            />

            <div>
                
                <ul>
                    {searchResults.map((result, index) => (
                        <li key={index}>Search results {index + 1}: 
                        <div style={{backgroundColor: '#92A8D1'}}>
                        <div>id: {result.id}</div>
                        <div>type: {result.type}</div>
                        <div>name: {result.name}</div>
                        <div>description: {result.description}</div>
                        <div>owner: {result.owner}</div>
                        </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchResults;
