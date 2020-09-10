// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract KingBetFactory {
    mapping(uint => address) public metaBets;

    function crateMetabet(uint betID, uint _time) public {
        KingBet metaBet = new KingBet(_time, msg.sender);
        metaBets[betID] = address(metaBet);
    }

    function getMetaBet(uint betID) public view returns (address) {
        return metaBets[betID];
    }

}

contract KingBet {
    // banker for this game
    address public banker;
    // bet end time unix timestamp
    uint public betEndtime;
    // name of game
    string public name;
    // Bet of player
    struct Bet{
        address payable player; // plyaer
        uint price; // price of bet
    }
    // found of left team
    Bet[] public leftTeamFound;
    // found of right team
    Bet[] public rightTeamFound;
    // bet is ended
    // total found
    uint public totalLeftFound;
    uint public totalRightFound;
    bool ended;

    constructor (uint _time, address _banker) public {
        banker = _banker;
        betEndtime = _time;
    }

    function bet(uint _team) public payable {
        require(block.timestamp < betEndtime, "this bet is end");
        require(msg.value > 0.01 ether, "must > 0.01 ether");
        require(msg.sender.balance > msg.value);
        require(ended == false, "bet is ended");
        if (_team == 1) {
            leftTeamFound.push(Bet({
                player: msg.sender,
                price: msg.value
            }));
            totalLeftFound += msg.value;
        } else {
            rightTeamFound.push(Bet({
                player: msg.sender,
                price: msg.value
            }));
            totalRightFound += msg.value;
        }
    }

    // banker is blink
    function lottery(uint _winner) public {
        require(msg.sender == banker, "must be banker");
        require(totalLeftFound > 0);
        require(totalRightFound > 0);
        require(ended == false);
        uint tip = 0;
        uint winners_tip = 0;
        uint losers_tip = 0;
        uint totalWinner = 0;
        uint totalLoser = 0;
        Bet[] memory winners = leftTeamFound;
        if (_winner == 1) {
            totalWinner = totalLeftFound;
            totalLoser = totalRightFound;
        } else {
            totalWinner = totalRightFound;
            totalLoser = totalRightFound;
            winners = rightTeamFound;
        }
        winners_tip = calcTip(totalWinner);
        losers_tip = calcTip(totalLoser);
        totalWinner -= winners_tip;
        totalLoser -= losers_tip;
        tip = winners_tip + losers_tip; 
        // pay for winner player
        for (uint i = 0; i < winners.length; i++){
            uint _bet = winners[i].price;
            _bet -= calcTip(_bet);
            uint lottery_price = _bet + (_bet * (totalLoser / totalWinner));
            winners[i].player.transfer(lottery_price);
        }
        ended = true;
        // tip for banker
        msg.sender.transfer(tip);
    }

    function refound() public {
        require(msg.sender == banker, "must be banker");
        for (uint i = 0; i < leftTeamFound.length; i++){
            leftTeamFound[i].player.transfer(leftTeamFound[i].price);
        }
        for (uint i = 0; i < rightTeamFound.length; i++){
            rightTeamFound[i].player.transfer(rightTeamFound[i].price);
        }
        ended = true;
    }

    function getBalance() public view returns (uint) {
        uint total = totalLeftFound + totalRightFound;
        return total;
    }

    function getRightBalance() public view returns (uint) {
        return totalLeftFound;
    }

    function getLeftBalance() public view returns (uint) {
        return totalRightFound;
    }

    function getLeftCount() public view returns (uint) {
        return leftTeamFound.length;
    }

    function getRightCount() public view returns (uint) {
        return rightTeamFound.length;
    }

    function calcTip(uint totalWinner) private pure returns(uint){
        uint tip = totalWinner * 2 / 100;
        return tip;
    }
}