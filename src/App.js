import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2'
import Eos from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

const PARENTS = "parents";
const BIRTHDATE = "birthdate";
const BABYNAME = "babyname";
const GENDER = "gender";
const ADDRESS = "address";
const CHARLENGTH = 256;


const network = {
    blockchain:'eos',
    host: 'proxy.eosnode.tools',
    port:443,
    protocol:'https',
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
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
      memo: '',
      charsLeft: 252
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
          <Grid item xs={12}>
            <TextField
              xs={12}
              lg={12}
              fullWidth={true}
              value={this.state.charsLeft + " characters left."}>
            </TextField>
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
    this.setState({
      memo: this.getMemo(),
      charsLeft: CHARLENGTH - this.getMemo().length
    })
    //console.log(this.getMemo().length)
  }

  submitClicked() {
    console.log("submit clicked")
    console.log(this.state)
    let memo = this.getMemo();

    console.log("memo", memo)

    ScatterJS.scatter.connect('babychain').then(connected => {

        // If the user does not have Scatter or it is Locked or Closed this will return false;
        if(!connected) return false;

        const scatter = ScatterJS.scatter;

        // Now we need to get an identity from the user.
        // We're also going to require an account that is connected to the network we're using.
        const requiredFields = { accounts:[network] };
        scatter.getIdentity(requiredFields).then(() => {

            // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
            // the user for their account name beforehand. They could still give you a different account.
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

            // You can pass in any additional options you want into the eosjs reference.
            const eosOptions = { expireInSeconds:60 };

            // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
            const eos = scatter.eos(network, Eos, eosOptions);

            // Never assume the account's permission/authority. Always take it from the returned account.
            //const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

            const tokenDetails = {contract:'eosio.token', symbol:'EOS', memo:'test babychain memo', decimals:4};
            scatter.requestTransfer(network, 'eosdividendz', '0.001', tokenDetails).then(result => {
                console.log('result', result);
            })

        }).catch(error => {
            // The user rejected this request, or doesn't have the appropriate requirements.
            console.log("rejected request")
            console.error(error);
        });
    });
  }

  getMemo(){
    let s = this.state;
    let memo = `${s.babyName}|${s.birthdate}|${s.gender}|${s.address}|${s.parents}`
    return memo;
  }
}

export default App;
