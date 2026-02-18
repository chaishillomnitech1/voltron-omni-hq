// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title LyricPlaqueNFT
 * @dev ERC-721 NFT contract for ScrollSoul Nexus Lyric Plaques
 * Features: Minting, royalty tracking, metadata storage, and transfer management
 */

interface IERC165 {
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

interface IERC721 is IERC165 {
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function transferFrom(address from, address to, uint256 tokenId) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
}

contract LyricPlaqueNFT is IERC721 {
    // ============ State Variables ============
    
    string public constant NAME = "ScrollSoul Lyric Plaque";
    string public constant SYMBOL = "LYRIC";
    uint256 public constant ROYALTY_PERCENTAGE = 10; // 10% royalty
    
    address public owner;
    uint256 public totalSupply;
    
    // Token metadata
    struct TokenMetadata {
        string title;
        string artist;
        string lyrics;
        uint256 frequency; // Sacred frequency (528, 963, 432 Hz, etc.)
        uint256 createdAt;
        address creator;
        uint256 royaltyBalance;
    }
    
    // Token ownership
    mapping(uint256 => address) public tokenOwner;
    mapping(address => uint256) public balances;
    mapping(uint256 => TokenMetadata) public tokenMetadata;
    mapping(uint256 => address) public tokenApprovals;
    mapping(address => mapping(address => bool)) public operatorApprovals;
    
    // Royalty tracking
    mapping(address => uint256) public royaltyEarnings;
    mapping(uint256 => uint256) public tokenRoyaltyBalance;
    
    // Events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event TokenMinted(uint256 indexed tokenId, address indexed creator, string title);
    event RoyaltyPaid(uint256 indexed tokenId, address indexed creator, uint256 amount);
    
    // ============ Constructor ============
    
    constructor() {
        owner = msg.sender;
        totalSupply = 0;
    }
    
    // ============ ERC-721 Implementation ============
    
    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId == 0x80ac58cd || interfaceId == 0x01ffc9a7;
    }
    
    function balanceOf(address _owner) external view returns (uint256) {
        require(_owner != address(0), "Invalid address");
        return balances[_owner];
    }
    
    function ownerOf(uint256 _tokenId) external view returns (address) {
        address tokenOwnerAddress = tokenOwner[_tokenId];
        require(tokenOwnerAddress != address(0), "Token does not exist");
        return tokenOwnerAddress;
    }
    
    function transferFrom(address _from, address _to, uint256 _tokenId) external {
        require(_from != address(0) && _to != address(0), "Invalid address");
        require(tokenOwner[_tokenId] == _from, "Not token owner");
        require(msg.sender == _from || msg.sender == tokenApprovals[_tokenId] || operatorApprovals[_from][msg.sender], "Not approved");
        
        // Handle royalty payment on transfer
        if (tokenRoyaltyBalance[_tokenId] > 0) {
            uint256 royaltyAmount = tokenRoyaltyBalance[_tokenId];
            address creator = tokenMetadata[_tokenId].creator;
            
            royaltyEarnings[creator] += royaltyAmount;
            tokenRoyaltyBalance[_tokenId] = 0;
            
            emit RoyaltyPaid(_tokenId, creator, royaltyAmount);
        }
        
        // Update ownership
        balances[_from]--;
        balances[_to]++;
        tokenOwner[_tokenId] = _to;
        tokenApprovals[_tokenId] = address(0);
        
        emit Transfer(_from, _to, _tokenId);
    }
    
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external {
        transferFrom(_from, _to, _tokenId);
    }
    
    function approve(address _approved, uint256 _tokenId) external {
        address owner = tokenOwner[_tokenId];
        require(msg.sender == owner || operatorApprovals[owner][msg.sender], "Not authorized");
        
        tokenApprovals[_tokenId] = _approved;
        emit Approval(owner, _approved, _tokenId);
    }
    
    function setApprovalForAll(address _operator, bool _approved) external {
        operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }
    
    // ============ Minting ============
    
    function mint(
        string memory _title,
        string memory _artist,
        string memory _lyrics,
        uint256 _frequency
    ) external returns (uint256) {
        uint256 tokenId = totalSupply++;
        
        tokenOwner[tokenId] = msg.sender;
        balances[msg.sender]++;
        
        tokenMetadata[tokenId] = TokenMetadata({
            title: _title,
            artist: _artist,
            lyrics: _lyrics,
            frequency: _frequency,
            createdAt: block.timestamp,
            creator: msg.sender,
            royaltyBalance: 0
        });
        
        emit Transfer(address(0), msg.sender, tokenId);
        emit TokenMinted(tokenId, msg.sender, _title);
        
        return tokenId;
    }
    
    // ============ Royalty Management ============
    
    function recordSale(uint256 _tokenId, uint256 _salePrice) external {
        require(tokenOwner[_tokenId] != address(0), "Token does not exist");
        
        uint256 royaltyAmount = (_salePrice * ROYALTY_PERCENTAGE) / 100;
        tokenRoyaltyBalance[_tokenId] += royaltyAmount;
    }
    
    function claimRoyalties() external {
        uint256 amount = royaltyEarnings[msg.sender];
        require(amount > 0, "No royalties to claim");
        
        royaltyEarnings[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }
    
    function getRoyaltyBalance(address _creator) external view returns (uint256) {
        return royaltyEarnings[_creator];
    }
    
    // ============ Metadata ============
    
    function getTokenMetadata(uint256 _tokenId) external view returns (
        string memory title,
        string memory artist,
        string memory lyrics,
        uint256 frequency,
        uint256 createdAt,
        address creator
    ) {
        require(tokenOwner[_tokenId] != address(0), "Token does not exist");
        TokenMetadata storage metadata = tokenMetadata[_tokenId];
        
        return (
            metadata.title,
            metadata.artist,
            metadata.lyrics,
            metadata.frequency,
            metadata.createdAt,
            metadata.creator
        );
    }
    
    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }
}
