pragma solidity ^0.4.15;


contract LegalAgreement {

    uint public deadline;
    uint public reward;
    uint public deposit;
    address public implementer;
    address public customer;

    struct Approval {
        address oracle;
        string justification;
    }

    address[3] public oracles;
    mapping (address => uint) public approveIndex;
    Approval[] public approvals;

    event Approved(address oracle, string justification);
    event Fulfilled();

    enum State { Prepairing, Implementing, Fulfilled, Failed }
  
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

    function setImplementer() payable {
        require(implementer == 0x0 && msg.value == deposit);
        implementer = msg.sender;
    }

    function setCustomer() payable {
        require(customer == 0x0 && msg.value == reward);
        customer = msg.sender;
    }

    function cancel() at(State.Prepairing) {
        uint amount;
        if (msg.sender == implementer) {
            amount = deposit;
            deposit = 0;
            msg.sender.transfer(amount);
        } else if (msg.sender == customer) {
            amount = reward;
            reward = 0;
            msg.sender.transfer(amount);
        } else {
            revert();
        }
    }

    function approve(string justification) onlyOracle at(State.Implementing) returns (uint index) {
        index = approveIndex[msg.sender];
        var approval = Approval(msg.sender, justification);
        if (index == 0) {
            index = approvals.length;
            approveIndex[msg.sender] = index;
            approvals.push(approval);
        } else {
            approvals[index] = approval;
        }

        Approved(msg.sender, justification);
    }

    function finalize() {
        State state = getState();

        if (state == State.Fulfilled) {
            implementer.transfer(this.balance);
        } else if (state == State.Failed) {
            customer.transfer(this.balance);
        } else {
            revert();
        }
    }

    function isApproved() constant returns (bool) {
        return approvals.length > (oracles.length / 2);
    }

    function getState() constant returns (State) {
        if (customer == 0x0 || implementer == 0x0)
            return State.Prepairing;
        if (now < deadline)
            return State.Implementing;
        else if (isApproved())
            return State.Fulfilled;
        else
            return State.Failed;
    }

    modifier onlyOracle() {
        bool isOracle = false;
        for (uint i = 0; i < oracles.length; i++) {
            isOracle = isOracle || (msg.sender == oracles[i]);
        }
        require(isOracle);
        _;
    }

    modifier at(State _state) {
        require(getState() == _state);
        _;
    }


}
