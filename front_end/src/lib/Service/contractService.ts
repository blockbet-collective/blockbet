// place files you want to import through the `$lib` alias in this folder.

import { abi } from './abi';

import { fetchBalance, getContract, readContract, writeContract } from '@wagmi/core';
import { chainId } from 'svelte-wagmi';
import { get } from 'svelte/store';

const SEPOLIA_CONTRACT_ADDRESS = '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74';

// Function to call the bet entrypoint
export async function bet(amount: string) {
	const chainIdValue = get(chainId);
	const tx = await writeContract({
		address: SEPOLIA_CONTRACT_ADDRESS,
		abi: abi,
		functionName: 'bet',
		chainId: chainIdValue ?? 11155111,
		value: BigInt(amount)
	});
	console.log(tx);
}

// Function to call the bet entrypoint
export async function getContractValue() {
	const chainIdValue = get(chainId);
	const contract = getContract({
		address: SEPOLIA_CONTRACT_ADDRESS,
		chainId: chainIdValue ?? 11155111,
		abi: abi
	});

	console.log(contract);
	return contract;
}

// Function to get the current_max_bet
export async function current_max_bet() {
	const chainIdValue = get(chainId);
	const data = await readContract({
		address: SEPOLIA_CONTRACT_ADDRESS,
		chainId: chainIdValue ?? 11155111,
		abi: abi,
		functionName: 'current_max_bet'
	});

	console.log(data);
	return data;
}

// Function to fet current liquidity of casino
export async function liquidity() {
	const chainIdValue = get(chainId);
	const balance = await fetchBalance({
		address: SEPOLIA_CONTRACT_ADDRESS,
		chainId: chainIdValue ?? 11155111
	});

	console.log(balance);
	return balance;
}
