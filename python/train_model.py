from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import pandas as pd
import pickle
from sklearn.preprocessing import LabelEncoder

# Load the dataset from CSV
df = pd.read_csv("data.csv")  # Assuming your CSV file is named 'data.csv'

# Initialize LabelEncoder for disease
le_disease = LabelEncoder()

# Apply Label Encoding to the disease column
df['disease'] = le_disease.fit_transform(df['disease'])

# Save the label encoder
with open('disease_encoder.pkl', 'wb') as f:
    pickle.dump(le_disease, f)

# Define features (X) and target (y)
X = df.drop('disease', axis=1)
y = df['disease']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save the trained model
with open('disease_model.pkl', 'wb') as model_file:
    pickle.dump(model, model_file)

print("Model, disease encoder saved.")