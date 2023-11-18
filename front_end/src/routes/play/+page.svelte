<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, Button, Toggle, Input } from 'flowbite-svelte';
	import { base } from '$app/paths';
	import { bet } from '$lib/Service/contractService';
	import { Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	let showModal = false;

	interface GameProps {
		name: string;
		description: string;
		image: string;
		action: Function;
		betValue: string;
	}

	// ['Coin Toss', 'Dice', 'Roulette', 'Sic Bo', 'Baccarat'];
	let games: GameProps[] = [
		{
			name: 'Coin Toss',
			description: 'Coin Toss is a simple game where you can bet on the outcome of a coin toss.',
			image: base + '/coinflip.png',
			betValue: '',
			action: (amount: string) => {
				console.log('hit it again');
				bet(amount);
			}
		},
		{
			name: 'Dice',
			description: 'Dice is a simple game where you can bet on the outcome of a dice roll.',
			image: base + '/dice.png',
			betValue: '',
			action: () => {
				showModal = true;
			}
		},
		{
			name: 'Roulette',
			description: 'Roulette is a casino game named after the French word meaning little wheel.',
			image: base + '/roulette.png',
			betValue: '',
			action: () => {
				showModal = true;
			}
		},
		{
			name: 'Sic Bo',
			description: 'Sic Bo is a dice game of Chinese origin played with three dice.',
			image: base + '/sicbo.png',
			betValue: '',
			action: () => {
				showModal = true;
			}
		},
		{
			name: 'Baccarat',
			description:
				'Baccarat is a card game played at casinos. It is a comparing card game played between two hands, the "player" and the "banker".',
			image: base + '/dice.png',
			betValue: '',
			action: () => {
				showModal = true;
			}
		},
		{
			name: 'Football',
			description:
				'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
			image: base + '/football.png',
			betValue: '',
			action: () => {
				showModal = true;
			}
		},
		{
			name: 'Basketball',
			description:
				"Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop while preventing the opposing team from shooting through their own hoop.",
			image: base + '/basketball.png',
			betValue: '',
			action: () => {
				showModal = true;
			}
		}
	];

	function placeBet(game: GameProps) {
		console.log('hit it');
		game.action(game.betValue);
	}
</script>

<div class="flex flex-col items-center space-y-4 m-10">
	{#each games as game}
		<Card img={game.image} horizontal size="xl">
			<div class="">
				<h3 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{game.name}
				</h3>
				<p>
					{game.description}
				</p>
				<div class="flex items-center justify-between mt-4">
					<Input bind:value={game.betValue} class="mr-4" placeholder="4.20 eth" />
					<Button on:click={() => placeBet(game)} class="w-[100px]">Play</Button>
				</div>
			</div>
		</Card>
	{/each}
</div>
<Modal bind:open={showModal} size="xs" autoclose>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			This game will be coming soon...
		</h3>
		<Button
			on:click={() => {
				showModal = false;
			}}
			color="alternative">Ok</Button
		>
	</div>
</Modal>
