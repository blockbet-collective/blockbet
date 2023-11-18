# Hardhat Project

## Contract deployment addresses

### Sepolia testnet:
0xc034a052464c7d8bedc111ef2d448fd15b940c8b

Deposit_funds transaction: https://sepolia.etherscan.io/tx/0x2d25b82c4c7fcbb374d3143bfe4fc8e2bb0c494dc0a56575ef7f5a3e8932c83a

Bet transaction: https://sepolia.etherscan.io/tx/0x0ebe9566d184be8c58205a712ce610bc82774f3dbabc24807b3dbe718168cb17

### Linea testnet:
0xBeCfF3A3f23928705c8d707AD49b076996a1d3Ed

Deposit_funds transaction: https://goerli.lineascan.build/tx/0xc6d7a328e055a7361bec481b57be27230c4a8ba4bd29cf1d8c98f9d33559acf2

Bet transaction: https://goerli.lineascan.build/tx/0xa2460a59b199de7781226c0e6662aa4665c6e0bdedbfba2a982d27d17d955ce5

### Scroll testnet:
0x2CDC43847Da0cfA8A93DAD71792417D455F4785b

Deposit_funds transaction: https://sepolia.scrollscan.com/tx/0xc360fae0431e8590ee2461fcd63d188305d6dac63d30ef33061fc0b799caf8a1

Bet transaction: https://sepolia.scrollscan.com/tx/0xf1a3f93662c561cbecef8d3dc6c7ef20f63e91af829d680210982c0eefaf864c

### Arbitrum testnet:
0x2f210A4823B8bF68811691E7aFE9efDEf77f3AB6

Deposit_funds transaction: https://goerli.arbiscan.io/tx/0xa2da41c83b611e378f423273dbdf5230a5584f90aa3789ce68fc6c48d621d69e

Bet transaction: https://goerli.arbiscan.io/tx/0x85f997dc456bb56c4d10edf438a765b80432c4062e045c28f4124fddaf92baa4

### IPFS storage link for NFTs:
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

