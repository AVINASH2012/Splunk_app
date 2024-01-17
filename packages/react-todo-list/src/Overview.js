import React, { useEffect, useState } from 'react';

const NotesListPage = () => {
    const [typeCounts, setTypeCounts] = useState({});

    useEffect(() => {
        const getTypeCounts = async () => {
            try {
                const response = await fetch('http://localhost:8000/servicesNS/overview/');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Data:', data);
                setTypeCounts(data.type_counts || {});
            } catch (error) {
                console.error('There was a problem fetching the data:', error);
            }
        };

        getTypeCounts();
    }, []);

    return (
        <div>
            <ul>
                {Object.entries(typeCounts).map(([type, count]) => (
                    <div key={type}>
                        <li>
                            {type}: {count}
                        </li>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default NotesListPage;
