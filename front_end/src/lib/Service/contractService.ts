// place files you want to import through the `$lib` alias in this folder.

import { signerAddress, loading, chainId, wagmiLoaded, connected, web3Modal } from 'svelte-wagmi';
import { abi } from './abi';


import { getContract, readContract } from '@wagmi/core'

// Function to call the bet entrypoint
export async function bet() {

    // TODO

    // const contract = getContract({
    //     address: '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74',
    //     abi: abi,
    // })

    // console.log(contract)
}

// Function to call the bet entrypoint
export async function getContractValue() {

    const contract = getContract({
        address: '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74',
        abi: abi,
    })

    console.log(contract)
}

// Function to get the current_max_bet
export async function current_max_bet() {

    const data = await readContract({
        address: '0xbDa1E051990Cf381bB8b9F0aeAA3c868933C8D74',
        chainId: 11155111,
        abi: abi,
        functionName: 'current_max_bet',

    })

    console.log(data)
}


