pragma solidity ^0.4.15;

import './Builder.sol';
import './LegalInstantiator.sol';
import './LegalAgreement.sol';


contract LegalFabric is Builder {

    LegalInstantiator public instantiator;

    function LegalFabric(uint _buildingCostWei, address _beneficiary, LegalInstantiator _instantiator)
        Builder(_buildingCostWei, _beneficiary)
    {
        require(address(_instantiator) != 0x0);
        instantiator = _instantiator;
    }

    /**
    * @dev Run script creation contract
    * @return address new contract
    */
    function create(
        uint _deadline,
        uint _reward,
        uint _deposit,
        address[3] _oracles,
        address _client
        ) payable returns (address) 
    {
        require(msg.value == buildingCostWei);
        
        if (_client == 0x0)
            _client = msg.sender;
        
        beneficiary.transfer(msg.value);

        // address inst = instantiator.create(
        //     _deadline, 
        //     _reward, 
        //     _deposit, 
        //     _oracles
        // );

        address inst = new LegalAgreement(
            _deadline, 
            _reward, 
            _deposit, 
            _oracles
        );

        getContractsOf[_client].push(inst);
        Builded(_client, inst);
        Ownable(inst).transferOwnership(_client);

        return inst;
    }
    
    function setInstantiator(LegalInstantiator _instantiator) onlyOwner {
        require(address(_instantiator) != 0x0);
        instantiator = _instantiator;
    }
}
