import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { ethers } from 'ethers'
import SimpleStorage_abi from '../contracts/SimpleStorage_abi.json'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const WalletCard = () => {

    const navigate = useNavigate();

    const showVoteResult = () => {
        navigate("/voteresult");
    }
	
	let contractAddress = '0x438Ba079f056ba91cf510D33fEA6b6E3A7BEacea';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [finish, setFinish] = useState("");
	//const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	//const [currentContractVal, setCurrentContractVal] = useState(null);
	//const [provider, setProvider] = useState(null);
	//const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [voteNum1, setVoteNum1] = useState(0);
	const [voteNum2, setVoteNum2] = useState(0);
	const [voteNum3, setVoteNum3] = useState(0);

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			console.log('MetaMask Here!');

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
                console.log("계정주소", result)
				accountChangedHandler(result[0]);
				//setConnButtonText('Wallet Connected');
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
		//setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		//setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, SimpleStorage_abi, tempSigner);
		setContract(tempContract);	
	}

	const vote = async() => {
		const response = await contract.toVote(selectNumber);
		alert("투표완료!")
		console.log(response);
	}

	const toResult = async() => {
		const response = await contract.checkVoteCount();
		console.log(response);
		console.log("1번 : ", parseInt(response[0], 16));
		console.log("2번 : ", parseInt(response[1], 16));
		console.log("3번 : ", parseInt(response[2], 16));
		setVoteNum1(parseInt(response[0], 16));
		setVoteNum2(parseInt(response[1], 16));
		setVoteNum3(parseInt(response[2], 16));
	}

	const resetVote = async() => {
		const response = await contract.resultVote();
		console.log(response);
	}


	const readResult = () => {
		
		let readVoteResult = Math.max(voteNum1,voteNum2,voteNum3);
		console.log(readVoteResult)
		switch(readVoteResult) {
			case voteNum1 :
				setFinish("1번 당선");
				return 	resetVote()

			case voteNum2 :
				setFinish("2번 당선");
				return 	resetVote()

			case voteNum3 :
				setFinish("3번 당선");
				return 	resetVote()
			
			default :
				return "";
		}
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
            confirmButtonText: '투표결과보기',
            footer: `<button onClick={${showVoteResult()}}></button>`
        })
        
    }
	
	console.log("피니시 : ", finish);
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
                <button onClick={vote}> 투표하기 </button>
                
				{ defaultAccount == "0xb6e4e1888fd9ba1c005b63c0bce4329fea29f171"
				? <>
					<button onClick={toResult}> 관리자권한 </button>
					<button onClick={readResult}> 결과 </button>
					<p>{finish}</p>
					<p>1번 : {voteNum1} 표</p>
					<p>2번 : {voteNum2} 표</p>
					<p>3번 : {voteNum3} 표</p>
				</>
				: null
				}
				
            </div>
		</div>
	);
}

export default WalletCard;