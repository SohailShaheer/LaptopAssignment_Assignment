import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { Container, Row, Col } from "react-bootstrap"
import { Button, Nav, NavDropdown, Navbar } from 'react-bootstrap';

function Type() {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    /**
* Function to sort alphabetically an array of objects by some specific key.
* 
* @param {String} property Key of the object to sort.
*/
    function dynamicSort(property) {
        var sortOrder = 1;

        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }

        return function (a, b) {
            if (sortOrder == -1) {
                return b[property].localeCompare(a[property]);
            } else {
                return a[property].localeCompare(b[property]);
            }
        }
    }

    // process CSV data
    const processData = dataString => {
        const type = [
            "Ultrabook", "Notebook", "Netbook",
            "Gaming", "2 in 1 Convertible", "Workstation"]
        const dataStringLines = dataString.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        console.log("this is header: " + headers);
        const list = [];
        for (let comp = 0; comp < type.length; comp++) {
            for (let i = 1; i < dataStringLines.length; i++) {
                const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
                if (row[3] === type[comp]) {

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
        list.sort(dynamicSort("TypeName"));
        setData(list);
        setColumns(columns);
        console.log(columns)
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
                <h1>Sorted By Type</h1>
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

export default Type;