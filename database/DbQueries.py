from DbConnector import DbConnector
from tabulate import tabulate

#Query object needed for all function calls
class DbQueries:

    def __init__(self):
        self.connection = DbConnector()
        self.db_connection = self.connection.db_connection
        self.cursor = self.connection.cursor

    # Functions for creating tables

    # We have to look at how we do password, probably as a string that is hashed?
    # admin is boolean (as bit, either 1 or 0)
    def create_user_table(self):
        query = """ CREATE TABLE IF NOT EXISTS user (
                    id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50) NOT NULL,
                    email VARCHAR(50) UNIQUE NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    admin BIT(1),
                    PRIMARY KEY (id));
                """
        self.cursor.execute(query)
        self.db_connection.commit()

    def create_item_table(self):
        query = """ CREATE TABLE IF NOT EXISTS item (
                    id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(50),
                    description VARCHAR(255),
                    estate_id INT NOT NULL,
                    PRIMARY KEY (id),
                    FOREIGN KEY (estate_id) REFERENCES Estate(id) ON UPDATE CASCADE ON DELETE CASCADE);
                """
        self.cursor.execute(query)
        self.db_connection.commit()
    
    def create_estate_table(self):
        query = """ CREATE TABLE IF NOT EXISTS estate (
                    id INT NOT NULL AUTO_INCREMENT,
                    name VARCHAR(55) UNIQUE,
                    open BIT(1),
                    PRIMARY KEY (id));
                """
        self.cursor.execute(query)
        self.db_connection.commit()
    
    def create_users_in_estate_table(self):
        query = """ CREATE TABLE IF NOT EXISTS users_in_estate (
                    estate_id INT NOT NULL,
                    user_id INT NOT NULL,
                    PRIMARY KEY(estate_id, user_id),
                    FOREIGN KEY (estate_id) REFERENCES estate(id) ON UPDATE CASCADE ON DELETE CASCADE,
                    FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE);
                """
        self.cursor.execute(query)
        self.db_connection.commit()

    def create_user_item_table(self):
        query = """ CREATE TABLE IF NOT EXISTS user_item (
                    user_id INT NOT NULL,
                    item_id INT NOT NULL,
                    donate BIT(1) NOT NULL,
                    discard BIT(1) NOT NULL,
                    wanted BIT(1) NOT NULL,
                    wanted_level INT,
                    PRIMARY KEY(user_id, item_id),
                    FOREIGN KEY (user_id) REFERENCES user(id) ON UPDATE CASCADE ON DELETE CASCADE,
                    FOREIGN KEY (item_id) REFERENCES item(id) ON UPDATE CASCADE ON DELETE CASCADE); """
        
        self.cursor.execute(query)
        self.db_connection.commit()


    #Function for dropping any table
    def drop_table(self, table_name):
        query = """ DROP TABLE %s;
                    """
        self.cursor.execute(query % table_name)
        self.db_connection.commit()


    #Function for printing any table in python terminal
    def fetch_data(self, table_name):
        query = "SELECT * FROM %s"
        self.cursor.execute(query % table_name)
        rows = self.cursor.fetchall()
        print("Data from table %s:" % table_name)
        print(tabulate(rows, headers=self.cursor.column_names))
        return rows



    #Functions for creating and deleting rows in all tables

    #Email must be unique, ID is made with auto increment
    def create_user(self, name, email, password, admin):
        values = (name, email, password, admin)
        query = """ INSERT INTO user (name, email, password, admin)
                    VALUES (%s, %s, %s, %s);
                """
        self.cursor.execute(query, values)
        self.db_connection.commit()
    
    #Uses email to identify the user to be deleted
    def delete_user(self, email):
        values = (email,)
        query = """ DELETE FROM user WHERE email= %s;"""
        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Name must be unique, ID auto incremented 
    def create_estate(self, name, open_status):
        values = (name, open_status)
        query = """ INSERT INTO estate (name, open)
                    VALUES (%s, %s);"""
        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Uses name to identify estate to be deleted
    def delete_estate(self, name):
        values = (name,)
        query = """ DELETE FROM estate WHERE name= %s;"""

        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Combination of name and estate_name must be unique for entire system, in other words
    #only one item of name "X" can exist for a given estate
    def create_item(self, name, description, estate_name):
        values = (name, description, estate_name)
        query = """ INSERT INTO item (name, description, estate_id)
                    VALUES (%s, %s, (SELECT id FROM estate e WHERE e.name = %s));"""

        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Uses item name combined with estate_name to identify item to be deleted
    def delete_item(self, name, estate_name):
        values = (name, estate_name)
        query = """DELETE FROM item i WHERE i.name = %s AND 
                    estate_id = (SELECT e.id FROM estate e WHERE e.name = %s); """

        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Combination of estate_name and user_email must be unique
    def create_user_in_estate(self, estate_name, user_email):
        values = (estate_name, user_email)
        query = """ INSERT INTO users_in_estate (estate_id, user_id)
                    VALUES ((SELECT id FROM estate e WHERE e.name = %s), 
                    (SELECT id FROM user u WHERE u.email = %s));"""

        self.cursor.execute(query, values)
        self.db_connection.commit()

    #Uses estate_name combined with user_email to identify row to be deleted
    def delete_user_from_estate(self, estate_name, user_email):
        values = (estate_name, user_email)
        query = """DELETE FROM users_in_estate uie 
                   WHERE uie.estate_id = (SELECT e.id FROM estate e WHERE e.name = %s)
                   AND uie.user_id = (SELECT u.id FROM user u WHERE u.email = %s);"""

        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Combination of user_email and item_name x estate_name combo must be unique
    def create_user_item(self, user_email, item_name, estate_name, 
                            donate_bit, discard_bit, wanted_bit, wanted_level):
        values = (user_email, item_name, estate_name, 
                        donate_bit, discard_bit, wanted_bit, wanted_level)
        query = """INSERT INTO user_item (user_id, item_id, donate, discard, wanted, wanted_level)
                   VALUES ((SELECT u.id FROM user u WHERE u.email = %s),
                   (SELECT i.id FROM item i WHERE i.name = %s 
                    AND i.estate_id = (SELECT e.id FROM estate e WHERE e.name = %s)),
                    %s, %s, %s, %s);"""

        self.cursor.execute(query, values)
        self.db_connection.commit()


    #Uses user_email, item_name and estate_name to uniquely identify row to be deleted
    def delete_user_item(self, user_email, item_name, estate_name):
        values = (user_email, item_name, estate_name)
        query = """DELETE FROM user_item ui 
                   WHERE ui.user_id = (SELECT u.id FROM user u WHERE u.email = %s)
                   AND ui.item_id = (SELECT i.id FROM item i WHERE i.name = %s 
                   AND (SELECT e.id FROM estate e WHERE e.name = %s));"""

        self.cursor.execute(query, values)
        self.db_connection.commit()                                




def main():
    program = None
    program = DbQueries()

    #Run the five subsequent "create table" functions on the first run

    #program.create_user_table()
    #program.create_estate_table()
    #program.create_item_table()
    #program.create_users_in_estate_table()
    #program.create_user_item_table()


    if program:
        program.connection.close_connection()
    
if __name__ == '__main__':
    main()