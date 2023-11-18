<script lang="ts">
	import { Button, Card, Input } from 'flowbite-svelte';
	import { ChartSolid, FaceGrinSolid } from 'flowbite-svelte-icons';
</script>

<div class="flex items-center justify-center space-x-4 m-10">
	<Card>
		<ChartSolid class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
		<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">TVL</h5>
		<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
			The treasury currently holds the displayed amount of liquidity in the bank
		</p>
		<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">42 eth</h5>
	</Card>
	<Card
		><FaceGrinSolid class="w-7 h-7 mb-3 text-gray-500 dark:text-gray-400" />
		<h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
			Max Bet
		</h5>
		<p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
			The maximum bet possible based on current total liquidity
		</p>
		<h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">2.1 eth</h5>
	</Card>
</div>
