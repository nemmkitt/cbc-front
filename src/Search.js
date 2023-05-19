import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Button from '@mui/material/Button';
import './Search.css'
import cat from './Pic/cat.png'
import srch from './Pic/levitation.png'
import staff from './Pic/planet.png'

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

function Search() {
  const [searchKey, setSearchKey] = useState('')
  const [searchBy, setSearchBy] = useState('all')
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const handleSearch = (event) => {
    event.preventDefault();
    window.location = `/searching?by=${searchBy}&key=${searchKey}`
  }

  const handleLogin = (event) => {
    event.preventDefault();
      fetch('https://witty-housecoat-lion.cyclic.app/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user,
            password: password
          })
      })
          .then(res => res.json())
          .then((result) => {
            if (result.status === 'ok') {
              localStorage.setItem('token', result.token)
              window.location = '/staff'
            }
          })
          .catch(error => {
              
          });
  }


  return (
    <div className="bg-image" >
      <nav className="navbar bg-body-tertiary bg-dark" data-bs-theme="dark">
        <a className="navbar-brand" href='/search' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
          &emsp;<img src={cat} alt="icon" width="28" />&emsp;Validate the Authenticity of a Certificate
        </a>
      </nav>
      <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" style={{ textAlign: "center" }}>
        <ThemeProvider theme={theme}>
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel" style={{ fontSize: "40px" }}>Sign in&nbsp;<img src={srch} alt="icon" width="66" /></h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <form onSubmit={{handleLogin}}>
          <div className="offcanvas-body">
            <TextField id="standard-basic" label="Username" variant="standard" style={{ width: "300px" }} onChange={(event) => { setUser(event.target.value) }} autoComplete='off'/><br></br><br></br>
            <TextField type="password" id="password" label="Password" variant="standard" style={{ width: "300px" }} onChange={(event) => { setPassword(event.target.value) }} /><br></br><br></br><br></br>
            <button type="submit" className="btn btn-dark" style={{ fontFamily: "Futura", marginTop: "30px" }} onClick={handleLogin}> Submit </button>
          </div>
          </form>
        </ThemeProvider>
      </div>
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '78vh',
          }}
        >
          <h1 className='search' style={{ marginBottom: "20px" }}>S e a r c h</h1>
          <div style={{ display: 'flex', alignItems: 'center' }} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <NativeSelect inputProps={{ name: 'standard', id: 'uncontrolled-native', style: { textAlign: "center", fontSize: "18px", }, }}
                  onChange={(event) => {
                    setSearchBy(event.target.value);
                  }}>
                  <option value="all">All</option>
                  <option value="certificateNo">Certificate No.</option>
                  <option value="company">Company</option>
                  <option value="standard">Standard</option>
                  <option value="scope">Product</option>
                </NativeSelect>
              </FormControl>
            </Box>
            <form onSubmit={handleSearch}>
              <TextField variant="standard" placeholder='Certificate No. Product’s name Company name etc.' inputProps={{
                style: {
                  '&:focus': { color: theme.palette.primary.main, },
                  fontSize: "18px",
                  width: "450px",
                  textAlign: "center",
                },
              }}
                autoComplete='off'
                onChange={(event) => { setSearchKey(event.target.value) }}
              />
            </form>
            <Button type='submit' onClick={handleSearch} variant="text"><img src={staff} alt="icon" width="45px" style={{ transform: 'rotate(12deg)' }} /></Button>
          </div>
        </div>
      </ThemeProvider>
    </div>

  );
}

export default Search;
