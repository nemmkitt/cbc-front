import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import icon from './Pic/rubber-duck.png'
import cat from './Pic/cat.png'
import { useState, useEffect } from 'react';

const GradientAppBar = styled(AppBar)(({ theme }) => ({
    background: 'linear-gradient(-100deg, #fc72a5 30%, #f99dbc 50%, #fec2d6 90%)',
}));

const i = <img src={icon} alt="icon" height="110" />

export default function Searching() {
    const [info, setInfo] = useState([])
    const params = new URLSearchParams(window.location.search);
    const by = params.get('by');
    let key = params.get('key');
    let fetchurl = ''
    if (by === 'all') {
        fetchurl = `https://witty-housecoat-lion.cyclic.app/all?search=${key}`
    } else {
        fetchurl = `https://witty-housecoat-lion.cyclic.app/${by}/${key}`
    }

    if (key === '') {
        key = 'All'
    }

    useEffect(() => {
        fetch(fetchurl)
            .then(res => res.json())
            .then((result) => {
                console.log(result)
                setInfo(result)
            })
    }, [])

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} position="static fixed-top">
                <GradientAppBar>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                            <a href='/search'><img src={cat} alt="icon" width="28" /></a>
                        </Typography>
                        <a className="btn text-white" type="button" href='/search'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-list-search" width="32" height="32" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                                <path d="M18.5 18.5l2.5 2.5"></path>
                                <path d="M4 6h16"></path>
                                <path d="M4 12h4"></path>
                                <path d="M4 18h4"></path>
                            </svg>
                        </a>
                    </Toolbar>
                </GradientAppBar>
                <Typography variant="h3" color="inherit" noWrap style={{ paddingTop: "6rem", paddingLeft: "20px", paddingBottom: "1rem", fontFamily: "Didot", fontWeight: "blod" }}>
                    Result of&ensp;❝ {key} ❞
                </Typography>
            </Box>
            <Grid container justifyContent="flex-start" alignItems="flex-start" sx={{ ml: 2, mt: 2 }}>
                {info.length === 0 ? (
                    <Typography variant="h3" color="inherit" style={{ fontFamily: "Didot" }}>
                        Not Found .
                    </Typography>
                ) : (
                    info.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.certificateNo}>
                            <div className="card border-dark mb-3" style={{ width: "20rem", height: "15rem", fontFamily: "Futura" }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ textAlign: "right" }}>Certificate No. {item.certificateNo}</h5><hr></hr>
                                    <h6 className="card-text">Product/Service  " {item.scope} "</h6>
                                    <h6 className="card-text">Standard : {item.standard}</h6>
                                    <h6 className="card-text">Company : {item.company}</h6>
                                    <h6 className="card-text">Approval Date : {new Date(item.approval).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })}</h6>
                                    <h6 className="card-text">Until Valid : {new Date(item.until).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })}</h6>
                                </div>
                            </div>
                        </Grid>
                    )))}
                <Grid container sx={{ position: 'fixed', bottom: 0, right: 10, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <a className="scroll-to-top" href="#top">{i}</a>
                </Grid>
            </Grid>
        </div>
    );
}