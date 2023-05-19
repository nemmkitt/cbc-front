import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Certification from './Certification';
import './Form.css'
import icon from './Pic/kittyWrite.png'
import icon2 from './Pic/fish-bowl.png'
import { useState ,useEffect } from 'react';

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


export default function Form() {
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
  const [cerno, setNo] = useState('')
  const [sc, setSc] = useState('')
  const [std, setStd] = useState('')
  const [cpn, setCpn] = useState('')
  const [ap, setAp] = useState(' ')
  const [un, setUn] = useState(null)


  const i = <img src={icon} height="70" alt='icon' />
  const i2 = <img src={icon2} height="70" alt='icon' style={{ marginTop: "10px" }} />

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
      var data = {
        'certificateNo': cerno,
        'standard': std,
        'scope': sc,
        'company': cpn,
        'approval': ap,
        'until': un,
      }
      fetch('https://witty-housecoat-lion.cyclic.app/info', {
        method: 'POST',
        headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(res => res.json())
      .then(
        (result) => {
          if (result['status'] === 'ok') {
            setActiveStep(activeStep + 1);
          }
        }
      )
  };

  const handleBack = () => {
   window.location = '/staff'
  };

  const steps = ['Certificate'];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <Certification
        certificateNo={cerno}
        setCertificateNo={setNo}
        scope={sc}
        setScope={setSc}
        company={cpn}
        setCompany={setCpn}
        standard={std}
        setStandard={setStd}
        apDate={ap}
        setApDate={setAp}
        until={un}
        setUntil={setUn}
         />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <div className='background-cer'>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Typography variant="h8" color="inherit"  >
&emsp;
        </Typography>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
          <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center" style={{ marginBottom: '20px', fontFamily: "Fc Lamoon", fontSize: "53px", fontWeight: "bold" }}>
              {i} Certificate Record {i2}
              <br></br>
            </Typography>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Insert Infomation Successful
                </Typography>
                <Typography variant="subtitle1">
                  ⎯ Certificate No. #{cerno} information has been successfully inserted into the system.Thank you for your hard work. <span role="img" aria-labelledby="flower-label">🌷</span>♡
                  <br></br>
                  <a href='/staff' type="button" className="btn btn-dark" style={{ fontFamily: "Futura", marginTop: "30px", marginLeft: "26.5rem" }}> B a c k </a>
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}> {activeStep === 0 && (<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>Cancel</Button>)}
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 3, ml: 1 }} >  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}</Button>
                </Box>
              </React.Fragment>
            )}
          </Paper>
        </Container>
      </ThemeProvider>
    </div>
  );
}
