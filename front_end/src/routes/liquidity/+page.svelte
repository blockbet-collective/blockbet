<script lang="ts">
	import { current_max_bet, liquidity } from '$lib/Service/contractService';
	import { Button, Card, Input } from 'flowbite-svelte';
	import { ChartSolid, FaceGrinSolid } from 'flowbite-svelte-icons';
	import { chainId } from 'svelte-wagmi';
	import { Spinner } from 'flowbite-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';

	let isLoadingMaxBet: boolean = false;
	let isLoadingTVL: boolean = false;

	let isLoadingTransaction: boolean = false;

	let maxBet: string = '';
	let tvl: string = '';

	let provideLiquidityValue: string = '';
	let withdrawValue: string = '';

	async function loadMaxBet(chainId: number) {
		isLoadingMaxBet = true;
		try {
			const response = (await current_max_bet(chainId)) as string;
			const bigIntResponse = Number(response);
			const divisor = Number(10 ** 18);
			const result = bigIntResponse / divisor;
			maxBet = result.toLocaleString('en-US', {
				maximumFractionDigits: 10
			});
		} catch (error) {
			console.error(error);
		} finally {
			isLoadingMaxBet = false;
		}
	}

	async function loadTVL(chainId: number) {
		isLoadingTVL = true;
		try {
			const response = await liquidity(chainId);
			tvl = response.formatted;
		} catch (error) {
			console.error(error);
		} finally {
			isLoadingTVL = false;
		}
	}

	function provideLiqudity() {}

	function withdraw() {}

	$: {
		if ($chainId) {
			loadMaxBet($chainId);
			loadTVL($chainId);
		}
	}
</script>

<div class="flex flex-col justify-center">
	<div class="flex items-center justify-center space-x-4 m-10">
		<Card>
			<ChartSolid class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
			<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">TVL</h5>
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
				The treasury currently holds the displayed amount of liquidity in the bank
			</p>
			{#if isLoadingTVL}
				<Spinner />
			{:else}
				<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					{tvl} eth
				</h5>
			{/if}
		</Card>
		<Card>
			<FaceGrinSolid class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
			<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
				Max Bet
			</h5>
			<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
				The maximum bet possible based on current total liquidity
			</p>
			{#if isLoadingMaxBet}
				<Spinner />
			{:else}
				<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
					{maxBet} eth
				</h5>
			{/if}
		</Card>
	</div>
	<div class="flex items-center justify-center space-x-4 m-10">
		<Card horizontal>
			<div class="flex flex-col space-y-4">
				<div>
					Provide Liquidity
					<div class="flex items-center">
						<Input bind:value={provideLiquidityValue} /><Button class="w-[150px] ml-2"
							>{#if isLoadingTransaction}<Spinner size="5" />{:else}Add{/if}</Button
						>
					</div>
				</div>
				<div>
					Unlock shares
					<div class="flex items-center">
						<Input bind:value={withdrawValue} /><Button class="w-[150px] ml-2"
							>{#if isLoadingTransaction}<Spinner size="5" />{:else}Withdraw{/if}</Button
						>
					</div>
				</div>
			</div>
		</Card>
	</div>
</div>
