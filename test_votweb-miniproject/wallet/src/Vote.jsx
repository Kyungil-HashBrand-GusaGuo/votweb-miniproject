import React, { useState } from 'react'
import { ethers } from 'ethers'
import Web3 from 'web3';


const Vote = () => {
    const [voteNum, setvoteNum] = useState(0);

    const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8001"))
    const abi = '[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"checkVoteCount","outputs":[{"internalType":"uint256[3]","name":"","type":"uint256[3]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_num","type":"uint256"}],"name":"toVote","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"voteArray","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]';
    const voteContractFractory = web3.eth.contract(JSON.parse(abi));
    const voteContractInstance = voteContractFractory.at('0x8a5012e9c2e085ef81bf819de6abcd83a8b887a3');

    const changeHandler = (e) => {
        console.log(e.target.value);
        setvoteNum(e.target.value);
    }
    const sumbitVote = () => {

        console.log('voteNum is ' + voteNum);
    }
    
    return (
        <div className='Vote'>
            <p>1,2,3 중 투표를 해주세요</p>
            <input type="number" min='1' max='3' onChange={changeHandler}></input>
            <button onClick={sumbitVote}> 투표하기</button>
        </div>
    );
}

export default Vote;