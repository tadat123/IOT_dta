import React, { useEffect, useState, useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import moment from 'moment';
import './History.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const History = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/history')
            .then(response => response.json())
            .then(data => {
                // Format the time field
                const formattedData = data.map(item => ({
                    ...item,
                    time: moment(item.time).format('YYYY-MM-DD HH:mm:ss')
                }));
                setData(formattedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const columns = useMemo(() => [
        {
            accessorKey: "ID",
            header: 'ID',
        },
        {
            accessorKey: "device",
            header: 'Device',
        },
        {
            accessorKey: "status",
            header: "Status",
        },
        {
            accessorKey: "time",
            header: "Time",
        },
    ], []);

    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: "dark"
            }
        })
    );

    return (
        <ThemeProvider theme={theme}>
            <div className="table-container">
                <MaterialReactTable 
                    columns={columns} 
                    data={data} 
                    enableDensityToggle={false}
                    initialState={{ density: 'compact' }} 
                />
            </div>
        </ThemeProvider>
    );
};

export default History;