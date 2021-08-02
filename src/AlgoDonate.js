import { Component } from 'react';
import { Heading, Field, Radio, AlgoButton, Pipeline, Box, AlgoSendButton, Flash, Input } from 'pipeline-ui';
import { Algo } from "@pipeline-ui/icons"

class AlgoDonate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: "",
			myAddress: "",
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
			<div>
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
							recipient={this.props.receiverAddress}
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
								<Flash.Link href={'https://algoexplorer.io/tx/' + this.state.txID} target="_blank">
									Show in Explorer
								</Flash.Link>
							</Flash>
						}
					</Box>
				}
			</div>
		);
	}
}

export default AlgoDonate;
