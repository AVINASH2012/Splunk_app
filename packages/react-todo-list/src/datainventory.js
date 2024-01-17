import React, { useEffect, useState } from 'react';
import Table  from '@splunk/react-ui/Table';

const DataInventory = () => {
    const [descriptions, setDescriptions] = useState([]);

    useEffect(() => {
        const getNotes = async () => {
            try {
                const response = await fetch('http://localhost:8000/servicesNS/description/');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                
                const data = await response.json();
                console.log('Data:', data);
                setDescriptions(data || []); // Assuming 'types' is an array in the response
                
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        getNotes();
    }, []);

    descriptions.map((description, index)=> (console.log(index,description.name)));
    descriptions.map((label) => (console.log(label.label_name)))

    return ( 
        <div>
            <Table stripeRows>
                <Table.Head>
                    <Table.HeadCell>ID</Table.HeadCell>
                    <Table.HeadCell>NAME</Table.HeadCell>
                    <Table.HeadCell >DESCRIPTION</Table.HeadCell>
                    <Table.HeadCell>OWNER</Table.HeadCell>
                    <Table.HeadCell>META LABEL</Table.HeadCell>
                    <Table.HeadCell>CLASSIFICATION</Table.HeadCell>
                    <Table.HeadCell>ACTION TYPE</Table.HeadCell>

                    {/* Add more Table.HeadCell if needed */}
                </Table.Head>
                <Table.Body>
                    {descriptions.map((description) => (
                        <Table.Row key={description.name}>
                            <Table.Cell>{description.id}</Table.Cell>
                            <Table.Cell>{description.name}</Table.Cell>
                            <Table.Cell>{description.description}</Table.Cell>
                            <Table.Cell>{description.owner}</Table.Cell>
                            <Table.Cell > 
                               
                                    {description.custom_meta_labels.map((label) => (
                                        <li key={label.id}>{label.label_name}</li>
                                    ))}
                              
                            </Table.Cell>
                            <Table.Cell>{description.custom_fields}</Table.Cell>
                            <Table.Cell>{description.type}</Table.Cell>
                            
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default DataInventory;
