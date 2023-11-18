// place files you want to import through the `$lib` alias in this folder.

import { abi } from './abi';

import { fetchBalance, getContract, readContract, writeContract, getAccount } from '@wagmi/core';
import { chainId, } from 'svelte-wagmi';
import { get } from 'svelte/store';

function getContractAddress(id: number | null | undefined): string {
	switch (id) {
		// Linea testnet 
		case 59140:
			return '0x2f210A4823B8bF68811691E7aFE9efDEf77f3AB6';
		// Sepolia testnet 
		case 11155111:
			return '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74';


		case 1:
			return 'Mainnet';
		case 3:
			return 'Ropsten';
		case 4:
			return 'Rinkeby';
		case 5:
			return 'Goerli';
		case 42:
			return 'Kovan';
		case 8453:
			return 'Base';
		case 84531:
			return 'Base Goerli Testnet';
		case 84532:
			return 'Base Sepolia Testnet';
		case 88888:
			return 'Chiliz';
		case 88880:
			return 'Chiliz Scoville Testnet';
		case 534352:
			return 'Scroll';
		case 534351:
			return 'Scroll Sepolia Testnet';
		case 1442:
			return 'Polygon zkEVM Testnet';
		case 1101:
			return 'Polygon zkEVM';
		case 42161:
			return 'Arbitrum One';
		case 421614:
			return 'Arbitrum Sepolia';
		default:
			return 'Unknown';
	}
}

// Function to call the deposit_funds entrypoint
export async function deposit_funds(amountInWei: number) {
	console.log(amountInWei);

	const chainIdValue = get(chainId);
	const tx = await writeContract({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		abi: abi,
		functionName: 'deposit_funds',
		chainId: chainIdValue ?? 11155111,
		value: BigInt(amountInWei)
	});
	console.log(tx);
	return tx;
}

// Function to call the withdraw_funds entrypoint
export async function withdraw_funds(amount: number) {
	const chainIdValue = get(chainId);
	const tx = await writeContract({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		abi: abi,
		functionName: 'withdraw_funds',
		chainId: chainIdValue ?? 11155111,
		args: [BigInt(amount)]
	});
	console.log(tx);
	return tx;
}

// Function to call the bet entrypoint
export async function bet(amountInWei: string) {
	const chainIdValue = get(chainId);
	const tx = await writeContract({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		abi: abi,
		functionName: 'bet',
		chainId: chainIdValue ?? 11155111,
		value: BigInt(amountInWei)
	});
	console.log(tx);
	return tx;
}

// Function to call the bet entrypoint
export async function getContractValue() {
	const chainIdValue = get(chainId);
	const contract = getContract({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		chainId: chainIdValue ?? 11155111,
		abi: abi
	});

	console.log(contract);
	return contract;
}

// Function to get the current_max_bet
export async function currentMaxBet() {
	const chainIdValue = get(chainId);
	const data = await readContract({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		chainId: chainIdValue ?? 11155111,
		abi: abi,
		functionName: 'current_max_bet'
	});

	console.log(data);
	return data;
}

// Function to get the current_max_bet
export async function balanceOf() {
	const account = getAccount();
	const chainIdValue = get(chainId);
	const data = await readContract({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		chainId: chainIdValue ?? 11155111,
		abi: abi,
		functionName: 'balanceOf',
		args: [account]
	});

	console.log(data);
	return data;
}

// Function to fet current liquidity of casino
export async function liquidity() {
	const chainIdValue = get(chainId);
	const balance = await fetchBalance({
		address: getContractAddress(chainIdValue) as `0x${string}`,
		chainId: chainIdValue ?? 11155111
	});

	console.log(balance);
	return balance;
}
