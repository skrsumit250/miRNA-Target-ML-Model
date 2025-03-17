from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
from Computation import embedding  # Assuming this exists


app = Flask(__name__)
CORS(app)  # Enable CORS for all origins and methods.

# Load the trained model
model = load('./Backend/best_svr_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()  # Use get_json() for parsing JSON
        if not data or 'miRNA' not in data or 'Gene' not in data:
            return jsonify({'error': 'Invalid request data'}), 400

        miRNA = data['miRNA']
        Gene = data['Gene']

        result = embedding(miRNA, Gene)  # Call embedding function

        # Extract features for prediction
        features = [result[2], result[3], result[4], result[5]]

        # Make a prediction using the model
        prediction = model.predict([features])

        # Return both the prediction and the result to the client
        return jsonify({
            'prediction': float(prediction[0]),  # Convert prediction to float
            'embedding_result': {
                'number_of_seed_region': result[0],
                'positions': result[1],
                'log1p': result[2],
                'distribution_score': result[3],
                'gc_content': result[4],
                'free_energy': result[5]
            }
        })
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
