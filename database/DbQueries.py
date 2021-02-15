from DbConnector import DbConnector
from tabulate import tabulate

class DbQueries:

    def __init__(self):
        self.connection = DbConnector()
        self.db_connection = self.connection.db_connection
        self.cursor = self.connection.cursor

    # Functions for creating tables

    # We have to look at how we do password, probably as a string that is hashed?
    # admin is boolean (as bit, either 1 or 0)
    def create_user(self):
        query = """ CREATE TABLE IF NOT EXISTS User (
                    id INT NOT NULL,
                    name VARCHAR(50),
                    email VARCHAR(50),
                    password VARCHAR(255),
                    admin BIT(1),
                    PRIMARY KEY (id)
                """
        self.cursor.execute(query)
        self.db_connection.commit()

    def fetch_data(self, table_name):
        query = "SELECT * FROM %s"
        self.cursor.execute(query % table_name)
        rows = self.cursor.fetchall()
        print("Data from table %s:" % table_name)
        print(tabulate(rows, headers=self.cursor.column_names))
        return rows


def main():
    program = None
    program = DbQueries()
    #program.create_user()
    #program.fetch_data()

    if program:
        program.connection.close_connection()
    
if __name__ == '__main__':
    main()