// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

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
    ) external onlyAuthorized {
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