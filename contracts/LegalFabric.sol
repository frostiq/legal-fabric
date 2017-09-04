pragma solidity ^0.4.15;

import './Builder.sol';


contract LegalFabric is Builder {
        /**
     * @dev Run script creation contract
     * @return address new contract
     */
    function create(
        uint _deadline,
        uint _reward,
        uint _deposit,
        address[] _oracles,
        address _client
        ) payable returns (address) 
    {
        require(_deadline > now);
        require(msg.value == buildingCostWei);
        
        if (_client == 0x0)
            _client = msg.sender;
        
        beneficiary.transfer(msg.value);

        var inst = new Ownable(); //TODO: replace with legal contract creation

        getContractsOf[_client].push(inst);
        Builded(_client, inst);
        inst.transferOwnership(_client);

        return inst;
    }
}
