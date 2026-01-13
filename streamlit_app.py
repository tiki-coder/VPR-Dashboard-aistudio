import streamlit as st
import os

# Проверяем, существует ли собранный фронтенд
if os.path.exists("dist/index.html"):
    with open("dist/index.html", "r") as f:
        html_data = f.read()
    st.components.v1.html(html_data, height=1000, width=1200, scrolling=True)
else:
    st.error("Фронтенд не собран. Выполните 'npm install && npm run build' локально и закоммитьте dist/ в репозиторий.")
