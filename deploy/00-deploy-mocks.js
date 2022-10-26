const { network, ethers } = require("hardhat")
// const { developementChains } = require("../helper-hardhat-config")

const BASE_FEE = ethers.utils.parseEther("0.25") //o.25 is the premium. iT costs 0.25 LINK per request
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain.

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    // if (developementChains.includes(network.name)) {
    if (chainId == 31337) {
        log("Local network detected! Deploying Mocks...")
        await deploy("VRFCoordinatorV2Mock", {
            contract: "VRFCoordinatorV2Mock",
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks Deployed!")
        log("----------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
