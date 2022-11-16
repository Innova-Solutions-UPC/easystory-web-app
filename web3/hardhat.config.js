require("@nomiclabs/hardhat-waffle");
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai:{
      url: 'https://polygon-mumbai.g.alchemy.com/v2/3Y_gQ55Gm6whr4cSiYhnecL4plE4V2cL',
      //accounts: [`0x${process.env.PRIVATE_KEY}`],
      accounts: ['0x4396fd37b175009f74d73470fac9b80a4976cdd05e9207d177a00d3159397f71']
    }
  }
}
