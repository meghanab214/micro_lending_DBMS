import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="micro_lending",
        user="postgres",
        password="yourpassword",
        host="localhost",
        port="5432"
    )