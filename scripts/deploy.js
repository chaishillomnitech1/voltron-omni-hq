const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting smart contract deployment...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log(`📝 Deploying contracts with account: ${deployer.address}`);
  console.log(`💰 Account balance: ${(await deployer.getBalance()).toString()} wei\n`);

  // Deploy InheritanceVault
  console.log("📦 Deploying InheritanceVault...");
  const InheritanceVault = await hre.ethers.getContractFactory("InheritanceVault");
  const inheritanceVault = await InheritanceVault.deploy();
  await inheritanceVault.deployed();
  console.log(`✅ InheritanceVault deployed to: ${inheritanceVault.address}\n`);

  // Deploy VoltronDAO
  console.log("📦 Deploying VoltronDAO...");
  const VoltronDAO = await hre.ethers.getContractFactory("VoltronDAO");
  const voltronDAO = await VoltronDAO.deploy();
  await voltronDAO.deployed();
  console.log(`✅ VoltronDAO deployed to: ${voltronDAO.address}\n`);

  // Deploy LyricPlaqueNFT
  console.log("📦 Deploying LyricPlaqueNFT...");
  const LyricPlaqueNFT = await hre.ethers.getContractFactory("LyricPlaqueNFT");
  const lyricPlaqueNFT = await LyricPlaqueNFT.deploy(
    "Lyric Plaque",
    "PLAQUE",
    deployer.address
  );
  await lyricPlaqueNFT.deployed();
  console.log(`✅ LyricPlaqueNFT deployed to: ${lyricPlaqueNFT.address}\n`);

  // Save deployment addresses
  const deploymentAddresses = {
    inheritanceVault: inheritanceVault.address,
    voltronDAO: voltronDAO.address,
    lyricPlaqueNFT: lyricPlaqueNFT.address,
    deployer: deployer.address,
    network: hre.network.name,
    timestamp: new Date().toISOString(),
  };

  console.log("📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentAddresses, null, 2));

  // Save to file
  const fs = require("fs");
  fs.writeFileSync(
    "./deployments.json",
    JSON.stringify(deploymentAddresses, null, 2)
  );
  console.log("\n✅ Deployment addresses saved to deployments.json");

  // Verify contracts on Etherscan (if on testnet)
  if (hre.network.name !== "localhost") {
    console.log("\n⏳ Waiting for block confirmations before verification...");
    await inheritanceVault.deployTransaction.wait(5);
    
    console.log("🔍 Verifying contracts on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: inheritanceVault.address,
        constructorArguments: [],
      });
      console.log("✅ InheritanceVault verified on Etherscan");
    } catch (error) {
      console.log("⚠️  Etherscan verification skipped:", error.message);
    }
  }

  console.log("\n🎉 Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
