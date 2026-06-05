import numpy as np


def genetic_algorithm(func, pop_size=50, generations=100, mutation_rate=0.1,
                       crossover_rate=0.8, bounds=(-5.12, 5.12), dim=2):
    """
    Genetic Algorithm optimization.
    Uses tournament selection, uniform crossover, and Gaussian mutation.
    """
    # Initialize population
    population = np.random.uniform(bounds[0], bounds[1], (pop_size, dim))
    fitness = np.array([func(ind) for ind in population])
    best_initial_idx = np.argmin(fitness)
    history = [{'current_state': population[best_initial_idx].tolist(), 'current_energy': float(fitness[best_initial_idx]), 'average_fitness': float(np.mean(fitness))}]

    for gen in range(generations):
        new_population = []

        for _ in range(pop_size):
            # Tournament selection (k=3)
            p1 = _tournament_select(population, fitness, k=3)
            p2 = _tournament_select(population, fitness, k=3)

            # Uniform crossover
            if np.random.rand() < crossover_rate:
                mask = np.random.rand(dim) < 0.5
                child = np.where(mask, p1, p2)
            else:
                child = p1.copy()

            # Gaussian mutation
            if np.random.rand() < mutation_rate:
                mutation = np.random.normal(0, 0.3, dim)
                child = child + mutation

            child = np.clip(child, bounds[0], bounds[1])
            new_population.append(child)

        population = np.array(new_population)
        fitness = np.array([func(ind) for ind in population])
        best_gen_idx = np.argmin(fitness)
        history.append({'current_state': population[best_gen_idx].tolist(), 'current_energy': float(fitness[best_gen_idx]), 'average_fitness': float(np.mean(fitness))})

    best_idx = np.argmin(fitness)
    return population[best_idx], fitness[best_idx], history


def _tournament_select(population, fitness, k=3):
    """Select best individual from k random candidates."""
    indices = np.random.choice(len(population), k, replace=False)
    best = indices[np.argmin(fitness[indices])]
    return population[best].copy()
