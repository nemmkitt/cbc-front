
import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import icon from './Pic/kittyWrite.png'
import icon2 from "./Pic/icons8-fish-64.png";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000',
        },
    },
    typography: {
        fontFamily: 'Futura, sans-serif',
    },
});

export default function Edit() {

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('https://witty-housecoat-lion.cyclic.app/authen', {
          method: 'POST',
          headers: {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + token
                },        
        })
        .then(res => res.json())
        .then(data => {
          if(data.status === 'ok'){
          }else{
            window.location = '/'
          }
        })
      })

      
    function formatDate(dateString) {
        var date = new Date(dateString);
        var day = String(date.getDate()).padStart(2, '0');
        var month = String( date.getMonth()+1).padStart(2, '0');
        var year = date.getFullYear();
        return (year + '/' + month +  '/' + day);
    }
    const handleDelete = () => {
        fetch('https://witty-housecoat-lion.cyclic.app/info', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                certificateNo: no
            })
        })
            .then(res => res.json())
            .then((result) => {
                window.location = '/staff'
            })
            .catch(error => {

            });
    };

    const handleSave = () => {
        fetch('https://witty-housecoat-lion.cyclic.app/info', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                standard: std,
                scope: sc,
                company: cpn,
                approval: ap,
                until: un,
                certificateNo: no,
            })
        })
            .then(res => res.json())
            .then((result) => {
                window.location = '/staff'
            })
            .catch(error => {
                
            });
    };

    const params = new URLSearchParams(window.location.search);
    const no = params.get('no');
    const i1 = <img src={icon} height="70" alt='icon' style={{ transform: 'scaleX(-1)', marginBottom: "19px", marginLeft: "7.5rem" }} />
    const [cerno, setNo] = useState('')
    const [sc, setSc] = useState('')
    const [std, setStd] = useState('')
    const [cpn, setCpn] = useState('')
    const [ap, setAp] = useState('')
    const [un, setUn] = useState('')

    useEffect(() => {
        fetch(`https://witty-housecoat-lion.cyclic.app/certificateNo/${no}`)
            .then(res => res.json())
            .then((result) => {
                setNo(result[0].certificateNo)
                setSc(result[0].scope)
                setStd(result[0].standard)
                setCpn(result[0].company)
                setUn(formatDate(result[0].until))
                setAp(formatDate(result[0].approval))
                return;
            })
    }, [no])

    return (
        <div className='background-cer' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>

            <div className="card mb-3" style={{ width: "29rem" }}>
                <div className="card-body">
                    <ThemeProvider theme={theme}>
                        <h3 className="modal-title fs-5" id="staticBackdropLabel" style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <img src={icon2} height="34" alt="icon" style={{ marginBottom: "3px" }} />&ensp; Edit Certificate Infomation
                        </h3>
                        <br></br>
                        <div className="modal-body">
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { ml: 3, mt: 3, width: '18ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >


                                <TextField id="no" label="Certificate No." variant="standard" value={cerno} InputProps={{ readOnly: true, }} />
                                <TextField id="standard-helperText" label="Standard" variant="standard" value={std} onChange={(e) => setStd(e.target.value)} />
                                <TextField id="standard-basic" label="Product/Service" variant="standard" value={sc} onChange={(e) => setSc(e.target.value)} />
                                <TextField id="standard-basic" label="Company" variant="standard" value={cpn} onChange={(e) => setCpn(e.target.value)} />
                                <TextField id="standard-basic" label="Approve Date" variant="standard" value={ap} onChange={(e) => setAp(e.target.value)} />
                                <div style={{ display: 'flex', alignItems: 'center', width: "37ch" }}>
                                    <TextField id="standard-basic" label="Valid Until" variant="standard" value={un} onChange={(e) => setUn(e.target.value)} />

                                    {i1}
                                </div>
                            </Box>
                        </div>
                        <br></br>
                        <div className="modal-footer" style={{ fontFamily: "Futura" }}>
                            <button type="button" className="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash-filled" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" strokeWidth="0" fill="currentColor"></path>
                                    <path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" strokeWidth="0" fill="currentColor"></path>
                                </svg>
                            </button>
                            <a type="button" className="btn btn-outline-dark" href='/staff'>Cancel</a>&emsp;
                            <button type="button" className="btn btn-dark" onClick={handleSave} >Save</button>
                        </div>
                    </ThemeProvider>
                </div>
            </div>
            <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm" style={{ fontFamily: "Futura" }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Delete Infomation</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this infomation
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-dark" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-dark" onClick={handleDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}