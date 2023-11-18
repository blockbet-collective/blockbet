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
			case 42:
				return 'Kovan';
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
		<img src="/images/flowbite-svelte-icon-logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
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
