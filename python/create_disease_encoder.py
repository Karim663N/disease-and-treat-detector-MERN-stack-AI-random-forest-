from sklearn.preprocessing import LabelEncoder
import pickle

# Example diseases list; make sure this list matches your dataset
diseases = ['flu', 'covid', 'normal', 'allergy', 'asthma', 'migraine']  # Ensure no duplicates

# Initialize the LabelEncoder and fit it to the list of diseases
disease_encoder = LabelEncoder()
disease_encoder.fit(diseases)

# Save the label encoder to a file
with open('disease_encoder.pkl', 'wb') as f:
    pickle.dump(disease_encoder, f)

print("Disease encoder saved successfully.")
