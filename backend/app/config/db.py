import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="micro_lending",
        user="postgres",
        password="Suprajna@2006",
        host="localhost",
        port="5432"
    )