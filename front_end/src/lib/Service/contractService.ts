// place files you want to import through the `$lib` alias in this folder.

import { abi } from './abi';

import { getContract, readContract, writeContract } from '@wagmi/core';

// Function to call the bet entrypoint
export async function bet(amount: string) {
    const tx = await writeContract({
        address: '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74',
        abi: abi,
        functionName: 'bet',
        value: BigInt(amount)
    })
    console.log(tx)
}

// Function to call the bet entrypoint
export async function getContractValue(chainId: number | null | undefined) {
    const contract = getContract({
        address: '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74',
        chainId: chainId ?? 11155111,
        abi: abi
    });

    console.log(contract);
}

// Function to get the current_max_bet
export async function current_max_bet(chainId: number | null | undefined) {
    const data = await readContract({
        address: '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74',
        chainId: chainId ?? 11155111,
        abi: abi,
        functionName: 'current_max_bet'
    });

    console.log(data);
}
