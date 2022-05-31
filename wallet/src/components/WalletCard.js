import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
<<<<<<< Updated upstream
//import {Web3} from "web3";

=======
import Swal from 'sweetalert2'
>>>>>>> Stashed changes


const WalletCard = () => {
	
	// let lotteryAddress = "0xa72B369D2C2376D16A53B5a4E3674Ef099C872f9";
	// let lotteryABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"checkVoteCount","outputs":[{"internalType":"uint256[3]","name":"","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"toVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voteArray","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
	

	// const web3 = new Web3(window.ethereum);


	// const lotteryContract = new web3.eth.Contract(lotteryABI, lotteryAddress);

	// console.log(lotteryContract)

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

	// useEffect
	useEffect( () => {
		connectWalletHandler()
	}, [])

	// radio button state
	const [selectNumber, setSelectNumber] = useState(0);

	const changeNumber = (e) => {
		setSelectNumber(e)
	}

    const votefinish = () => {
        Swal.fire(
            {
            title: '투표완료!',
            text: '투표가 완료되었습니다!',
            icon: 'success',
            confirmButtonText: 'Back',
            footer: `<button onClick={console.log('눌림')}>투표결과보기</button>`
        })
    }
	
	return (
		<div className='walletCard'>
		<h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
			<button>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
			<div>
				<p>==========================</p>
				<input type="checkbox" value="1" onChange={(e)=>changeNumber(e.target.value)}/> 1번
				<input type="checkbox" value="2" onChange={(e)=>changeNumber(e.target.value)}/> 2번
				<input type="checkbox" value="3" onChange={(e)=>changeNumber(e.target.value)}/> 3번
			</div>
			{selectNumber}
			<div>
                <button onClick={votefinish}>
                    투표완료
                </button>
            </div>
		</div>
	);
}

export default WalletCard;