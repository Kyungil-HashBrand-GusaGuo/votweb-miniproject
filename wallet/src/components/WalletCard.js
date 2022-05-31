import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { ethers } from 'ethers'
import SimpleStorage_abi from '../contracts/SimpleStorage_abi.json'

import Swal from 'sweetalert2'


const WalletCard = () => {
	
	let contractAddress = '0xa72B369D2C2376D16A53B5a4E3674Ef099C872f9';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [currentContractVal, setCurrentContractVal] = useState(null);
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);

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
			updateEthers();
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

	// updateEthers
	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
	}

	const test1 = async() => {
		const response = await contract.toVote(selectNumber);
		alert("투표완료!")
		console.log(response);
	}

	const test2 = async() => {
		const response = await contract.checkVoteCount();
		console.log("1번 : ", parseInt(response[0], 16));
		console.log("2번 : ",parseInt(response[1], 16));
		console.log("3번 : ",parseInt(response[2], 16));
	}

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
		{/* <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
			<button>{connButtonText}</button> */}
			<div className='accountDisplay'>
				<h3>Address: {defaultAccount}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
				<Form onChange={(e)=>changeNumber(e.target.value)}>
					<Form.Check	label="1번"	name="voteNumber" type="radio" value="1"/>
					<Form.Check	label="2번"	name="voteNumber" type="radio" value="2"/>
					<Form.Check	label="3번"	name="voteNumber" type="radio" value="3"/>
				</Form>
			<div>
                {/* <button onClick={votefinish}>
                    투표완료
                </button> */}
                <button onClick={test1}> 투표하기 </button>
                
				{ userBalance == "0xb6e4e1888fd9ba1c005b63c0bce4329fea29f171"
				? <button onClick={test2}> 관리자권한 </button>
				: null
				}
            </div>
		</div>
	);
}

export default WalletCard;