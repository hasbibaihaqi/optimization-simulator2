import numpy as np


def rastrigin(x):
    """
    Rastrigin function - classic multimodal benchmark.
    Global minimum: f(0,...,0) = 0
    Bounds: [-5.12, 5.12]
    """
    n = len(x)
    A = 10
    return A * n + np.sum(x**2 - A * np.cos(2 * np.pi * x))


def generate_surface(resolution=40, bounds=(-5.12, 5.12)):
    """
    Generate surface data for 3D visualization.
    Returns dict with x, y, z arrays for Plotly surface plot.
    """
    x = np.linspace(bounds[0], bounds[1], resolution)
    y = np.linspace(bounds[0], bounds[1], resolution)
    X, Y = np.meshgrid(x, y)

    Z = np.zeros_like(X)
    for i in range(resolution):
        for j in range(resolution):
            Z[i, j] = rastrigin(np.array([X[i, j], Y[i, j]]))

    return {
        'x': x.tolist(),
        'y': y.tolist(),
        'z': Z.tolist()
    }
