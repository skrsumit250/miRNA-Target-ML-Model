import os
import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from joblib import load
from Computation import embedding
from Search import search_targets

app = Flask(__name__)
CORS(app)

# --- File Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.joblib')
CSV_OUTPUT_PATH = os.path.join(BASE_DIR, 'output.csv')

# --- Load ML Model ---
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
model = load(MODEL_PATH)
print("Model loaded successfully.")

# --- /predict Endpoint ---
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        if not data or 'miRNA' not in data or 'Gene' not in data:
            return jsonify({'error': 'Invalid request data', 'success': False}), 400

        miRNA = data['miRNA']
        Gene = data['Gene']
        result = embedding(miRNA, Gene)

        if len(result) < 6:
            return jsonify({'error': 'Insufficient features', 'success': False}), 500

        features = [result[2], result[3], result[4], result[5]]
        prediction = model.predict([features])

        return jsonify({
            'prediction': float(prediction[0]),
            'embedding_result': {
                'number_of_seed_region': result[0],
                'positions': result[1],
                'gc_content': result[4],
                'free_energy': result[5]
            },
            'success': True
        })
    except Exception as e:
        print(f"Error in /predict: {e}")
        return jsonify({'error': str(e), 'success': False}), 500

# --- /search Endpoint ---
@app.route('/search', methods=['POST'])
def search_mirna():
    try:
        data = request.get_json()
        if not data or 'miRNA' not in data:
            return jsonify({'error': 'Missing miRNA in request', 'success': False}), 400

        query_mirna = data['miRNA']
        result = search_targets(query_mirna)  # Now returns counts + entries

        return jsonify({
            'success': True,
            'message': 'Search completed. CSV file generated.',
            'match_counts': result['match_counts'],  # Send counts to frontend
        })
    except Exception as e:
        print(f"Error in /search: {e}")
        return jsonify({'error': str(e), 'success': False}), 500


# --- /download Endpoint ---
@app.route('/download', methods=['GET'])
def download_csv():
    try:
        if os.path.exists(CSV_OUTPUT_PATH):
            return send_file(
                CSV_OUTPUT_PATH,
                mimetype='text/csv',
                as_attachment=True,
                download_name='search_results.csv'
            )
        else:
            return jsonify({'error': 'CSV file not found for download.', 'success': False}), 404
    except Exception as e:
        print(f"Error in /download: {e}")
        return jsonify({'error': str(e), 'success': False}), 500



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)