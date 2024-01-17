// BasicMenu.js

import React, { useState, useEffect } from 'react';
import Button from '@splunk/react-ui/Button';
import Dropdown from '@splunk/react-ui/Dropdown';
import Menu from '@splunk/react-ui/Menu';

const BasicMenu = ({ onChange }) => {
    const [types, setTypes] = useState([]);

    useEffect(() => {
        const fetchSplunkObjectTypes = async () => {
            try {
                const response = await fetch('http://localhost:8000/servicesNS/api/overview/');
                if (!response.ok) {
                    throw new Error('Failed to fetch types');
                }
                const data = await response.json();
                setTypes(data.types || []);
            } catch (error) {
                console.error('Error fetching types:', error);
            }
        };

        fetchSplunkObjectTypes();
    }, []);

    const toggle = <Button label="510 Dashboard" isMenu />;

    const handleMenuChange = (selectedType) => {
        if (onChange) {
            onChange(selectedType);
        }
    };

    return (
        <Dropdown toggle={toggle}>
            <Menu>
                {types.map((type) => (
                    <Menu.Item key={type} onSelect={() => handleMenuChange(type)}>
                        {type}
                    </Menu.Item>
                ))}
            </Menu>
        </Dropdown>
    );
};

export default BasicMenu;
