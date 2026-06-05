from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from algorithms.hill_climbing import hill_climbing
from algorithms.simulated_annealing import simulated_annealing
from algorithms.genetic_algorithm import genetic_algorithm
from problems.rastrigin import rastrigin, generate_surface
import time
import os

app = Flask(__name__, static_folder='static', static_url_path='')
CORS(app)


# ─────────────────────────────────────────────
# Serve React frontend (built files)
# ─────────────────────────────────────────────
@app.route('/')
def serve_index():
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    # SPA fallback: semua route non-API dikembalikan ke index.html
    return send_from_directory(app.static_folder, 'index.html')


# ─────────────────────────────────────────────
# API Endpoints
# ─────────────────────────────────────────────
@app.route('/api/optimize/hill-climbing', methods=['POST'])
def run_hill_climbing():
    data = request.get_json()
    variant = data.get('variant', 'simple')
    max_iter = int(data.get('max_iter', 500))
    step_size = float(data.get('step_size', 0.1))

    start = time.time()
    best_pos, best_energy, history = hill_climbing(
        rastrigin, variant=variant, max_iter=max_iter, step_size=step_size
    )
    elapsed = time.time() - start

    surface = generate_surface()
    return jsonify({
        'algorithm': 'Hill Climbing',
        'best_position': best_pos.tolist(),
        'best_energy': float(best_energy),
        'history': [float(h) for h in history],
        'execution_time': elapsed,
        'surface': surface
    })


@app.route('/api/optimize/simulated-annealing', methods=['POST'])
def run_simulated_annealing():
    data = request.get_json()
    t0 = float(data.get('t0', 100))
    cooling_rate = float(data.get('cooling_rate', 0.95))

    start = time.time()
    best_pos, best_energy, history = simulated_annealing(
        rastrigin, t0=t0, cooling_rate=cooling_rate
    )
    elapsed = time.time() - start

    surface = generate_surface()
    return jsonify({
        'algorithm': 'Simulated Annealing',
        'best_position': best_pos.tolist(),
        'best_energy': float(best_energy),
        'history': [float(h) for h in history],
        'execution_time': elapsed,
        'surface': surface
    })


@app.route('/api/optimize/genetic-algorithm', methods=['POST'])
def run_genetic_algorithm():
    data = request.get_json()
    pop_size = int(data.get('pop_size', 50))
    generations = int(data.get('generations', 100))
    mutation_rate = float(data.get('mutation_rate', 0.1))
    crossover_rate = float(data.get('crossover_rate', 0.8))

    start = time.time()
    best_pos, best_energy, history = genetic_algorithm(
        rastrigin,
        pop_size=pop_size,
        generations=generations,
        mutation_rate=mutation_rate,
        crossover_rate=crossover_rate
    )
    elapsed = time.time() - start

    surface = generate_surface()
    return jsonify({
        'algorithm': 'Genetic Algorithm',
        'best_position': best_pos.tolist(),
        'best_energy': float(best_energy),
        'history': [float(h) for h in history],
        'execution_time': elapsed,
        'surface': surface
    })


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 7860))
    app.run(host='0.0.0.0', port=port, debug=False)
