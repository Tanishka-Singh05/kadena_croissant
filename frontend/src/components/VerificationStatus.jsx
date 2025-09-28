import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../contexts/WalletContext';
import { ethers } from 'ethers';

// Mock Self Protocol SDK for demo purposes
class MockSelfID {
  async generateProof(attributes) {
    // Simulate proof generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate a mock proof based on the requested attributes
    const mockProof = ethers.keccak256(ethers.toUtf8Bytes(
      JSON.stringify({
        ...attributes,
        timestamp: Date.now(),
        verified: true
      })
    ));

    return mockProof;
  }

  async verifyProof(proof) {
    return proof && proof !== ethers.ZeroHash;
  }
}

const VerificationStatus = ({ contractAddress, onVerificationComplete }) => {
  const { account, provider } = useWallet();
  const [isVerified, setIsVerified] = useState(false);
  const [verificationLevel, setVerificationLevel] = useState(0);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already verified
  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (!account || !contractAddress) return;

      try {
        // Mock contract call to check verification status
        // In a real implementation, this would call the actual contract
        const isVerifiedStored = localStorage.getItem(`verified_${account}`);
        const levelStored = localStorage.getItem(`verificationLevel_${account}`);

        setIsVerified(isVerifiedStored === 'true');
        setVerificationLevel(parseInt(levelStored || '0'));
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking verification status:', error);
        setIsLoading(false);
      }
    };

    checkVerificationStatus();
  }, [account, contractAddress]);

  const handleVerification = async () => {
    console.log('Verification attempt - Account:', account, 'Provider:', !!provider);

    if (!account || !provider) {
      alert('Please connect your wallet first');
      return;
    }

    setIsVerifying(true);

    try {
      // Initialize mock Self Protocol SDK
      const selfID = new MockSelfID();

      // Generate proof with required attributes
      console.log('Generating proof...');
      const proof = await selfID.generateProof({
        country: true,
        ageRange: '>18',
        sanctions: 'none',
        identity: 'passport'
      });

      console.log('Proof generated:', proof);

      // In a real implementation, this would call the contract's updateReputationWithVerification function
      // For the demo, we'll simulate the contract call and store verification status locally

      // Create signer for potential contract interaction
      const signer = await provider.getSigner();
      console.log('Signer created:', await signer.getAddress());

      // Mock contract interaction
      console.log('Simulating contract interaction...');
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store verification status locally for demo
      localStorage.setItem(`verified_${account}`, 'true');
      localStorage.setItem(`verificationLevel_${account}`, '1');

      setIsVerified(true);
      setVerificationLevel(1);

      console.log('Verification completed successfully');

      // Notify parent component
      if (onVerificationComplete) {
        onVerificationComplete({
          isVerified: true,
          level: 1,
          proof: proof
        });
      }

      alert('Identity verification successful! You now receive a 50% reputation bonus.');

    } catch (error) {
      console.error('Verification failed:', error);
      alert(`Verification failed: ${error.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const getVerificationBadges = () => {
    if (!isVerified) return null;

    return (
      <motion.div
        className="verification-badges space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            ✅ Human Verified
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            ✅ Age Compliant
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
            ✅ Geo Compliant
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            🎯 50% Bonus Active
          </span>
        </div>

        <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">
              Verification Level {verificationLevel} Active
            </span>
          </div>
          <p className="text-xs text-green-600 mt-1">
            All future reputation scores will receive a 1.5x multiplier bonus
          </p>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-6 bg-primary-200 rounded mb-4"></div>
          <div className="h-12 bg-primary-100 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-brown rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-primary-700">Identity Verification</h3>
      </div>

      <div className="space-y-4">
        {!isVerified ? (
          <div className="space-y-4">
            <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
              <h4 className="font-medium text-primary-700 mb-2">Verify Your Identity & Boost Your Reputation</h4>
              <p className="text-sm text-primary-600 mb-3">
                Complete identity verification to receive a 50% bonus on all future reputation scores.
                Your personal data remains private through zero-knowledge proofs.
              </p>
              <ul className="text-xs text-primary-600 space-y-1">
                <li>• Prove you're human without revealing identity</li>
                <li>• Verify age compliance for restricted features</li>
                <li>• Confirm geographic eligibility</li>
                <li>• Ensure sanctions compliance</li>
              </ul>
            </div>

            <motion.button
              className="btn-primary w-full"
              onClick={handleVerification}
              disabled={isVerifying}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Verifying Identity...</span>
                </div>
              ) : (
                'Verify Identity & Boost Score'
              )}
            </motion.button>
          </div>
        ) : (
          getVerificationBadges()
        )}

        {/* Domain-specific benefits */}
        {isVerified && (
          <motion.div
            className="mt-4 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm font-medium text-primary-700 mb-2">Domain Benefits</h4>
            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                <span className="text-blue-700">DeFi Trading (18+)</span>
                <span className="text-blue-600 font-medium">✓ Eligible</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded border border-purple-200">
                <span className="text-purple-700">Regional Gaming</span>
                <span className="text-purple-600 font-medium">✓ Verified</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded border border-green-200">
                <span className="text-green-700">Development (OFAC)</span>
                <span className="text-green-600 font-medium">✓ Compliant</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default VerificationStatus;