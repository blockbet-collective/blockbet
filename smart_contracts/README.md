# Hardhat Project


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

