import numpy as np


def simulated_annealing(func, t0=100.0, cooling_rate=0.95, max_iter=1000,
                         step_size=0.5, bounds=(-5.12, 5.12), dim=2):
    """
    Simulated Annealing optimization algorithm.
    Uses exponential cooling schedule: T = T0 * cooling_rate^k
    """
    current_pos = np.random.uniform(bounds[0], bounds[1], dim)
    current_energy = func(current_pos)
    best_pos = current_pos.copy()
    best_energy = current_energy
    history = [{'current_state': current_pos.tolist(), 'current_energy': float(current_energy), 'temperature': float(t0), 'accepted_worse': False}]

    T = t0

    for _ in range(max_iter):
        if T < 1e-10:
            break

        # Generate random neighbor
        neighbor = current_pos + np.random.uniform(-step_size, step_size, dim)
        neighbor = np.clip(neighbor, bounds[0], bounds[1])
        neighbor_energy = func(neighbor)

        delta_e = neighbor_energy - current_energy

        # Accept if better, or accept with probability if worse
        if delta_e < 0 or np.random.rand() < np.exp(-delta_e / T):
            current_pos = neighbor
            current_energy = neighbor_energy

        # Track global best
        if current_energy < best_energy:
            best_pos = current_pos.copy()
            best_energy = current_energy

        history.append({'current_state': current_pos.tolist(), 'current_energy': float(current_energy), 'temperature': float(T), 'accepted_worse': bool(delta_e > 0)})
        T *= cooling_rate

    return best_pos, best_energy, history
