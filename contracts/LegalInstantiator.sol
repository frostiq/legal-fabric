pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';
import './LegalAgreement.sol';


contract LegalInstantiator is Destructible {

    string public constant ABI = "abi";
    string public constant VERSION = "0.0.1";

    address public builder;


    function setBuilder(address _builder) onlyOwner {
        builder = _builder;
    }

    function create(
        uint _deadline,
        uint _reward,
        uint _deposit,
        address[3] _oracles,
        string _title,
        string _description
        ) returns (address) 
    {
        require(msg.sender == builder);

        return new LegalAgreement(
            _deadline, 
            _reward, 
            _deposit, 
            _oracles,
            _title,
            _description
        );
    }
}
