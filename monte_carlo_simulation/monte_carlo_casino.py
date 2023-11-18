import random
import matplotlib.pyplot as plt
import numpy as np

def run_simulation(bankroll, edge, bet_fraction, num_flips):
    casino_bankroll = bankroll
    casino_edge = edge
    max_bet_fraction = bet_fraction

    casino_results = []

    for _ in range(num_flips):
        max_bet_size = casino_bankroll * max_bet_fraction  # Maximum bet size as a fraction of current bankroll
        bet_size = random.uniform(0, max_bet_size)  # Random bet size up to the maximum

        if random.random() < 0.5 + casino_edge:  # Casino wins
            casino_bankroll += bet_size
        else:  # Player wins
            casino_bankroll -= bet_size

        casino_results.append(casino_bankroll)

        if casino_bankroll <= 0:
            break

    return casino_results

# Simulation parameters
initial_bankroll = 10000  # Starting bankroll for the casino
casino_edges = [0.01, 0.005, 0.001]  # Casino's edges
bet_fractions = [0.001, 0.01, 0.05]  # Fraction of bankroll for max bet
num_flips = 25000  # Number of coin flips to simulate, increased to 25000
num_simulations = 10  # Number of simulations to run for each set of parameters

# Running the simulations
for edge in casino_edges:
    for fraction in bet_fractions:
        plt.figure()
        for _ in range(num_simulations):
            casino_bankroll = run_simulation(initial_bankroll, edge, fraction, num_flips)
            plt.plot(casino_bankroll)  # Plot the simulation results

        plt.axhline(y=10000, color='r', linestyle='--')  # Adding a horizontal line at y=10,000
        plt.xlabel('Number of Flips')
        plt.ylabel('Bankroll')
        plt.title(f'Monte Carlo Simulation - Edge: {edge*100}%, Max Bet Fraction: {fraction}')
        plt.ylim(0, 20000)  # Adjusted Y-axis range
        plt.show()
