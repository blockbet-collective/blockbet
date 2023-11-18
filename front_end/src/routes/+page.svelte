<script lang="ts">
	import { browser } from '$app/environment';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Badge, Button } from 'flowbite-svelte';
	import { signerAddress, loading, chainId, wagmiLoaded, connected, web3Modal } from 'svelte-wagmi';
	import { configureWagmi, disconnectWagmi } from 'svelte-wagmi';

	if (browser) {
		configureWagmi({
			walletconnect: true,
			walletconnectProjectID: '5a5f93d9fc51dcd86e891d30a5267400',
			alchemyKey: 'trhh_mk0ukEsZAy03P464_BvYr4UUln6',
			autoConnect: true
		});
	}
	// Function to handle wallet connection
	async function connectWallet() {
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
	<NavBrand href="/">
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		{#if $chainId}
			<Badge>{nameForChainId($chainId)}</Badge>
		{/if}
		{#if $signerAddress}
			<Badge>{shortenAddress($signerAddress)}</Badge>
		{/if}
		{#if $loading}
			<Badge>Loading...</Badge>
		{:else if connected}
			<Button on:click={connectWallet}>Connect Wallet</Button>
		{:else}
			<Badge>Error Connecting to EVM Provider</Badge>
		{/if}
	</NavUl>
</Navbar>
