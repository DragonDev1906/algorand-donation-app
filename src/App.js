import './App.css';
import { Component } from 'react';
import { Card } from 'pipeline-ui';
import AlgoDonate from './AlgoDonate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card bg={"#e8e8e8"} width={"auto"} maxWidth={"750px"} mx={"auto"} my={3} p={0} pb={3} px={3}>
          <AlgoDonate 
            receiverAddress="FDASBUDD5B4YJEBZAYKWGFMF2VS7R2HC7A6UV52GGGLY6FNYDMOHXPYEJU"
          />
        </Card>
      </div>
    );
  }
}

export default App;
