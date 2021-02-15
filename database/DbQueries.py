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
    def create_user_table(self):
        query = """ CREATE TABLE IF NOT EXISTS User (
                    id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    admin BIT(1),
                    PRIMARY KEY (id));
                """
        self.cursor.execute(query)
        self.db_connection.commit()

    def create_item_table(self):
        query = """ CREATE TABLE IF NOT EXISTS Item (
                    id INT NOT NULL,
                    estate_id INT NOT NULL,
                    name VARCHAR(50),
                    picture BLOB,
                    description VARCHAR(255),
                    wanted BIT(1),
                    dispose BIT(1),
                    donate BIT(1),
                    PRIMARY KEY (id),
                    FOREIGN KEY (estate_id) REFERENCES Estate(id));
                """
        self.cursor.execute(query)
        self.db_connection.commit()
    
    def create_estate_table(self):
        query = """ CREATE TABLE IF NOT EXISTS Estate (
                    id INT NOT NULL,
                    open BIT(1),
                    PRIMARY KEY (id));
                """
        self.cursor.execute(query)
        self.db_connection.commit()
    
    def create_users_in_estate_table(self):
        query = """ CREATE TABLE IF NOT EXISTS UsersInEstate (
                    estate_id INT NOT NULL,
                    email VARCHAR(50),
                    PRIMARY KEY(estate_id, email));
                """
        self.cursor.execute(query)
        self.db_connection.commit()

    def drop_table(self, table_name):
        query = """ DROP TABLE %s;
                """
        self.cursor.execute(query % table_name)
        self.db_connection.commit()
    
    def create_user(self, name, email, password, admin):
        values = (name, email, password, admin)
        query = """ INSERT INTO User (name, email, password, admin)
                    VALUES (%s, %s, %s, %s);
                """
        self.cursor.execute(query, values)
        self.db_connection.commit()
    
    def drop_user(self, id):
        query = " DELETE FROM User WHERE id=" + str(id) + "; "
        self.cursor.execute(query, id)
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
    program.create_user('Mikkel', 'mikkel@abc.no', '123', 1)
    program.fetch_data('User')

    if program:
        program.connection.close_connection()
    
if __name__ == '__main__':
    main()