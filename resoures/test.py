from sklearn.preprocessing import MinMaxScaler
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
from keras.models import Sequential
from keras.layers import Dense, LSTM, Input
import tensorflow as tf

# -------------------------------
# Download stock data
# -------------------------------
now = datetime.now()
tickers = 'AAPL'
start = datetime(now.year - 10, now.month, now.day)

df = yf.download(tickers=tickers, start=start, end=now)
df = df.reset_index()

# -------------------------------
# Moving Averages
# -------------------------------
df['MA_100'] = df['Close'].rolling(100).mean()
df['MA_200'] = df['Close'].rolling(200).mean()

plt.figure(figsize=(12, 6))
plt.plot(df['Date'], df['Close'], label='Close Price', color='blue')
plt.plot(df['Date'], df['MA_100'], label='100-Day MA', color='g')
plt.plot(df['Date'], df['MA_200'], label='200-Day MA', color='red')
plt.title('100 & 200-Day Moving Averages')
plt.xlabel('Date')
plt.ylabel('Price')
plt.legend()
plt.grid(True)
plt.show()

# -------------------------------
# Percentage Change
# -------------------------------
df['percentage change'] = df['Close'].pct_change()
plt.figure(figsize=(12, 6))
plt.plot(df['percentage change'].dropna())
plt.title('Daily Percentage Change')
plt.show()

# -------------------------------
# Train-Test Split (70/30)
# -------------------------------
training_data = pd.DataFrame(df['Close'][:int(len(df)*0.7)])
testing_data = pd.DataFrame(df['Close'][int(len(df)*0.7):])

# -------------------------------
# Scaling
# -------------------------------
scaler = MinMaxScaler(feature_range=(0, 1))
training_data_array = scaler.fit_transform(training_data)

# -------------------------------
# Prepare Training Data
# -------------------------------
x_train, y_train = [], []
for i in range(100, len(training_data_array)):
    x_train.append(training_data_array[i-100:i])
    y_train.append(training_data_array[i, 0])

x_train, y_train = np.array(x_train), np.array(y_train)

# -------------------------------
# Build LSTM Model
# -------------------------------
model = Sequential()
model.add(Input(shape=(100, 1)))
model.add(LSTM(units=128, activation='tanh', return_sequences=True))
model.add(LSTM(units=64))
model.add(Dense(units=25))
model.add(Dense(units=1))

model.compile(optimizer='adam', loss='mean_squared_error')
model.fit(x_train, y_train, epochs=50)

model.summary()
model.save('stock_prediction.keras')

# -------------------------------
# Prepare Testing Data
# -------------------------------
past_100_days_data = training_data.tail(100)
final_db = pd.concat([past_100_days_data, testing_data], ignore_index=True)

# ⚠️ Only transform using the fitted scaler
input_data = scaler.transform(final_db)

x_test, y_test = [], []
for i in range(100, input_data.shape[0]):
    x_test.append(input_data[i-100:i])
    y_test.append(input_data[i, 0])

x_test, y_test = np.array(x_test), np.array(y_test)

# -------------------------------
# Predictions
# -------------------------------
y_predicted = model.predict(x_test)
y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

# -------------------------------
# Plot Results
# -------------------------------
plt.figure(figsize=(12, 6))
plt.plot(y_test, 'b', label='Original Price')
plt.plot(y_predicted, 'y', label='Predicted Price')
plt.xlabel('Days')
plt.ylabel('Price')
plt.legend()
plt.show()
