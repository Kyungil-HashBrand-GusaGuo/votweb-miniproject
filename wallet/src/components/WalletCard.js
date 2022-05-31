import React, { useState } from 'react'
import { ethers } from 'ethers'

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
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
			window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
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

	const [selectNumber, setSelectNumber] = useState(0);
	

	const changeNumber = (e) => {
		setSelectNumber(e)

	}
	
	return (
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
			<div onChange={(e)=>changeNumber(e.target.value)}>
				<p>==========================</p>
				<input type="radio" value="1" /> 1번
				<input type="radio" value="2" /> 2번
				<input type="radio" value="3" /> 3번
			</div>
			{selectNumber}
			
		</div>
	);
}

export default WalletCard;