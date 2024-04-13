require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()
const { vars } = require('hardhat/config')

const INFURA_API_KEY = vars.get('INFURA_API_KEY')
const SEPOLIA_PRIVATE_KEY = vars.get('SEPOLIA_PRIVATE_KEY')
const ETHERSCAN_API_KEY = vars.get('ETHERSCAN_API_KEY')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: '0.8.24',
    defaultNetwork: 'hardhat',
    networks: {
        sepolia: {
            url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
            accounts: [SEPOLIA_PRIVATE_KEY],
        },
    },
    etherscan: {
        apiKey: {
            sepolia: ETHERSCAN_API_KEY,
        },
    },
    sourcify: {
        // Disabled by default
        // Doesn't need an API key
        enabled: true,
    },
}

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()

    for (const account of accounts) {
        console.log(account.address)
    }
})
