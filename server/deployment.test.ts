import { describe, it, expect } from 'vitest';
import { ethers } from 'ethers';

describe('Deployment Configuration', () => {
  it('should validate Sepolia RPC endpoint', async () => {
    const rpcUrl = process.env.SEPOLIA_RPC_URL;
    expect(rpcUrl).toBeDefined();
    expect(rpcUrl).toContain('eth-sepolia');

    try {
      const provider = new ethers.JsonRpcProvider(rpcUrl);
      const blockNumber = await provider.getBlockNumber();
      expect(blockNumber).toBeGreaterThan(0);
      console.log(`✅ Sepolia RPC connected. Current block: ${blockNumber}`);
    } catch (error) {
      throw new Error(`Failed to connect to Sepolia RPC: ${error}`);
    }
  });

  it('should validate private key format', () => {
    const privateKey = process.env.PRIVATE_KEY;
    expect(privateKey).toBeDefined();
    expect(privateKey).toMatch(/^0x[a-fA-F0-9]{64}$/);
    console.log(`✅ Private key format is valid`);
  });

  it('should validate wallet can be created from private key', () => {
    const privateKey = process.env.PRIVATE_KEY;
    try {
      const wallet = new ethers.Wallet(privateKey!);
      expect(wallet.address).toMatch(/^0x[a-fA-F0-9]{40}$/);
      console.log(`✅ Wallet created: ${wallet.address}`);
    } catch (error) {
      throw new Error(`Failed to create wallet from private key: ${error}`);
    }
  });

  it('should validate Etherscan API key format if provided', () => {
    const etherscanKey = process.env.ETHERSCAN_API_KEY;
    if (etherscanKey) {
      expect(etherscanKey.length).toBeGreaterThan(0);
      console.log(`✅ Etherscan API key provided`);
    } else {
      console.log(`⚠️  Etherscan API key not provided (optional)`);
    }
  });

  it('should validate Gmail App Password format if provided', () => {
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;
    if (gmailPassword) {
      expect(gmailPassword.length).toBeGreaterThanOrEqual(16);
      console.log(`✅ Gmail App Password provided`);
    } else {
      console.log(`⚠️  Gmail App Password not provided (email service will be inactive)`);
    }
  });
});
