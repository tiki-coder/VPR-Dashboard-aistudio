import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(layout="wide", page_title="ВПР Дашборд")

# Читаем наш готовый HTML
with open("index.html", "r", encoding="utf-8") as f:
    html_code = f.read()

# Если `index.html` ссылается на локальные .ts/.tsx модули — фронтенд
# скорее всего не собран. Показываем понятное сообщение с инструкциями
if "index.tsx" in html_code or ".tsx" in html_code or ".ts" in html_code:
    st.markdown(
        """
        <style>
        /* Скрывает кнопку Fork и лишние элементы Streamlit */
        header { visibility: hidden; }
        </style>
        """,
        unsafe_allow_html=True,
    )

    st.error("Фронтенд не собран или подключён как TypeScript/TSX. Загрузка зависла.")
    st.markdown(
        "Чтобы встроить приложение, сначала соберите фронтенд (в корне проекта):"
    )
    st.code("npm install\nnpm run build", language="bash")
    st.markdown(
        "Либо отредактируйте `index.html`, чтобы он подключал уже собранный бандл JS вместо `index.tsx`."
    )
else:
    # Скрываем кнопку Fork и другие элементы управления в самом Streamlit
    st.markdown(
        """
        <style>
        /* Скрывает кнопку Fork */
        .stAppDeployButton { display: none !important; }
        /* Скрывает иконку GitHub/Fork в правом углу */
        [data-testid="stActionButtonIcon"] { display: none !important; }
        /* Скрывает всё верхнее меню */
        header { visibility: hidden; }
        </style>
        """,
        unsafe_allow_html=True,
    )

    # Инжектим HTML в Streamlit (на весь экран)
    components.html(html_code, height=2000, scrolling=True)
