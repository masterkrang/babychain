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

  constructor(props) {
    super(props);
    this.state = {
      babyName: '',
      birthdate: '',
      gender: '',
      address: '',
      parents: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.submitClicked = this.submitClicked.bind(this);
  }

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
              type="datetime-local"
              defaultValue="2017-05-24"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth={true}
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              xs={12}
              lg={12}
              id="standard-multiline-static"
              label="Location"
              placeholder="Full Address"
              margin="normal"
              fullWidth={true}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              xs={12}
              lg={12}
              id="standard-multiline-static"
              label="Parents (comma separated)"
              placeholder="Bobby Johnson, Mary Stewart"
              margin="normal"
              fullWidth={true}
              onChange={this.handleChange}
            />
          </Grid>
          <Button
            onClick={this.submitClicked}
            variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </div>
    );
  }

  handleChange(event) {
    this.setState({value: event.target.value.toUpperCase()});
    console.log(event.target.value.toUpperCase())
  }

  submitClicked() {
    console.log("submit clicked")
  }
}

export default App;
