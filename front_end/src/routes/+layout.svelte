<script lang="ts">
	import '../app.postcss';
	import { browser } from '$app/environment';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Badge, Button } from 'flowbite-svelte';
	import { signerAddress, loading, chainId, wagmiLoaded, connected, web3Modal, defaultConfig } from 'svelte-wagmi';
	import { configureWagmi, disconnectWagmi } from 'svelte-wagmi';
	import { page } from '$app/stores';

	$: activeUrl = $page.url.pathname;

	// if (browser) {
	// 	configureWagmi({
	// 		walletconnect: true,
	// 		walletconnectProjectID: '5a5f93d9fc51dcd86e891d30a5267400',
	// 		alchemyKey: 'trhh_mk0ukEsZAy03P464_BvYr4UUln6',
	// 		autoConnect: true
	// 	});
	// }

	import { bet, current_max_bet,getContractValue } from '../lib/Service/contractService';
	import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
	import {
		configureChains,
	} from '@wagmi/core';
	import { createConfig, sepolia } from '@wagmi/core';
	import { publicProvider } from 'wagmi/providers/public';

	const { chains, publicClient, webSocketPublicClient } = configureChains(
		[sepolia],
		[publicProvider()]
	);

	// Set up wagmi config
	 createConfig({
		autoConnect: false,
		connectors: [
			new MetaMaskConnector({ chains })
			// new WalletConnectConnector({
			//   chains,
			//   options: {
			//     projectId: WALLET_CONNECT_PROJECT_ID,
			//   },
			// }),
		],
		publicClient,
		webSocketPublicClient
	});

	// Function to handle wallet connection
	async function connectWallet() {
		const blockBet = defaultConfig({
			appName: 'blockBet',
			walletConnectProjectId: '5a5f93d9fc51dcd86e891d30a5267400',
			alchemyId: 'trhh_mk0ukEsZAy03P464_BvYr4UUln6'
		});

		await blockBet.init();

		
		if (wagmiLoaded) {
			await $web3Modal.openModal();
		}
	}

	function nameForChainId(id: number): string {
		switch (id) {
			case 1:
				return 'Mainnet';
			case 3:
				return 'Ropsten';
			case 4:
				return 'Rinkeby';
			case 5:
				return 'Goerli';
			case 11155111:
				return 'Sepolia';
			case 42:
				return 'Kovan';
			case 59140:
				return 'Linea Testnet';
			case 59144:
				return 'Linea';
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

	function shortenAddress(address: string): string {
		return address.slice(0, 6) + '...' + address.slice(-4);
	}

	// Function to handle wallet disconnection
	async function disconnectWallet() {
		disconnectWagmi();
	}
</script>

<Navbar>
	<NavBrand>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">BlockBet</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl {activeUrl}>
		<NavLi href="/play">Play</NavLi>
		<NavLi href="/liquidity">Pool</NavLi>
	</NavUl>
	<NavUl class="flex justify-between items-center">
		<div>
			{#if $chainId}
				<Badge>{nameForChainId($chainId)}</Badge>
			{/if}
			{#if $signerAddress}
				<Badge>{shortenAddress($signerAddress)}</Badge>
			{/if}
			{#if $loading}
				<Badge>Loading...</Badge>
			{:else if $signerAddress && $chainId}
				<div />
			{:else if connected}
				<Button on:click={connectWallet}>Connect Wallet</Button>
			{:else}
				<Badge>Error Connecting to EVM Provider</Badge>
			{/if}
		</div>
	</NavUl>
</Navbar>

<Button on:click={bet}>Bet (Still have to do)</Button>
<Button on:click={getContractValue}>GetContractValue</Button>
<Button on:click={current_max_bet}>current_max_bet</Button>

<slot />
