import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs2';
import {JsonRpc, Api} from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

const PARENTS = "parents";
const BIRTHDATE = "birthdate";
const BABYNAME = "babyname";
const GENDER = "gender";
const ADDRESS = "address";
const CHARLENGTH = 256;


// const network = {
//     blockchain:'eos',
//     host: 'proxy.eosnode.tools',
//     port:443,
//     protocol:'https',
//     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
// }

const network = ScatterJS.Network.fromJson({
    blockchain:'eos',
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host:'nodes.get-scatter.com',
    port:443,
    protocol:'https'
});

const rpc = new JsonRpc(network.fullhost());

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

    ScatterJS.connect('babychain', {network}).then(connected => {
      if(!connected) return console.error('no scatter');

      const eos = ScatterJS.eos(network, Api, {rpc, beta3:true});

      ScatterJS.login().then(id => {
          if(!id) return console.error('no identity');
          const account = ScatterJS.account('eos');

          eos.transact({
              actions: [{
                  account: 'eosio.token',
                  name: 'transfer',
                  authorization: [{
                      actor: account.name,
                      permission: account.authority,
                  }],
                  data: {
                      from: account.name,
                      to: 'eosdividendz',
                      quantity: '0.0001 EOS',
                      memo: 'test memo',
                  },
              }]
          }, {
              blocksBehind: 3,
              expireSeconds: 30,
          }).then(res => {
              console.log('sent: ', res);
          }).catch(err => {
              console.error('error: ', err);
          });
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
