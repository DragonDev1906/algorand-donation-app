import { Component } from 'react';
import { Heading, Field, Radio, AlgoButton, Pipeline, Box, AlgoSendButton, Flash, Input, Button, SwitchNet } from 'pipeline-ui';
import { Algo } from "@pipeline-ui/icons"


class AlgoDonate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: "",			// The amount to be donated that is selected
			myAddress: "",		// The address of the user (set once the user Connects to MyAlgo)
			msg: "",			// The optional message the user can enter
			txID: "",			// The transaction ID received after donating
			balance: ""			// The balance of the user
		};
	}

	// Initialize the Pipeline (get the wallet object that is needed later)
	myAlgoWallet = Pipeline.init();

	/** Called when a radio button is clicked */
	handleAmountSelectionChange = (e) => {
		if (e.target.value >= 0) {
			this.setState({
				amount: e.target.value
			});
		}
	}

	/** Called when the text in the message input field changes */
	handleMessageChange = (e) => {
		this.setState({
			msg: e.target.value
		});
	}

	fetchBalance = () => {
		// Remove the current balance (so the UI doesn't display it while fetching)
		this.setState({ balance: "" });
		Pipeline.balance(this.state.myAddress).then(
			data => {
				this.setState({ balance: data });
			}
		);
	}


	render() {
		return (
			<div>
				{/* Header and Algorand Icon */}
				<Heading as={"h1"}>Donate <Algo color="black" /></Heading>

				{/* Show the Connect button if not already connected */}
				{!this.state.myAddress &&
					<AlgoButton
						wallet={this.myAlgoWallet}
						context={this}
						returnTo={"myAddress"}
					/>
				}

				<SwitchNet />

				{/* Display the Form if connected */}
				{this.state.myAddress &&
					<Box>
						{/* Display the user's balance */}
						{this.state.balance !== "" && <Heading as={"h4"}>Balance: {this.state.balance}</Heading>}
						{/* Allow the user to update his balance via button click */}
						<Button icon="Check" mr={1} onClick={this.fetchBalance} size="small">
							Check Your Balance
						</Button>
						{/* Optional message field */}
						<Box>
							<Field label="Message" width={"100%"}>
								<Input
									type="text"
									required={false}
									onChange={this.handleMessageChange}
									value={this.state.msg}
									width={"100%"}
								/>
							</Field>
						</Box>

						{/* Amount selection */}
						<Box>
							<Field label="Amount" width={"100%"} >
								<Radio
									label="1 ALGO"
									value={"1"}
									checked={this.state.amount === "1"}
									onChange={this.handleAmountSelectionChange}
									required={true}
								/>
								<Radio
									label="5 ALGO"
									value={"5"}
									checked={this.state.amount === "5"}
									onChange={this.handleAmountSelectionChange}
								/>
								<Radio
									label="10 ALGO"
									value={"10"}
									checked={this.state.amount === "10"}
									onChange={this.handleAmountSelectionChange}
								/>
								<Radio
									label="50 ALGO"
									value={"50"}
									checked={this.state.amount === "50"}
									onChange={this.handleAmountSelectionChange}
								/>
								<Input
									type="number"
									required={true}
									placeholder="Specific Amount"
									value={this.state.amount}
									onChange={this.handleAmountSelectionChange}
									marginTop="10px"
								/>	
							</Field>
						</Box>

						<Heading as={"h4"}>Receiver = {this.props.receiverAddress} </Heading>

						<AlgoSendButton
							recipient={this.props.receiverAddress}
							amount={this.state.amount * 1000000}
							note={this.state.msg ? this.state.msg : ""}
							myAddress={this.state.myAddress}
							wallet={this.myAlgoWallet}
							context={this}
							returnTo={"txID"}
						/>

						{/* Amount selection radio buttons */}
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
