import { ethers, run, network } from 'hardhat'
import { BlockBetCollective, BlockBetCollective__factory } from '../typechain-types'
import { config } from 'dotenv'
config({
    path: '.env'
})
const sleep = async (milliseconds: number): Promise<void> => {
    if (network.name !== 'hardhat') {
        return await new Promise(resolve => setTimeout(resolve, milliseconds))
    }
}

let blockBetCollectiveFactory: BlockBetCollective__factory

async function deployBlockBetCollective(): Promise<BlockBetCollective> {

    console.log('Deploying contract BlockBetCollective')

    const blockBetCollective = await blockBetCollectiveFactory.deploy()
    await blockBetCollective.deployed()
    console.log(`BlockBetCollective at ${blockBetCollective.address}`)

    console.log('sleep')
    await sleep(50000)
   
    if (network.name !== 'hardhat') {
        // Verifying BlockBetCollective
        try {
            await run('verify:verify', {
                contract: 'contracts/BlockBetCollective.sol:BlockBetCollective',
                address: blockBetCollective.address,
                constructorArguments: []
            })
        } catch (err) {
            console.error(err)
        }
    }
    
    console.log('verificationFinished')
    return blockBetCollective
}

async function main(): Promise<void> {
    blockBetCollectiveFactory = (await ethers.getContractFactory('BlockBetCollective'))
    await deployBlockBetCollective()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })