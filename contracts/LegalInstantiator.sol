pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';
import './LegalAgreement.sol';


contract LegalInstantiator is Destructible {

    address public builder;

    function create(
        uint _deadline,
        uint _reward,
        uint _deposit,
        address[] _oracles
        ) returns (address) 
    {
        //require(msg.sender == builder);

        return new Ownable();
    }

    function setBuilder(address _builder) onlyOwner {
        builder = _builder;
    }

    function abi() constant returns (string) {
        return "abi";
    }
}
