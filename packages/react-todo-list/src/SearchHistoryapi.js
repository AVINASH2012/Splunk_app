import Table from '@splunk/react-ui/Table';
import React, { useState, useEffect } from 'react';

const SearchHistory = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const fetchSearchHistory = async () => {
            try {
                const response = await fetch('http://localhost:8000/servicesNS/api/search-history/');
                if (!response.ok) {
                    throw new Error('Failed to fetch search history');
                }
                const data = await response.json();
                setSearchHistory(data);
            } catch (error) {
                console.error('Error fetching search history:', error);
            }
        };

        fetchSearchHistory();
    }, []);

    return (
        <div>
            <Table stripeRows>
                <Table.Head>
                    <Table.HeadCell> INDEX </Table.HeadCell>
                    <Table.HeadCell> ID </Table.HeadCell>
                    <Table.HeadCell> QUERY </Table.HeadCell>
                    <Table.HeadCell> CREATED_AT </Table.HeadCell>
                </Table.Head>
            <Table.Body> 
            
                {searchHistory.map((query,index) => (
                    // <li key={query.id}>{query.query}</li>
                    <Table.Row key = {query.created_at}>
                        <Table.Cell>{index}</Table.Cell>
                        <Table.Cell>{query.id}</Table.Cell>
                        <Table.Cell>{query.query}</Table.Cell>
                        <Table.Cell>{query.created_at}</Table.Cell>
                    </Table.Row>      
                ))}
    
            </Table.Body>
            </Table>
        </div>
    );
};

export default SearchHistory;
