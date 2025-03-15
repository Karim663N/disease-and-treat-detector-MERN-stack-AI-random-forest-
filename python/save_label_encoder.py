from sklearn.preprocessing import LabelEncoder
import pickle

# List of all possible diseases (replace this with your actual diseases)
diseases = ['disease1', 'disease2', 'disease3', 'disease4']  # Example diseases

# Initialize the LabelEncoder and fit it to the list of diseases
disease_encoder = LabelEncoder()
disease_encoder.fit(diseases)

# Save the label encoder to a file
with open('disease_encoder.pkl', 'wb') as f:
    pickle.dump(disease_encoder, f)

print("Disease encoder saved successfully.")
