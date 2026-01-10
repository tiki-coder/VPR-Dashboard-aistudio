import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide", page_title="ВПР Дашборд")

# Читаем наш готовый HTML
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

# Инжектим HTML в Streamlit (на весь экран)
components.html(html_code, height=2000, scrolling=True)
