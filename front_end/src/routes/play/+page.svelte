<script lang="ts">
	import { onMount } from 'svelte';
	import { Card, Button, Toggle, Input } from 'flowbite-svelte';
	import { base } from '$app/paths';

	interface GameProps {
		name: string;
		description: string;
		image: string;
		action: Function;
	}

	// ['Coin Toss', 'Dice', 'Roulette', 'Sic Bo', 'Baccarat'];
	let games: GameProps[] = [
		{
			name: 'Coin Toss',
			description: 'Coin Toss is a simple game where you can bet on the outcome of a coin toss.',
			image: base + '/coinflip.png',
			action: () => {
				console.log('Coin Toss');
			}
		},
		{
			name: 'Dice',
			description: 'Dice is a simple game where you can bet on the outcome of a dice roll.',
			image: base + '/dice.png',
			action: () => {
				console.log('Dice');
			}
		},
		{
			name: 'Roulette',
			description: 'Roulette is a casino game named after the French word meaning little wheel.',
			image: base + '/roulette.png',
			action: () => {
				console.log('Roulette');
			}
		},
		{
			name: 'Sic Bo',
			description: 'Sic Bo is a dice game of Chinese origin played with three dice.',
			image: base + '/sicbo.png',
			action: () => {
				console.log('Sic Bo');
			}
		},
		{
			name: 'Baccarat',
			description:
				'Baccarat is a card game played at casinos. It is a comparing card game played between two hands, the "player" and the "banker".',
			image: base + '/dice.png',
			action: () => {
				console.log('Baccarat');
			}
		},
		{
			name: 'Football',
			description:
				'Football is a family of team sports that involve, to varying degrees, kicking a ball to score a goal.',
			image: base + '/football.png',
			action: () => {
				console.log('Football');
			}
		},
		{
			name: 'Basketball',
			description:
				"Basketball is a team sport in which two teams, most commonly of five players each, opposing one another on a rectangular court, compete with the primary objective of shooting a basketball through the defender's hoop while preventing the opposing team from shooting through their own hoop.",
			image: base + '/basketball.png',
			action: () => {
				console.log('Basketball');
			}
		}
	];

	onMount;
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
					<Input class="mr-4" placeholder="4.20 eth" />
					<Button class="w-[100px]">Play</Button>
				</div>
			</div>
		</Card>
	{/each}
</div>
