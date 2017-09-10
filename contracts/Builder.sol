pragma solidity ^0.4.15;

import 'zeppelin-solidity/contracts/lifecycle/Destructible.sol';


contract Builder is Destructible {
    
    /* Building cost  */
    uint public buildingCostWei;

    /* Building beneficiary */
    address public beneficiary;

    function Builder(uint _buildingCostWei, address _beneficiary) {
        beneficiary = _beneficiary;
        buildingCostWei = _buildingCostWei;
    }

    /**
     * @dev this event emitted for every builded contract
     */
    event Builded(address indexed client, address indexed instance);
 
    /* Addresses builded contracts at sender */
    mapping(address => address[]) public getContractsOf;

    /**
     * @dev Get last address
     * @return last address contract
     */
    function getLastContract() constant returns (address) {
        var senderContracts = getContractsOf[msg.sender];
        return senderContracts[senderContracts.length - 1];
    }

    function getNumContracts(address client) constant returns (uint) {
        return getContractsOf[client].length;
    }

    /**
     * @dev Set beneficiary
     * @param _beneficiary is address of beneficiary
     */
    function setBeneficiary(address _beneficiary) onlyOwner {
        beneficiary = _beneficiary;
    }

    /**
     * @dev Set building cost
     * @param _buildingCostWei is cost
     */
    function setCost(uint _buildingCostWei) onlyOwner {
        buildingCostWei = _buildingCostWei;
    }
}
