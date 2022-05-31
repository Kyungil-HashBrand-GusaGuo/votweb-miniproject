import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import Web3 from 'web3';

//import './WalletCard.css'

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					console.log("계정주소", result)
					accountChangedHandler(result[0]);
					setConnButtonText('Wallet Connected');
					getAccountBalance(result[0]);
				})
				.catch(error => {
					setErrorMessage(error.message);

				});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		getAccountBalance(newAccount.toString());
	}

	const getAccountBalance = (account) => {
		window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
			.then(balance => {
				setUserBalance(ethers.utils.formatEther(balance));
				console.log("밸런스", balance)
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		//let test2 = test.json();
		//console.log(balance)
	};

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}


	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	//-------------------------------vote--------------------------------
	const [voteNum, setvoteNum] = useState(0);
	const [contract, setContract] = useState(null);

    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8001"))
    const abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"checkVoteCount","outputs":[{"internalType":"uint256[3]","name":"","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"toVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voteArray","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
    // const voteContractFactory = web3.eth.contract(abi);
    // const voteContractInstance = voteContractFactory.at('0x8a5012e9c2e085ef81bf819de6abcd83a8b887a3'); //
	const createContract = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		let tempSigner = tempProvider.getSigner();
		let tempContract = new ethers.Contract('0x7736cea6aea324686717d5890e517c63211daf62', abi, tempSigner);
		setContract(tempContract);

	}
	// createContract();



    // const voteContractFactory = web3.eth.contract(abi);
    // const voteContractInstance = voteContractFactory.at('0x8a5012e9c2e085ef81bf819de6abcd83a8b887a3'); //



	const changeHandler = (e) => {
		console.log(e.target.value);
		setvoteNum(e.target.value);
	}
	const sumbitVote = async () => {
		let accountsFromMetaMask = await window.ethereum.send('eth_requestAccounts');
		web3.eth.defaultAccount = `${accountsFromMetaMask.result[0]}`;

		// console.log(`${accountsFromMetaMask.result[0]}`)
		if (web3.eth.defaultAccount !== null) {
			console.log('voteNum is ' + voteNum);

			// voteContractInstance.web3.eth.defaultAccount=voteContractInstance.web3.eth.coinbase
			let response = await contract.toVote(voteNum);
			console.log(response)
			// console.log(web3.eth)

		} else {
			console.log('지갑을 연결해주세요')
		}
	}
	const countVote = async () => {
		let accountsFromMetaMask = await window.ethereum.send('eth_requestAccounts');
		web3.eth.defaultAccount = `${accountsFromMetaMask.result[0]}`;
		let response = await contract.checkVoteCount();
		console.log(response)
		console.log("1 : ", parseInt(response[0],16))
		console.log("2 : ", parseInt(response[1],16))
		console.log("3 : ", parseInt(response[2],16))
	}
	useEffect(() => {
		createContract()
	},[])

	return (
		<>
			<div className='walletCard'>
				<h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
				<button onClick={connectWalletHandler}>{connButtonText}</button>
				<div className='accountDisplay'>
					<h3>Address: {defaultAccount}</h3>
				</div>
				<div className='balanceDisplay'>
					<h3>Balance: {userBalance}</h3>
				</div>
				{errorMessage}
			</div>
			<div className='Vote'>
				<p>1,2,3 중 투표를 해주세요</p>
				<input type="number" min='1' max='3' onChange={changeHandler}></input>
				<button onClick={sumbitVote}> 투표하기</button>
			</div>
			<div className='Count'>
				{/* <p>1,2,3 중 투표를 해주세요</p> */}
				{/* <input type="number" min='1' max='3' onChange={changeHandler}></input> */}
				<button onClick={countVote}> 결과 조회</button>
			</div>
		</>
	);
}

export default WalletCard;