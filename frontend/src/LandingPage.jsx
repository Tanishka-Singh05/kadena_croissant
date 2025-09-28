import React from 'react';
import { motion } from 'framer-motion';

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

const LandingPage = ({ onConnect, isConnecting }) => {
  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-primary-50 via-secondary-light to-primary-100 overflow-y-scroll snap-y snap-mandatory hide-scrollbar"
      style={{
        scrollBehavior: 'smooth',
        height: '100vh',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Section 1: Croissant */}
      <section
        id="croissant"
        className="h-screen flex flex-col items-center justify-center snap-center"
        style={{ minHeight: '100vh', scrollSnapAlign: 'center' }}
      >
        <motion.h1
          className="text-7xl md:text-9xl font-bold text-gradient mb-8"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          croissant
        </motion.h1>
        <button
          className="mt-12 px-6 py-2 bg-primary-600 text-white rounded-md text-lg font-medium shadow-md hover:bg-primary-700 transition-all duration-200"
          onClick={() => scrollToSection('privacy')}
        >
          ↓
        </button>
      </section>

      {/* Section 2: Privacy Info */}
      <section
        id="privacy"
        className="h-screen flex flex-col items-center justify-center snap-center"
        style={{ minHeight: '100vh', scrollSnapAlign: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-primary-700 text-center max-w-6xl">
            Privacy-preserving, multi-chain reputation system
            built on Kadena's Chainweb. Prove your cross-domain expertise without revealing your transaction history.
          </h2>
          <button
            className="mt-8 px-6 py-2 bg-primary-600 text-white rounded-md text-lg font-medium shadow-md hover:bg-primary-700 transition-all duration-200"
            onClick={() => scrollToSection('getrep')}
          >
            ↓
          </button>
        </motion.div>
      </section>

      {/* Section 3: Get Your Rep */}
      <section
        id="getrep"
        className="h-screen flex flex-col items-center justify-center snap-center"
        style={{ minHeight: '100vh', scrollSnapAlign: 'center' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <button
            className="px-8 py-3 bg-primary-600 text-white rounded-md text-xl font-bold shadow-lg hover:bg-primary-700 transition-all duration-200"
            onClick={onConnect}
            disabled={isConnecting}
          >
            {isConnecting ? 'Connecting...' : 'get your rep'}
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
