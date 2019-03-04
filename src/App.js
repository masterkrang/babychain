import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const styles = {
  app: 'margin 0px auto'
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid container spacing={24} alignContent='center'>
          <Grid item xs={12}>
            <TextField
              xs={12}
              lg={12}
              id="standard-multiline-static"
              label="Baby's Name"
              placeholder="Satoshi Nakamoto Jr. III"
              margin="normal"
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12} lg={12}>
            <TextField
              xs={12}
              lg={12}
              id="date"
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth={true}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              xs={12}
              lg={12}
              id="standard-multiline-static"
              label="Gender"
              placeholder="Anything goes"
              margin="normal"
              fullWidth={true}
            />
          </Grid>
          <Button variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </div>
    );
  }
}

export default App;
