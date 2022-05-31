// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract vote {

    address public owner;

    // 관리자 생성

    constructor() {
        owner = msg.sender;
}

    uint256[3] public voteArray = [1, 2, 3];
    uint256[3] voteCountArray;

    // 투표한 내용
    mapping(address=> uint256) private vnum;
    // 투표 별 받은 표의 수
    mapping(uint256 => uint256) vcount;

    // 투표 함수
    function toVote(uint256 _num) public {
        require(vnum[msg.sender] == 0, "you already vote");
        require(isvalidVote(_num), "you can vote 1, 2, 3");
        vnum[msg.sender] = _num;
        vcount[_num]++;
        for(uint256 i = 0; i < voteCountArray.length; i++) {
            voteCountArray[i] = vcount[i + 1];
        }
    }


    // 투표 결과 호출
    function checkVoteCount() public view returns(uint256[3] memory) {
        require(msg.sender == owner, "using onlyonwer");
        return voteCountArray;
    }


    // 중복 투표 방지 함수
    function isvalidVote(uint256 _num) internal view returns(bool) {
        for(uint256 i = 0; i < voteArray.length; i++) {
            if(voteArray[i] == _num) {
                return true;
            } 
        }
            return false;
    }
}