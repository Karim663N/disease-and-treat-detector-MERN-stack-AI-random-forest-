from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Load the trained model
with open('disease_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

# Load the trained label encoder for diseases
with open('disease_encoder.pkl', 'rb') as disease_encoder_file:
    disease_encoder = pickle.load(disease_encoder_file)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    print("Received data:", data)

    required_fields = ['age', 'forehead', 'neck', 'chest', 'belly']
    missing_fields = [field for field in required_fields if field not in data]
    if missing_fields:
        return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

    # Validate the age separately, ensuring it is an integer
    if not isinstance(data.get('age'), int):
        return jsonify({'error': 'Invalid age value, must be an integer'}), 400
    age = data['age']
    print(f"Age: {age}")

    # Extract symptoms (numbers instead of string labels)
    symptoms = [data['forehead'], data['neck'], data['chest'], data['belly']]

    # Ensure all symptom values are valid
    valid_symptoms_values = [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15]
    for symptom in symptoms:
        if symptom not in valid_symptoms_values:
            return jsonify({'error': f'Invalid symptom value: {symptom}'}), 400

    # Handle missing symptoms, e.g., treat empty as "none" (represented by 5)
    #symptoms = [s if s != '' else 5 for s in symptoms] #no need to handle empty strings as the validation above will catch missing values

    # Create a DataFrame for the input features
    features_df = pd.DataFrame({
        'age': [age],
        'forehead': [symptoms[0]],
        'neck': [symptoms[1]],
        'chest': [symptoms[2]],
        'belly': [symptoms[3]]
    })
    print("Features for prediction:", features_df)

    # Ensure all values in the DataFrame are standard Python types (not np.int64)
    features_df = features_df.applymap(lambda x: int(x) if isinstance(x, np.int64) else x)

    # Make the prediction
    try:
        prediction = model.predict(features_df)  # Use the DataFrame directly
        print(f"Raw prediction (encoded label): {prediction}")  # Debugging line
        predicted_label = prediction[0]  # Get the predicted label

        # Decode the label back to the disease name using the disease encoder
        predicted_disease = disease_encoder.inverse_transform([predicted_label])[0]
        print(f"Predicted disease (decoded label): {predicted_disease}")  # Debugging line
    except Exception as e:
        return jsonify({'error': f'Error making prediction: {str(e)}'}), 500

    # Return the disease name
    return jsonify({'predicted_disease': str(predicted_disease)})

if __name__ == '__main__':
    app.run(debug=True, port=5001)