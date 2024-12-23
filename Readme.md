# Criar ambiente virtual
python -m venv ambiente

# Ativar ambiente virtual
ambiente\Scripts\activate

pip install -r requirements.txt
python manage.py runserver