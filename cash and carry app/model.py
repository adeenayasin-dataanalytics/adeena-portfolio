import streamlit as st
import pandas as pd
import numpy as np
import os
from datetime import datetime
import plotly.graph_objects as go
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor

# --- Page Setup ---
st.set_page_config(page_title="Cash & Carry Sales Prediction App", layout="wide")

# --- Header ---
st.markdown("""
<h1 style='color: #2E8B57;'>🛒 Cash & Carry Sales Prediction App</h1>
<h4 style='color: gray;'>Smart Retail · Smart Forecasting</h4>
<hr style='border: 1px solid #ccc; margin-top: 0;'>
""", unsafe_allow_html=True)

# --- Sidebar ---
st.sidebar.title("📌 App Sidebar")
st.sidebar.markdown("💬 **Feedback**")
st.sidebar.text_input("Your suggestion:")

# --- Load Data ---
@st.cache_data
def load_data():
    df = pd.read_csv("Data for Cash and Carry.csv")
    df['Date'] = pd.to_datetime(df['Date'], format="%m/%d/%Y")
    df['Sales (PKR)'] = df['Sales (PKR)'].str.replace(',', '', regex=True).astype(float)
    return df

df = load_data()

# --- Train Model ---
label_enc = LabelEncoder()
df['Category'] = label_enc.fit_transform(df['Category'])
X = df[['Date', 'Category']]
X['Date'] = X['Date'].apply(lambda x: x.toordinal())
y = df['Sales (PKR)']
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# --- Session State for History ---
if 'prediction_history' not in st.session_state:
    st.session_state.prediction_history = []

# --- Inputs ---
st.markdown("### 🔍 Select Date and Category")
date_input = st.date_input("Select Date:")
category_input = st.selectbox("Select Category:", label_enc.classes_)
category_encoded = label_enc.transform([category_input])[0]
date_encoded = datetime.toordinal(pd.to_datetime(date_input))

# --- Prediction ---
if st.button("🔮 Predict Sales"):
    input_data = np.array([[date_encoded, category_encoded]])
    prediction = model.predict(input_data)
    pred_value = float(prediction[0])
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # --- Save History
    record = {
        "DateTime": current_time,
        "Date": str(date_input),
        "Category": category_input,
        "Predicted Sales": f"{pred_value:.2f}"
    }
    st.session_state.prediction_history.append(record)
    df_row = pd.DataFrame([record])
    if not os.path.exists("prediction_history.csv"):
        df_row.to_csv("prediction_history.csv", index=False)
    else:
        df_row.to_csv("prediction_history.csv", mode='a', header=False, index=False)

    # --- Result Box
    st.markdown(f"""
    <div style='background-color:#f0fff0; padding: 20px; margin-bottom: 30px;
    border-left: 5px solid #2E8B57; border-radius: 10px;'>
        <h3>📅 {date_input} | 📦 {category_input}</h3>
        <h2 style='color: #2E8B57;'>💰 Predicted Sales: PKR {pred_value:,.2f}</h2>
        <p style='color: #555;'>Prediction time: {current_time}</p>
    </div>
    """, unsafe_allow_html=True)

    # --- Bar Chart
    fig = go.Figure(data=[
        go.Bar(
            x=["Predicted Sales"],
            y=[pred_value],
            marker_color="#2E8B57",
            text=[f"PKR {pred_value:,.0f}"],
            textposition='outside',
            width=0.4
        )
    ])
    fig.update_layout(
        title="Predicted Sales",
        xaxis=dict(showgrid=False),
        yaxis=dict(showgrid=True, gridcolor="#999999", zeroline=False),
        plot_bgcolor="white",
        paper_bgcolor="white",
        margin=dict(l=40, r=40, t=40, b=30),
        dragmode='zoom'
    )
    st.plotly_chart(fig, use_container_width=True)

    # --- Footer Line (just below bar chart)
    st.markdown("""
    <hr style='border: 1px solid #ccc; margin-top: 10px;'>
    <p style='text-align: center; font-size: 18px; font-weight: bold; color: #2E8B57; margin-bottom: 5px;'>
        🛍️ Powered by <span style='color:#1b6b5f;'>Cash & Carry Retail Intelligence</span> · Forecast Every Day
    </p>
    """, unsafe_allow_html=True)

# --- Sidebar History + Download
if st.session_state.prediction_history:
    st.sidebar.markdown("📜 **Prediction History**")
    for entry in reversed(st.session_state.prediction_history):
        st.sidebar.markdown(f"""
        <div style='border-left: 4px solid #2E8B57; padding-left: 10px;
        margin-bottom: 10px; background-color: #f9f9f9; border-radius: 6px;'>
            🕒 <strong>{entry['DateTime']}</strong><br>
            📅 {entry['Date']} | 📦 {entry['Category']}<br>
            💰 <span style='color: #2E8B57;'>PKR {entry['Predicted Sales']}</span>
        </div>
        """, unsafe_allow_html=True)

    st.sidebar.download_button(
        label="📥 Download Prediction History",
        data=pd.DataFrame(st.session_state.prediction_history).to_csv(index=False),
        file_name="prediction_history.csv",
        mime="text/csv"
    )
    





