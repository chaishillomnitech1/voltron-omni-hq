// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title InheritanceVault
 * @dev Smart contract for managing asset inheritance and distribution
 * Features: Beneficiary management, time-locked releases, and multi-asset support
 */

contract InheritanceVault {
    // ============ State Variables ============
    
    address public owner;
    uint256 public createdAt;
    bool public isActive;
    
    struct Beneficiary {
        address walletAddress;
        uint256 percentage; // Percentage of assets (0-100)
        uint256 releaseTime; // Unix timestamp when assets can be claimed
        bool claimed;
        string name;
    }
    
    struct Asset {
        address tokenAddress; // Address of token (0x0 for ETH)
        uint256 amount;
        string assetType; // "ETH", "ERC20", "NFT"
    }
    
    mapping(uint256 => Beneficiary) public beneficiaries;
    mapping(address => uint256) public beneficiaryIndex;
    uint256 public beneficiaryCount;
    
    Asset[] public assets;
    
    uint256 public inactivityThreshold = 365 days; // 1 year
    uint256 public lastActivityTime;
    
    // Events
    event BeneficiaryAdded(address indexed beneficiary, uint256 percentage, uint256 releaseTime);
    event BeneficiaryRemoved(address indexed beneficiary);
    event AssetDeposited(address indexed tokenAddress, uint256 amount, string assetType);
    event AssetClaimed(address indexed beneficiary, uint256 amount);
    event VaultActivated(address indexed owner);
    event InheritanceTriggered(address indexed owner);
    
    // ============ Constructor ============
    
    constructor() {
        owner = msg.sender;
        createdAt = block.timestamp;
        lastActivityTime = block.timestamp;
        isActive = true;
    }
    
    // ============ Modifiers ============
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }
    
    modifier onlyBeneficiary() {
        require(beneficiaryIndex[msg.sender] > 0 || beneficiaries[beneficiaryIndex[msg.sender]].walletAddress == msg.sender, "Not a beneficiary");
        _;
    }
    
    // ============ Owner Functions ============
    
    function addBeneficiary(
        address _beneficiary,
        uint256 _percentage,
        uint256 _releaseTime,
        string memory _name
    ) external onlyOwner {
        require(_percentage > 0 && _percentage <= 100, "Invalid percentage");
        require(_beneficiary != address(0), "Invalid address");
        
        beneficiaryCount++;
        beneficiaries[beneficiaryCount] = Beneficiary({
            walletAddress: _beneficiary,
            percentage: _percentage,
            releaseTime: _releaseTime,
            claimed: false,
            name: _name
        });
        
        beneficiaryIndex[_beneficiary] = beneficiaryCount;
        lastActivityTime = block.timestamp;
        
        emit BeneficiaryAdded(_beneficiary, _percentage, _releaseTime);
    }
    
    function removeBeneficiary(address _beneficiary) external onlyOwner {
        uint256 index = beneficiaryIndex[_beneficiary];
        require(index > 0, "Beneficiary not found");
        
        delete beneficiaries[index];
        delete beneficiaryIndex[_beneficiary];
        lastActivityTime = block.timestamp;
        
        emit BeneficiaryRemoved(_beneficiary);
    }
    
    function depositETH() external payable onlyOwner {
        require(msg.value > 0, "Must send ETH");
        
        assets.push(Asset({
            tokenAddress: address(0),
            amount: msg.value,
            assetType: "ETH"
        }));
        
        lastActivityTime = block.timestamp;
        emit AssetDeposited(address(0), msg.value, "ETH");
    }
    
    function depositERC20(address _tokenAddress, uint256 _amount) external onlyOwner {
        require(_tokenAddress != address(0), "Invalid token address");
        require(_amount > 0, "Invalid amount");
        
        assets.push(Asset({
            tokenAddress: _tokenAddress,
            amount: _amount,
            assetType: "ERC20"
        }));
        
        lastActivityTime = block.timestamp;
        emit AssetDeposited(_tokenAddress, _amount, "ERC20");
    }
    
    function updateActivity() external onlyOwner {
        lastActivityTime = block.timestamp;
    }
    
    // ============ Beneficiary Functions ============
    
    function claimInheritance() external onlyBeneficiary {
        uint256 index = beneficiaryIndex[msg.sender];
        Beneficiary storage beneficiary = beneficiaries[index];
        
        require(!beneficiary.claimed, "Already claimed");
        require(block.timestamp >= beneficiary.releaseTime, "Not yet eligible");
        require(isActive || (block.timestamp >= lastActivityTime + inactivityThreshold), "Vault still active");
        
        beneficiary.claimed = true;
        
        // Calculate beneficiary's share
        uint256 totalValue = getTotalVaultValue();
        uint256 beneficiaryShare = (totalValue * beneficiary.percentage) / 100;
        
        // Distribute ETH
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i].tokenAddress == address(0)) {
                uint256 ethShare = (assets[i].amount * beneficiary.percentage) / 100;
                payable(msg.sender).transfer(ethShare);
                emit AssetClaimed(msg.sender, ethShare);
            }
        }
    }
    
    // ============ View Functions ============
    
    function getBeneficiary(uint256 _index) external view returns (Beneficiary memory) {
        return beneficiaries[_index];
    }
    
    function getBeneficiaryCount() external view returns (uint256) {
        return beneficiaryCount;
    }
    
    function getAssets() external view returns (Asset[] memory) {
        return assets;
    }
    
    function getTotalVaultValue() public view returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < assets.length; i++) {
            if (assets[i].tokenAddress == address(0)) {
                total += assets[i].amount;
            }
        }
        return total;
    }
    
    function isInheritanceTriggered() external view returns (bool) {
        return !isActive || (block.timestamp >= lastActivityTime + inactivityThreshold);
    }
    
    function getTimeUntilInheritance() external view returns (uint256) {
        if (!isActive) return 0;
        uint256 timeElapsed = block.timestamp - lastActivityTime;
        if (timeElapsed >= inactivityThreshold) return 0;
        return inactivityThreshold - timeElapsed;
    }
    
    // ============ Emergency Functions ============
    
    function emergencyWithdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
    
    function deactivateVault() external onlyOwner {
        isActive = false;
        emit InheritanceTriggered(owner);
    }
    
    // ============ Receive Function ============
    
    receive() external payable {
        emit AssetDeposited(address(0), msg.value, "ETH");
    }
}
