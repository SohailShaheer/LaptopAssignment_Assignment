import { Container, Row, Col } from "react-bootstrap"
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import React, { useState } from 'react';

function Sort() {
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);
    const [csv, setCsv] = useState([]);

    const processData = (company, type, ram, os, minprice, maxprice) => {
        const dataStringLines = csv.split(/\r\n|\n/);
        const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        const list = [];
        for (let i = 1; i < dataStringLines.length; i++) {
            const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
            if (
                row[1] === company && row[3] === type &&
                row[7] === ram && row[10] === os &&
                parseFloat(row[12]) >= parseFloat(minprice) &&
                parseFloat(row[12]) <= parseFloat(maxprice)
            ) {
                console.log("here")
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

        // prepare columns list from headers
        const columns = headers.map(c => ({
            name: c,
            selector: c,
        }));

        setData(list);
        setColumns(columns);
        // console.log(columns)
    }

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
            setCsv(data)
        };
        reader.readAsBinaryString(file);
    }

    const submitDataHandler = e => {
        e.preventDefault();
        if (
            e.target.company.value === "Company..." ||
            e.target.type.value === "Type Name..." ||
            e.target.ram.value === "Ram..." ||
            e.target.os.value === "Operating System..." ||
            e.target.minprice.value === "" ||
            e.target.maxprice.value === ""
        ) {
            alert("Please Fill all the fields")
            return
        }
        else {

            processData(
                e.target.company.value,
                e.target.type.value,
                e.target.ram.value,
                e.target.os.value,
                e.target.minprice.value,
                e.target.maxprice.value
            )
        }
    }

    return (
        <Container>
            <Row className='text-center'>
                <h1>Customize</h1>
            </Row>
            <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
            />
            <p>Please Select your Preferred Combination</p>
            <form onSubmit={submitDataHandler}>
                <div class="row">
                    <div class="col">
                        <select id="inputState" name="company" class="form-control">
                            <option selected>Company...</option>
                            <option>Acer</option>
                            <option>Apple</option>
                            <option>Asus</option>
                            <option>Chuwi</option>
                            <option>Dell</option>
                            <option>Fujitsu</option>
                            <option>Google</option>
                            <option>HP</option>
                            <option>Huawei</option>
                            <option>Lenovo</option>
                            <option>LG</option>
                            <option>Mediacom</option>
                            <option>Microsoft</option>
                            <option>MSI</option>
                            <option>Razer</option>
                            <option>Samsung</option>
                            <option>Toshiba</option>
                            <option>Vero</option>
                            <option>Xiaomi</option>
                        </select>
                    </div>
                    <div class="col">
                        <select id="inputState" name="type" class="form-control">
                            <option selected>Type Name...</option>
                            <option>Ultrabook</option>
                            <option>Notebook</option>
                            <option>Netbook</option>
                            <option>Gaming</option>
                            <option>2 in 1 Convertible</option>
                            <option>Workstation</option>
                        </select>
                    </div>
                    <div class="col">
                        <select id="inputState" name="ram" class="form-control">
                            <option selected>Ram...</option>
                            <option>2GB</option>
                            <option>4GB</option>
                            <option>6GB</option>
                            <option>8GB</option>
                            <option>12GB</option>
                            <option>16GB</option>
                            <option>24GB</option>
                            <option>32GB</option>
                            <option>64GB</option>
                        </select>
                    </div>
                    <div class="col">
                        <select id="inputState" name="os" class="form-control">
                            <option selected>Operating System...</option>
                            <option>Android</option>
                            <option>Chrome OS</option>
                            <option>Linux</option>
                            <option>Mac OS X</option>
                            <option>macOS</option>
                            <option>No OS</option>
                            <option>Windows 10</option>
                            <option>Windows 10 S</option>
                            <option>Windows 7</option>
                        </select>
                    </div>
                    <div class="col">
                        <input type="text" name="minprice" class="form-control" placeholder="Minimum Price" />
                    </div>
                    <div class="col">
                        <input type="text" name="maxprice" class="form-control" placeholder="Maximum Price" />
                    </div>

                </div>
                <button style={{ marginTop: "1vw" }} type="submit" class="btn btn-secondary">Search</button>
            </form>
            <DataTable
                pagination
                highlightOnHover
                columns={columns}
                data={data}
            />
        </Container>
    )
}

export default Sort;