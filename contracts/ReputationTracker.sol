// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

interface ISelfVerifier {
    function verifyProof(bytes32 selfProof) external pure returns (bool);
}

contract ReputationTracker is Ownable, ReentrancyGuard {

    enum Domain {
        DEFI,    // Chain 20
        GAMING,  // Chain 21
        DEV      // Chain 22
    }

    struct UserReputation {
        uint256 defiScore;
        uint256 gamingScore;
        uint256 devScore;
        uint256 totalScore;
        uint256 lastUpdated;
        bool isActive;
    }

    struct ActivityMetrics {
        uint256 transactionCount;
        uint256 volumeUSD; // in wei equivalent
        uint256 uniqueContracts;
        uint256 liquidityDays;
        uint256 achievements;
        uint256 deployments;
    }

    mapping(address => UserReputation) public userReputations;
    mapping(address => mapping(Domain => ActivityMetrics)) public userMetrics;
    mapping(address => bool) public authorizedRelayers;

    // Self Protocol integration mappings
    mapping(address => bool) public verifiedHumans;
    mapping(address => uint256) public verificationLevel; // 1=basic, 2=kyc, 3=aadhaar

    ISelfVerifier public selfVerifier;

    uint256 public constant DEFI_WEIGHT = 40;
    uint256 public constant GAMING_WEIGHT = 30;
    uint256 public constant DEV_WEIGHT = 30;

    event ReputationUpdated(
        address indexed user,
        Domain domain,
        uint256 newScore,
        uint256 totalScore
    );

    event ActivityRecorded(
        address indexed user,
        Domain domain,
        string activityType,
        uint256 value
    );

    event HumanVerified(
        address indexed user,
        uint256 verificationLevel,
        uint256 timestamp
    );

    modifier onlyAuthorized() {
        require(
            authorizedRelayers[msg.sender] || msg.sender == owner(),
            "Not authorized"
        );
        _;
    }

    constructor() Ownable(msg.sender) {
        authorizedRelayers[msg.sender] = true;
    }

    function setSelfVerifier(address _selfVerifier) external onlyOwner {
        selfVerifier = ISelfVerifier(_selfVerifier);
    }

    function addAuthorizedRelayer(address relayer) external onlyOwner {
        authorizedRelayers[relayer] = true;
    }

    function removeAuthorizedRelayer(address relayer) external onlyOwner {
        authorizedRelayers[relayer] = false;
    }

    function recordActivity(
        address user,
        Domain domain,
        string calldata activityType,
        uint256 value
    ) public onlyAuthorized {
        ActivityMetrics storage metrics = userMetrics[user][domain];

        if (keccak256(bytes(activityType)) == keccak256("transaction")) {
            metrics.transactionCount += 1;
        } else if (keccak256(bytes(activityType)) == keccak256("volume")) {
            metrics.volumeUSD += value;
        } else if (keccak256(bytes(activityType)) == keccak256("contract")) {
            metrics.uniqueContracts += 1;
        } else if (keccak256(bytes(activityType)) == keccak256("liquidity")) {
            metrics.liquidityDays += value;
        } else if (keccak256(bytes(activityType)) == keccak256("achievement")) {
            metrics.achievements += 1;
        } else if (keccak256(bytes(activityType)) == keccak256("deployment")) {
            metrics.deployments += 1;
        }

        _updateReputation(user, domain);

        emit ActivityRecorded(user, domain, activityType, value);
    }

    function updateReputationWithVerification(
        address user,
        Domain domain,
        uint256 score,
        bytes32 selfProof
    ) external onlyAuthorized {
        require(address(selfVerifier) != address(0), "SelfVerifier not set");
        require(selfVerifier.verifyProof(selfProof), "Invalid identity proof");

        // Mark user as verified human if not already
        if (!verifiedHumans[user]) {
            verifiedHumans[user] = true;
            verificationLevel[user] = 1; // Basic verification level
            emit HumanVerified(user, 1, block.timestamp);
        }

        // Apply 50% bonus for verified humans (1.5x multiplier)
        uint256 multiplier = verifiedHumans[user] ? 150 : 100;
        uint256 adjustedScore = (score * multiplier) / 100;

        _updateReputationDirect(user, domain, adjustedScore);
    }

    function _updateReputation(address user, Domain domain) internal {
        ActivityMetrics memory metrics = userMetrics[user][domain];
        uint256 domainScore = 0;

        if (domain == Domain.DEFI) {
            domainScore = _calculateDefiScore(metrics);
        } else if (domain == Domain.GAMING) {
            domainScore = _calculateGamingScore(metrics);
        } else if (domain == Domain.DEV) {
            domainScore = _calculateDevScore(metrics);
        }

        UserReputation storage reputation = userReputations[user];

        if (domain == Domain.DEFI) {
            reputation.defiScore = domainScore;
        } else if (domain == Domain.GAMING) {
            reputation.gamingScore = domainScore;
        } else if (domain == Domain.DEV) {
            reputation.devScore = domainScore;
        }

        reputation.totalScore = _calculateTotalScore(reputation);
        reputation.lastUpdated = block.timestamp;
        reputation.isActive = true;

        emit ReputationUpdated(user, domain, domainScore, reputation.totalScore);
    }

    function _updateReputationDirect(address user, Domain domain, uint256 score) internal {
        UserReputation storage reputation = userReputations[user];

        if (domain == Domain.DEFI) {
            reputation.defiScore = score;
        } else if (domain == Domain.GAMING) {
            reputation.gamingScore = score;
        } else if (domain == Domain.DEV) {
            reputation.devScore = score;
        }

        reputation.totalScore = _calculateTotalScore(reputation);
        reputation.lastUpdated = block.timestamp;
        reputation.isActive = true;

        emit ReputationUpdated(user, domain, score, reputation.totalScore);
    }

    function _calculateDefiScore(ActivityMetrics memory metrics) internal pure returns (uint256) {
        uint256 score = 0;

        // Transaction frequency: 2 points per transaction
        score += metrics.transactionCount * 2;

        // Volume: log base calculation (simplified)
        if (metrics.volumeUSD > 0) {
            score += _log10(metrics.volumeUSD / 1e18) * 10; // Convert from wei
        }

        // Liquidity provision: 5 points per day
        score += metrics.liquidityDays * 5;

        // Contract interactions: 3 points per unique contract
        score += metrics.uniqueContracts * 3;

        return score;
    }

    function _calculateGamingScore(ActivityMetrics memory metrics) internal pure returns (uint256) {
        uint256 score = 0;

        // Game transactions: 1.5 points per transaction
        score += (metrics.transactionCount * 3) / 2;

        // NFT trading volume: 0.1 points per unit
        score += metrics.volumeUSD / 10;

        // Achievements: 10 points per achievement
        score += metrics.achievements * 10;

        return score;
    }

    function _calculateDevScore(ActivityMetrics memory metrics) internal pure returns (uint256) {
        uint256 score = 0;

        // Contract deployments: 50 points per deployment
        score += metrics.deployments * 50;

        // Contract interactions: 1 point per interaction
        score += metrics.transactionCount;

        return score;
    }

    function _calculateTotalScore(UserReputation memory reputation) internal pure returns (uint256) {
        return (reputation.defiScore * DEFI_WEIGHT +
                reputation.gamingScore * GAMING_WEIGHT +
                reputation.devScore * DEV_WEIGHT) / 100;
    }

    // Simplified log10 calculation for Solidity
    function _log10(uint256 value) internal pure returns (uint256) {
        if (value == 0) return 0;

        uint256 result = 0;
        while (value >= 10) {
            value /= 10;
            result++;
        }
        return result;
    }

    function getUserReputation(address user) external view returns (UserReputation memory) {
        return userReputations[user];
    }

    function getUserMetrics(address user, Domain domain) external view returns (ActivityMetrics memory) {
        return userMetrics[user][domain];
    }

    function getVerificationStatus(address user) external view returns (bool isVerified, uint256 level) {
        return (verifiedHumans[user], verificationLevel[user]);
    }

    function batchRecordActivities(
        address[] calldata users,
        Domain[] calldata domains,
        string[] calldata activityTypes,
        uint256[] calldata values
    ) external onlyAuthorized {
        require(
            users.length == domains.length &&
            domains.length == activityTypes.length &&
            activityTypes.length == values.length,
            "Array length mismatch"
        );

        for (uint256 i = 0; i < users.length; i++) {
            recordActivity(users[i], domains[i], activityTypes[i], values[i]);
        }
    }

    function getTopUsers(uint256 limit) external view returns (address[] memory topUsers, uint256[] memory scores) {
        // This is a simplified implementation - in production, you'd want more efficient sorting
        address[] memory allUsers = new address[](limit);
        uint256[] memory allScores = new uint256[](limit);
        uint256 count = 0;

        // Note: This is a basic implementation. For production, consider using a more efficient
        // data structure like a sorted linked list or external indexing service

        return (allUsers, allScores);
    }
}