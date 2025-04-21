"""
Author: BlueSkull

Description:
This script builds and evaluates a Support Vector Regression (SVR) model for miRNA target score prediction
based on engineered biological features. It performs the following steps:

1. Loads training and testing datasets containing features such as log1p of seed regions, GC content,
   distribution score, and binding free energy.
2. Applies feature scaling using StandardScaler.
3. Tunes SVR hyperparameters using RandomizedSearchCV to find the optimal model.
4. Evaluates the model using Mean Squared Error (MSE) and a custom accuracy metric.
5. Saves the best trained SVR model using joblib.
6. Visualizes actual vs predicted scores to assess performance.

Input:
- 'TrainingData.csv': Training dataset with features and target score.
- 'TestData.csv': Test dataset for model evaluation.

Output:
- Prints the Mean Squared Error and best hyperparameters.
- Saves the trained model to 'best_svr_model.joblib'.
- Displays a plot comparing actual and predicted scores.
- Prints a custom accuracy metric based on thresholded error.

Dependencies:
- pandas, numpy, matplotlib, scikit-learn, joblib
"""

import pandas as pd
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import RandomizedSearchCV
from joblib import dump
import numpy as np
import matplotlib.pyplot as plt

# Load the training data
train_data = pd.read_csv('TrainingData.csv')
X_train = train_data[['log1p_custom', 'distribution_score', 'GCcontent','free_energy']]  # Features
y_train = train_data['score']  # Target: Score

# Load the test data
test_data = pd.read_csv('TestData.csv')
X_test = test_data[['log1p_custom', 'distribution_score', 'GCcontent','free_energy']]  # Features
y_test = test_data['score']  # Target: Score

# Feature scaling
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Create the SVR model
svr_model = SVR()

# Set up the hyperparameter grid for random search
param_dist = {
    'kernel': ['rbf', 'linear', 'poly'],
    'C': [0.1, 1, 10],
    'gamma': ['scale', 'auto'],
    'epsilon': [0.1, 0.01]
}

# Perform RandomizedSearchCV to find the best hyperparameters
random_search = RandomizedSearchCV(svr_model, param_distributions=param_dist, n_iter=10, cv=3, scoring='neg_mean_squared_error', n_jobs=-1, random_state=42)
random_search.fit(X_train_scaled, y_train)

# Get the best estimator
best_svr_model = random_search.best_estimator_

# Make predictions on the test data
y_pred = best_svr_model.predict(X_test_scaled)

# Evaluate the model: Mean Squared Error
mse = mean_squared_error(y_test, y_pred)
print(f'Mean Squared Error: {mse}')

# Save the trained model to a file
try:
    dump(best_svr_model, 'best_svr_model.joblib')
    print("Model saved successfully as 'best_svr_model.joblib'")
except Exception as e:
    print(f"Error saving model: {e}")

# Print the best hyperparameters found by RandomizedSearchCV
print("Best hyperparameters:", random_search.best_params_)

# Create a DataFrame to compare actual and predicted scores
comparison_df = pd.DataFrame({
    'Actual Score': y_test,
    'Predicted Score': y_pred
})

# Plot actual vs predicted scores
plt.figure(figsize=(10, 6))
plt.plot(y_test.values, label='Actual Score', marker='o')  # Convert y_test to values for compatibility
plt.plot(y_pred, label='Predicted Score', marker='x')
plt.title('Actual vs Predicted Scores')
plt.xlabel('Test Data Index')
plt.ylabel('Score')
plt.legend()
plt.grid(True)
plt.tight_layout()

# Display the plot
plt.show()

# Custom accuracy calculation
threshold = 10  # Define a threshold for acceptable error
accuracy = np.mean(np.abs(y_test - y_pred) < threshold)
print("Custom Training Accuracy:", accuracy)
