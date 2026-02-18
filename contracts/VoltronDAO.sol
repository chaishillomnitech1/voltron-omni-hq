// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title VoltronDAO
 * @dev Decentralized Autonomous Organization for Voltron Omni-Dimensional Headquarters
 * Features: Proposal creation, voting, treasury management, and member governance
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract VoltronDAO {
    // ============ State Variables ============
    
    string public constant NAME = "Providence DAO";
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant PROPOSAL_THRESHOLD = 1e18; // 1 token minimum
    
    address public owner;
    uint256 public totalMembers;
    uint256 public treasuryBalance;
    uint256 public proposalCount;
    
    // Member tracking
    mapping(address => bool) public members;
    mapping(address => uint256) public memberVotingPower;
    
    // Proposal structure
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 createdAt;
        uint256 deadline;
        bool executed;
        bool canceled;
        mapping(address => bool) hasVoted;
        mapping(address => bool) voteChoice; // true = for, false = against
    }
    
    mapping(uint256 => Proposal) public proposals;
    
    // Events
    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);
    event MemberAdded(address indexed member, uint256 votingPower);
    event TreasuryUpdated(uint256 newBalance);
    
    // ============ Constructor ============
    
    constructor() {
        owner = msg.sender;
        members[msg.sender] = true;
        memberVotingPower[msg.sender] = 1000e18;
        totalMembers = 1;
        treasuryBalance = 0;
    }
    
    // ============ Member Management ============
    
    function addMember(address _member, uint256 _votingPower) external {
        require(msg.sender == owner, "Only owner can add members");
        require(!members[_member], "Member already exists");
        
        members[_member] = true;
        memberVotingPower[_member] = _votingPower;
        totalMembers++;
        
        emit MemberAdded(_member, _votingPower);
    }
    
    function updateVotingPower(address _member, uint256 _newPower) external {
        require(msg.sender == owner, "Only owner can update voting power");
        require(members[_member], "Member does not exist");
        
        memberVotingPower[_member] = _newPower;
    }
    
    // ============ Proposal Management ============
    
    function createProposal(
        string memory _title,
        string memory _description
    ) external returns (uint256) {
        require(members[msg.sender], "Only members can create proposals");
        require(memberVotingPower[msg.sender] >= PROPOSAL_THRESHOLD, "Insufficient voting power");
        
        uint256 proposalId = proposalCount++;
        Proposal storage proposal = proposals[proposalId];
        
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.title = _title;
        proposal.description = _description;
        proposal.createdAt = block.timestamp;
        proposal.deadline = block.timestamp + VOTING_PERIOD;
        proposal.votesFor = 0;
        proposal.votesAgainst = 0;
        proposal.executed = false;
        proposal.canceled = false;
        
        emit ProposalCreated(proposalId, msg.sender, _title);
        return proposalId;
    }
    
    function castVote(uint256 _proposalId, bool _support) external {
        require(members[msg.sender], "Only members can vote");
        require(_proposalId < proposalCount, "Invalid proposal ID");
        
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp <= proposal.deadline, "Voting period ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(!proposal.executed && !proposal.canceled, "Proposal not active");
        
        uint256 votingPower = memberVotingPower[msg.sender];
        
        proposal.hasVoted[msg.sender] = true;
        proposal.voteChoice[msg.sender] = _support;
        
        if (_support) {
            proposal.votesFor += votingPower;
        } else {
            proposal.votesAgainst += votingPower;
        }
        
        emit VoteCast(_proposalId, msg.sender, _support, votingPower);
    }
    
    function executeProposal(uint256 _proposalId) external {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        
        Proposal storage proposal = proposals[_proposalId];
        require(block.timestamp > proposal.deadline, "Voting still active");
        require(!proposal.executed, "Already executed");
        require(!proposal.canceled, "Proposal canceled");
        require(proposal.votesFor > proposal.votesAgainst, "Proposal did not pass");
        
        proposal.executed = true;
        
        emit ProposalExecuted(_proposalId);
    }
    
    function getProposalDetails(uint256 _proposalId) external view returns (
        address proposer,
        string memory title,
        string memory description,
        uint256 votesFor,
        uint256 votesAgainst,
        uint256 deadline,
        bool executed
    ) {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        Proposal storage proposal = proposals[_proposalId];
        
        return (
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.deadline,
            proposal.executed
        );
    }
    
    // ============ Treasury Management ============
    
    function depositToTreasury() external payable {
        require(msg.value > 0, "Deposit amount must be greater than 0");
        treasuryBalance += msg.value;
        emit TreasuryUpdated(treasuryBalance);
    }
    
    function withdrawFromTreasury(address payable _recipient, uint256 _amount) external {
        require(msg.sender == owner, "Only owner can withdraw");
        require(_amount <= treasuryBalance, "Insufficient treasury balance");
        
        treasuryBalance -= _amount;
        _recipient.transfer(_amount);
        emit TreasuryUpdated(treasuryBalance);
    }
    
    // ============ View Functions ============
    
    function isMember(address _address) external view returns (bool) {
        return members[_address];
    }
    
    function getVotingPower(address _member) external view returns (uint256) {
        return memberVotingPower[_member];
    }
    
    function hasVoted(uint256 _proposalId, address _member) external view returns (bool) {
        require(_proposalId < proposalCount, "Invalid proposal ID");
        return proposals[_proposalId].hasVoted[_member];
    }
    
    function getTreasuryBalance() external view returns (uint256) {
        return treasuryBalance;
    }
}
