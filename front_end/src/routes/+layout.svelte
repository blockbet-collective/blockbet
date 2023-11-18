<script lang="ts">
	import '../app.postcss';
	import { browser } from '$app/environment';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Badge, Button } from 'flowbite-svelte';
	import {
		signerAddress,
		loading,
		chainId,
		wagmiLoaded,
		connected,
		web3Modal,
		defaultConfig,
		configureWagmi
	} from 'svelte-wagmi';
	import {
		mainnet,
		polygon,
		optimism,
		arbitrum,
		sepolia,
		baseSepolia,
		base,
		chiliz,
		arbitrumSepolia,
		arbitrumNova,
		type Chain,
		mantle,
		mantleTestnet
	} from '@wagmi/core/chains';

	import { page } from '$app/stores';

	$: activeUrl = $page.url.pathname;

	const WALLET_CONNECT_PROJECT_ID = '5a5f93d9fc51dcd86e891d30a5267400';

	onMount(async () => {
		if (browser) {
			const blockbetKit = defaultConfig({
				chains: [
					mainnet,
					polygon,
					optimism,
					sepolia,
					base,
					baseSepolia,
					chiliz,
					arbitrum,
					arbitrumNova,
					arbitrumSepolia,
					mantle,
					mantleTestnet
				],
				appName: 'blockbet.kit',
				walletConnectProjectId: '5a5f93d9fc51dcd86e891d30a5267400',
				alchemyId: 'trhh_mk0ukEsZAy03P464_BvYr4UUln6'
			});
			await blockbetKit.init();
		}
	});

	import { bet, current_max_bet, getContractValue } from '../lib/Service/contractService';
	import { onMount } from 'svelte';

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
				<Button
					on:click={() => {
						$web3Modal.openModal();
					}}>Connect Wallet</Button
				>
			{:else}
				<Badge>Error Connecting to EVM Provider</Badge>
			{/if}
		</div>
	</NavUl>
</Navbar>

<Button on:click={bet}>Bet (Still have to do)</Button>
<Button
	on:click={() => {
		console.log($chainId);
		getContractValue($chainId);
	}}>GetContractValue</Button
>
<Button
	on:click={() => {
		console.log($chainId);
		current_max_bet($chainId);
	}}>current_max_bet</Button
>

<slot />
