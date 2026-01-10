import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide", page_title="ВПР Дашборд")

# Читаем наш готовый HTML
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

import streamlit as st

# Скрываем кнопку Fork и другие элементы управления в самом Streamlit
st.markdown(
    """
    <style>
    /* Скрывает кнопку Fork */
    .stAppDeployButton {
        display: none !important;
    }
    /* Скрывает иконку GitHub/Fork в правом углу */
    [data-testid="stActionButtonIcon"] {
        display: none !important;
    }
    /* Скрывает всё верхнее меню */
    header {
        visibility: hidden;
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Инжектим HTML в Streamlit (на весь экран)
components.html(html_code, height=2000, scrolling=True)
