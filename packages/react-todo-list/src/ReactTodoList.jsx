import React, { useCallback, useEffect, useState } from 'react';
import TabBar from '@splunk/react-ui/TabBar';
import Table from '@splunk/react-ui/Table';
import { StyledContainer, StyledGreeting } from './ReactTodoListStyles';
import Search from './Search';
import Controlled from './Search'; 
import { StyledContainerPage, StyledGreetingPage } from './PageWidth';
import { StyledContainerPage2, StyledGreetingPage2 } from './PageWidth2';
import NotesListPage from './Overview';
import DescriptionList from './description';
import DataInventory from './datainventory';
import SearchResults from './Searchresult';
import SearchHistory from './SearchHistoryapi';
import BasicMenu from './Basicmenu';
// import { fetchData } from './api'; 

const data = [
    { name: 'Rylan', age: 42, email: 'Angelita_Weimann42@gmail.com' },
    { name: 'Amelia', age: 24, email: 'Dexter.Trantow57@hotmail.com' },
    { name: 'Estevan', age: 56, email: 'Aimee7@hotmail.com' },
    { name: 'Florence', age: 71, email: 'Jarrod.Bernier13@yahoo.com' },
    { name: 'Tressa', age: 38, email: 'Yadira1@hotmail.com' },
];


function App() {
    const [activeTabId, setActiveTabId] = useState('one');
    const handleChange = useCallback((e, { selectedTabId }) => {
        setActiveTabId(selectedTabId);
    }, []);


    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchChange = useCallback((e) => {
        setSearchQuery(e.target.value);
    }, []);

    const filteredData = data.filter((row) =>
        Object.values(row).some(
            (value) =>
                typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    const tabLabelStyles = {
        overview: { color: 'blue', marginTop: '20px', marginLeft: '10px' },
        kos: { color: 'green', marginTop: '20px', marginLeft: '10px' },
        dataInventory: { color: 'red', marginTop: '20px', marginLeft: '10px' },
        SearchHistory: { color: 'purple', marginTop: '20px', marginLeft: '10px' },
    };


    const renderTabContent = (tabId) => {
        switch (tabId) {
            case 'one':
                return (
                    <div>
                        <h2 style={tabLabelStyles.overview}>Overview</h2>
                        
                        <NotesListPage> </NotesListPage>

                        <p>Content for Overview goes here...</p>
                    </div>
                    
                );
            case 'two':
                return ( 
                    <div>
                        <h2 style={tabLabelStyles.kos}>KOs</h2>
                        <div style={{ marginBottom: '20px',  marginLeft: '10px'}}>  
                        <BasicMenu /> </div>
                        <div>
                        <DescriptionList> </DescriptionList>
                        </div>
                        <p>Content for KOs goes here...</p>
                    </div>
                );
            case 'three':
                return (
                    <div>
                        <h2 style={tabLabelStyles.dataInventory}>Data Inventory</h2>
                        <div style={{ marginBottom: '20px',  marginLeft: '10px'}}> <BasicMenu/> </div>
                        <div>
                        <DataInventory></DataInventory>
                        </div>
                        <p>Content for Data Inventory goes here...</p>
                    </div>
                );
            case 'four':
                return (
                    <div>
                        <h2 style={tabLabelStyles.SearchHistory}>Search History</h2>
                        <SearchHistory> </SearchHistory>
                        <p>Content for Page Four goes here...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="App">
            <StyledContainerPage2>
             <div style={{ marginTop: '20px',position: 'absolute', top: 0, right: 50  }}>
                <SearchResults></SearchResults>
               
            </div>
            <StyledContainer>
            <h1>SPLUNK UI</h1>
            </StyledContainer>

            <StyledContainerPage>
            <TabBar activeTabId={activeTabId} onChange={handleChange}>
                <TabBar.Tab label="Overview" tabId="one" />
                <TabBar.Tab label="KOs" tabId="two" />
                <TabBar.Tab label="Data Inventory" tabId="three" />
                <TabBar.Tab label="Search History" tabId="four" />
            </TabBar>
            
            {/* <InputExample></InputExample> */}
            <div style={{ marginTop: '20px' }}>
                {/* Display content based on active tab */}
                {renderTabContent(activeTabId)}
            </div>
            </StyledContainerPage>
            </StyledContainerPage2>
        </div>
    );
}

export default App;
