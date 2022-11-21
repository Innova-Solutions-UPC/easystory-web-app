const hre = require("hardhat")

const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory("CSubscription");
    console.log(domainContractFactory)
    // We pass in "programwithyt" to the constructor when deploying
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();
