// place files you want to import through the `$lib` alias in this folder.

import { abi } from './abi';

import { fetchBalance, getContract, readContract, writeContract, getAccount } from '@wagmi/core';
import { chainId, } from 'svelte-wagmi';
import { get } from 'svelte/store';

const SEPOLIA_CONTRACT_ADDRESS = '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74';

// Function to call the deposit_funds entrypoint
export async function deposit_funds(amountInWei: number) {
	console.log(amountInWei);

	const chainIdValue = get(chainId);
	const tx = await writeContract({
		address: SEPOLIA_CONTRACT_ADDRESS,
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
		address: SEPOLIA_CONTRACT_ADDRESS,
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
		address: SEPOLIA_CONTRACT_ADDRESS,
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
		address: SEPOLIA_CONTRACT_ADDRESS,
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
		address: SEPOLIA_CONTRACT_ADDRESS,
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
		address: SEPOLIA_CONTRACT_ADDRESS,
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
		address: SEPOLIA_CONTRACT_ADDRESS,
		chainId: chainIdValue ?? 11155111
	});

	console.log(balance);
	return balance;
}
