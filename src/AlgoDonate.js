import { Component} from 'react';
import { Heading, Field, Radio, AlgoButton, Pipeline, Box, AlgoSendButton, Flash, Input, Button } from 'pipeline-ui';
import { Algo } from "@pipeline-ui/icons"


class AlgoDonate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			amount: "",
			myAddress: "",
			msg: "",
			txID: "",
			balance: ""
		};
	}


	myAlgoWallet = Pipeline.init();

	handleAmountSelectionChange = (e) => {
		if (e.target.value >= 0) {
			this.setState({
				amount: e.target.value
			});
		}
	}

	handleMessageChange = (e) => {
		this.setState({
			msg: e.target.value
		});
	}

	fetchBalance = () => {
		Pipeline.balance(this.state.myAddress).then(
			data => {
				this.setState({ balance: data });
			}
		);
	}


	render() {

		return (
			<div>
				<Heading as={"h1"}>Donate <Algo color="black" /></Heading>

				{!this.state.myAddress &&
					<AlgoButton
						wallet={this.myAlgoWallet}
						context={this}
						returnTo={"myAddress"}
					/>
				}
				{this.state.myAddress &&
					<Box>
						<Heading as={"h2"}>{this.state.balance}</Heading>
						<Button icon="Check" mr={1} onClick={this.fetchBalance} size="small">
							Check Your Balance
						</Button>
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


						<AlgoSendButton
							recipient={this.props.receiverAddress}
							amount={this.state.amount * 1000000}
							note={this.state.msg ? + this.state.msg : ""}
							myAddress={this.state.myAddress}
							wallet={this.myAlgoWallet}
							context={this}
							returnTo={"txID"}
						/>
						
						<Heading as={"h4"}>Receiver = {this.props.receiverAddress} </Heading>


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
