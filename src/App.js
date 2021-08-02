import './App.css';
import { Component } from 'react';
import { Heading, Field, Radio, AlgoButton, Pipeline, Card, Box, AlgoSendButton, Flash, Input } from 'pipeline-ui';
import { Algo } from "@pipeline-ui/icons"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      myAddress: "",
      receiverAddress: "FDASBUDD5B4YJEBZAYKWGFMF2VS7R2HC7A6UV52GGGLY6FNYDMOHXPYEJU",
      msg: "",
      txID: "",
    };
  }

  myAlgoWallet = Pipeline.init();

  handleAmountSelectionChange = (e) => {
    this.setState({
      amount: e.target.value
    });
  }

  handleMessageChange= (e) => {
    this.setState({
      msg: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Card bg={"#e8e8e8"} width={"auto"} maxWidth={"750px"} mx={"auto"} my={3} p={0} pb={3} px={3}>
          {/* Header */}
          <Heading as={"h1"}>Donate <Algo color="black" /></Heading>
          
          {/* Show the Connect button if not already connected */}
          {!this.state.myAddress && 
            <AlgoButton
              wallet={this.myAlgoWallet}
              context={this}
              returnTo={"myAddress"}
            />
          }

          {/* Display the Form if connected */}
          {this.state.myAddress && 
            <Box>
              {/* Optional message field */}
              <Box>
                <Field label="Additional Message" width={"100%"}>
                  <Input 
                    type="text" 
                    required={false} 
                    onChange={this.handleMessageChange} 
                    value={this.state.msg}
                    width={"100%"}
                  />
                </Field>
              </Box>

              {/* Amount selection radio buttons */}
              <Box>
                <Field label="Amount" width={"100%"}>
                  <Radio
                    label="1 ALGO"
                    value={"1000000"}
                    checked={this.state.amount === "1000000"}
                    onChange={this.handleAmountSelectionChange}
                    required={true}
                  />
                  <Radio
                    label="5 ALGO"
                    value={"5000000"}
                    checked={this.state.amount === "5000000"}
                    onChange={this.handleAmountSelectionChange}
                  />
                  <Radio
                    label="10 ALGO"
                    value={"10000000"}
                    checked={this.state.amount === "10000000"}
                    onChange={this.handleAmountSelectionChange}
                  />
                  <Radio
                    label="50 ALGO"
                    value={"50000000"}
                    checked={this.state.amount === "50000000"}
                    onChange={this.handleAmountSelectionChange}
                  />
                </Field>
              </Box>

              {/* Donate Button */}
              <AlgoSendButton
                recipient={this.state.receiverAddress}
                amount={this.state.amount}
                note={this.state.msg ? "Donation: " + this.state.msg : ""}
                myAddress={this.state.myAddress}
                wallet={this.myAlgoWallet}
                context={this}
                returnTo={"txID"}
              />

              {/* Success Message & Output Transaction ID */}
              {this.state.txID && 
                <Flash variant="success" mt={3} >
                  Thank you for your Donation.&nbsp;
                  <Flash.Link href={'https://testnet.algoexplorer.io/tx/' + this.state.txID} target="_blank">
                    Show in Explorer
                  </Flash.Link>
                </Flash>
              }
            </Box>
          }
        </Card>
      </div>
    );
  }
}

export default App;
