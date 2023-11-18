# Hardhat Project

## Contract deployment addresses

Sepolia testnet:
0xc034a052464c7d8bedc111ef2d448fd15b940c8b
Deposit_funds transaction: https://sepolia.etherscan.io/tx/0x2d25b82c4c7fcbb374d3143bfe4fc8e2bb0c494dc0a56575ef7f5a3e8932c83a
Bet transaction: https://sepolia.etherscan.io/tx/0x0ebe9566d184be8c58205a712ce610bc82774f3dbabc24807b3dbe718168cb17

Linea testnet:
0x2f210A4823B8bF68811691E7aFE9efDEf77f3AB6
Deposit_funds transaction: https://goerli.lineascan.build/tx/0x771c2c95a7c3f491bfa6df12d265d36223edf015a2ba8a1e508d3cd8fd3085d1
Bet transaction: https://goerli.lineascan.build/tx/0x0c6a6851f24f3c560ed7923bd4b442e3610e0f2ceaf59208893d44ecc5953f2f

Scroll testnet:
0x2f210A4823B8bF68811691E7aFE9efDEf77f3AB6
Deposit_funds transaction: https://sepolia-blockscout.scroll.io/tx/0x0f76ea5bc3dc97d6459a16b084e24502917a61c8b244f93ccd0d99e9153d9784
Bet transaction: https://sepolia-blockscout.scroll.io/tx/0xae8913bee0f5127e6324265eea5de040b31b74c7b723e9ab287d868ae4534ea0

IPFS storage link for NFTs:
https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link

## Setup of this repo

- Clone this repo:
```shell
git clone https://github.com/DOBEN/ETH_Global.git
```

- Install dependencies:
```shell
npm install
npm install -g npx (if you haven't installed npx on your machine yet)
```

- Copy the `.env.sample` file and rename it to `.env`. Insert your KEYS into the `.env` file.

Try running some of the following tasks in the root folder:

- To compile the smart contracts:

```shell
npx hardhat compile
```

- To cleanup the compiled contract folder:

```shell
npx hardhat clean
```

- To run the smart contract tests, to display the contract deployment costs, and to display the execution costs of the smart contract functions. Add your COINMARKETCAP_API_KEY to the `.env` file:

```shell
npx hardhat test
```

- To get a coverage report of the smart contract tests:
```
npx hardhat coverage
```

- To deploy/simulate the deployment locally:

```shell
npx hardhat run ./scripts/deploy.ts
```

- To deploy and verify the smart contracts on the sepolia testnet. Add your INFURA_KEY, and ETHERSCAN_API_KEY to the `.env` file:

```shell
npx hardhat run ./scripts/deploy.ts --network sepolia
```

- To deploy and verify the smart contracts on the Ehereum mainnet. Add your INFURA_KEY, and ETHERSCAN_API_KEY to the `.env` file:

```shell
npx hardhat run ./scripts/deploy.ts --network mainnet
```

