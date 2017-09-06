pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';


contract LegalAgreement is Destructible {

    uint public deadline;
    uint public reward;
    uint public deposit;
    address[3] public oracles;
  
    function LegalAgreement(
        uint _deadline,
        uint _reward,
        uint _deposit,
        address[3] _oracles) {

        require(_deadline > now);
        
        deadline = _deadline;
        reward = _reward;
        deposit = _deposit;
        oracles = _oracles;
  
    }
}
