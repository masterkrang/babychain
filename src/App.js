import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const PARENTS = "parents";
const BIRTHDATE = "birthdate";
const BABYNAME = "babyname";
const LOCATION = "location";
const GENDER = "gender";
const ADDRESS = "address";

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
      parents: '',
      memo: ''
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
              onChange={(evt) => this.handleChange(BABYNAME, evt)}
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
              onChange={(evt) => this.handleChange(BIRTHDATE, evt)}
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
              onChange={(evt) => this.handleChange(GENDER, evt)}
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
              onChange={(evt) => this.handleChange(ADDRESS, evt)}
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
              onChange={(evt) => this.handleChange(PARENTS, evt)}
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

  handleChange(section, event) {
    //console.log("section", section)
    switch (section) {
      case PARENTS:
        this.setState({parents: event.target.value});
        break;
      case BABYNAME:
        this.setState({babyName: event.target.value});
        break;
      case GENDER:
        this.setState({gender: event.target.value});
        break;
      case ADDRESS:
        this.setState({address: event.target.value});
        break;
      case BIRTHDATE:
        this.setState({birthdate: event.target.value});
        break;
      default:
        console.log("uh oh")
    }
  }

  submitClicked() {
    console.log("submit clicked")
    console.log(this.state)
    let s = this.state;
    let memo = `${s.babyName}|${s.birthdate}|${s.gender}|${s.address}|${s.parents}`

    console.log("memo", memo)
  }
}

export default App;
