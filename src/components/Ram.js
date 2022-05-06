import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { Container, Row, Col } from "react-bootstrap"
import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function Ram() {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    // process CSV data
    const processData = dataString => {
        const ram = [
            "2GB", "4GB", "6GB" , 
            "8GB" ,"12GB", "16GB", 
            "24GB","32GB","64GB"]
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const list = [];
        for (let comp = 0; comp < ram.length; comp++) {
            for (let i = 1; i < dataStringLines.length; i++) {
                const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
                // console.log(typeof(ram[comp]))
                if (row[7] === ram[comp]) {

                    if (headers && row.length == headers.length) {
                        const obj = {};
                        for (let j = 0; j < headers.length; j++) {
                            let d = row[j];
                            if (d.length > 0) {
                                if (d[0] == '"')
                                    d = d.substring(1, d.length - 1);
                                if (d[d.length - 1] == '"')
                                    d = d.substring(d.length - 2, 1);
                            }
                            if (headers[j]) {
                                obj[headers[j]] = d;
                            }
                        }

                        // remove the blank rows
                        if (Object.values(obj).filter(x => x).length > 0) {
                            list.push(obj);
                        }
                    }
                }
            }
        }

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        setData(list);
        setColumns(columns);
        // console.log(columns)
    }

    // handle file upload
    const handleFileUpload = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (evt) => {
            /* Parse data */
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: 'binary' });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
            processData(data);
        };
        reader.readAsBinaryString(file);
    }
    return (
        <Container>
            <Row className='text-center'>
                <h1>Sorted By Ram</h1>
            </Row>
            <h5>Please Select a CSV file from your device</h5>
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
            />
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
            />
        </Container>
    )
}

export default Ram;