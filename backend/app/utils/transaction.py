from app.config.db import get_connection

class Transaction:
    def __enter__(self):
        self.conn = get_connection()
        self.cur = self.conn.cursor()
        return self.cur

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.conn.rollback()
            print("Transaction rolled back")
        else:
            self.conn.commit()
            print("Transaction committed")
        
        self.cur.close()
        self.conn.close()