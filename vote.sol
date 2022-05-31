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
    uint256 private _initial = 1;
    // 투표한 내용
    mapping(uint256=> mapping(address => uint256)) private vnum;
    // 투표 별 받은 표의 수
    mapping(uint256 => mapping(uint256 => uint256)) vcount;

    // 관리자 확인 modifier

    modifier onlyOwner{
        require(msg.sender == owner, "using onlyonwer");
        _;
    }

    // 투표 함수
    function toVote(uint256 _num) public {
        require(vnum[_initial][msg.sender] == 0, "you already vote");
        require(isvalidVote(_num), "you can vote 1, 2, 3");
        vnum[_initial][msg.sender] = _num;
        vcount[_initial][_num]++;
        for(uint256 i = 0; i < voteCountArray.length; i++) {
            voteCountArray[i] = vcount[_initial][i + 1];
        }
    }

    

    // 투표 결과 호출
    function checkVoteCount() public view onlyOwner returns(uint256[3] memory) {
        require(msg.sender == owner, "using onlyonwer");
        return voteCountArray;
    }

    // 투표 결과 초기화 함수
    function resultVote() public onlyOwner returns(uint256[3] memory) {
        _initial++;
        for(uint256 i = 0; i < voteCountArray.length; i++) {
            voteCountArray[i] = 0;
        }
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