import * as React from 'react';
import { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function Certification({ certificateNo, setCertificateNo, scope, setScope, company, setCompany, standard, setStandard ,apDate ,setApDate, until, setUntil}) {
  const cerNoRef = useRef(null);

  useEffect(() => {
    cerNoRef.current.focus();
  }, []);

  const handleCertificateNoChange = (e) => {
    setCertificateNo(e.target.value);
  };

  const handleScopeChange = (e) => {
    setScope(e.target.value);
  };

  const handleCompanyChange = (e) => {
    setCompany(e.target.value);
  };

  const handleStandardChange = (e) => {
    setStandard(e.target.value);
  };

    const handleAp = (date) => {
      const formattedDate = formatDate(date.$d);
      setApDate(formattedDate);
    };
  
    const handleUn = (date) => {
      const formattedDate = formatDate(date.$d);
      setUntil(formattedDate);
    };
  
    
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    };

  return (
    <React.Fragment>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="CerNo"
            name="CerNo"
            label="Certificate No."
            fullWidth
            variant="standard"
            inputRef={cerNoRef}
            value={certificateNo}
            onChange={handleCertificateNoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl variant="standard" sx={{ width: 500 }}>
            <InputLabel id="demo-simple-select-standard-label">Standard</InputLabel>
            <NativeSelect
              inputProps={{
                name: 'searchBy',
                id: 'uncontrolled-native',
              }}
              value={standard}
              onChange={handleStandardChange}
            >
              <option></option>
              <option>ISO9001</option>
              <option>ISO14001</option>
              <option>ISO45001</option>
              <option>GHPs</option>
              <option>HACCP</option>
              <option>ISO22000</option>
              <option>GTAS</option>
              <option>GMP</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Cpn"
            name="Cpn"
            label="Company"
            fullWidth
            variant="standard"
            value={company}
            onChange={handleCompanyChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="Scope"
            name="Scope"
            label="Product or Service (Scope)"
            fullWidth
            variant="standard"
            value={scope}
            onChange={handleScopeChange}
          />
        </Grid>
        <LocalizationProvider dateAdapter={AdapterDayjs} >
        <Grid item xs={12}>
          <DatePicker
            label="Approval Date"
            slotProps={{ textField: { variant: 'standard' } }}
            onChange={handleAp}
            sx={{width:"500px"}}
          />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Valid Until"
              slotProps={{ textField: { variant: 'standard' } }}
              onChange={handleUn}
              sx={{width:"500px"}}
            />
            </Grid>
        </LocalizationProvider>
      </Grid>
      <br/>
    </React.Fragment>
  );
}
