import numpy as np


def hill_climbing(func, variant='simple', max_iter=500, step_size=0.1, bounds=(-5.12, 5.12), dim=2):
    """
    Hill Climbing optimization algorithm.

    Variants:
    - 'simple'     : Simple Ascent (first improvement)
    - 'steepest'   : Steepest-Ascent (best among all neighbors)
    - 'stochastic' : Random neighbor selection
    """
    # Random initialization within bounds
    current_pos = np.random.uniform(bounds[0], bounds[1], dim)
    current_energy = func(current_pos)
    history = [current_energy]

    directions = np.eye(dim)

    for _ in range(max_iter):
        moved = False

        if variant == 'simple':
            # First-improvement: move to first neighbor that improves
            for d in directions:
                for sign in [1, -1]:
                    neighbor = current_pos + sign * step_size * d
                    neighbor = np.clip(neighbor, bounds[0], bounds[1])
                    neighbor_energy = func(neighbor)
                    if neighbor_energy < current_energy:
                        current_pos = neighbor
                        current_energy = neighbor_energy
                        moved = True
                        break
                if moved:
                    break

        elif variant == 'steepest':
            # Best-improvement: evaluate all neighbors, move to best
            best_neighbor = None
            best_energy = current_energy
            for d in directions:
                for sign in [1, -1]:
                    neighbor = current_pos + sign * step_size * d
                    neighbor = np.clip(neighbor, bounds[0], bounds[1])
                    neighbor_energy = func(neighbor)
                    if neighbor_energy < best_energy:
                        best_energy = neighbor_energy
                        best_neighbor = neighbor
            if best_neighbor is not None:
                current_pos = best_neighbor
                current_energy = best_energy
                moved = True

        elif variant == 'stochastic':
            # Random neighbor from random direction
            d = directions[np.random.randint(len(directions))]
            sign = np.random.choice([-1, 1])
            neighbor = current_pos + sign * step_size * d
            neighbor = np.clip(neighbor, bounds[0], bounds[1])
            neighbor_energy = func(neighbor)
            if neighbor_energy < current_energy:
                current_pos = neighbor
                current_energy = neighbor_energy
                moved = True

        history.append(current_energy)

        # Stop early if no improvement (for simple and steepest)
        if not moved and variant in ['simple', 'steepest']:
            break

    return current_pos, current_energy, history
