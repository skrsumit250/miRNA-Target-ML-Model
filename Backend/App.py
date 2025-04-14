import os
import json
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from joblib import load
from Computation import embedding  # Make sure this exists
from Search import search_targets

app = Flask(__name__)
CORS(app)

# --- File Paths ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.joblib')
JSON_DATA_PATH = os.path.join(BASE_DIR, 'data.json')
CSV_OUTPUT_PATH = os.path.join(BASE_DIR, 'output.csv')  # Assuming this is where your CSV is saved

# --- Load ML Model ---
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")
model = load(MODEL_PATH)
print("Model loaded successfully.")

# --- Load JSON Data ---
try:
    with open(JSON_DATA_PATH, 'r') as f:
        mirna_target_data = json.load(f)
    if not isinstance(mirna_target_data, list):
        raise ValueError("Expected data.json to contain a list of entries.")
    print("JSON data loaded successfully.")
except FileNotFoundError:
    print(f"Warning: {JSON_DATA_PATH} not found.")
    mirna_target_data = []
except json.JSONDecodeError:
    raise ValueError(f"Invalid JSON format in {JSON_DATA_PATH}")

# --- Helper: Seed Region Similarity ---
def search_similarity(s1, s2):
    if not s1 or not s2:
        return 0
    if len(s1) >= 8 and len(s2) >= 8 and s1[0:8] == s2[0:8]:
        return 8
    if len(s1) >= 8 and len(s2) >= 8 and s1[1:8] == s2[1:8]:
        return 7
    if len(s1) >= 7 and len(s2) >= 7 and s1[1:7] == s2[1:7]:
        return 6
    return 0

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
        matching_entries = search_targets(query_mirna)

        return jsonify({
            'success': True,
            'message': 'Search completed. CSV file was generated.',
            'matches': matching_entries
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