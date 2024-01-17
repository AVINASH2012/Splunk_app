import React, { useState } from 'react';
import Search from '@splunk/react-ui/Search';

const Controlled = () => {
    const [value, setValue] = useState('');

    const handleChange = (e, { value: searchValue }) => {
        setValue(searchValue);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // Perform the action to send the search value to the backend
            sendSearchValue(value);
        }
    };

    const sendSearchValue = (searchValue) => {
        // Replace this with  logic to send the search value to the backend
        console.log('Sending search value:', searchValue);
        // to make an API call here to send the search value to the backend
    };

    return (
        <Search
            inline
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={value}
        />
    );
};

export default Controlled;
