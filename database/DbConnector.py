import mysql.connector as mysql

class DbConnector:


    #Specify local DB instance info here!!!
    #USER, PASSWORD are potentially different on your own MySQL setup
    #Database "roddi" must be created in MySQL prior to any and all function calls
    def __init__(self, 
                 HOST="127.0.0.1", # localhost
                 DATABASE="roddi", # Your local DB 
                 USER="root",
                 PASSWORD=""):
        # Connect to the database
        try:
            self.db_connection = mysql.connect(host=HOST, database=DATABASE, user=USER, password=PASSWORD, port=3306)
        except Exception as e:
            print("ERROR: Failed to connect to db:", e)

        # Get the db cursor
        self.cursor = self.db_connection.cursor()
        print("Connected to:", self.db_connection.get_server_info())

        # Get database information
        self.cursor.execute("select database();")
        database_name = self.cursor.fetchone()
        print("You are connected to the database:", database_name)
        print("-----------------------------------------------\n")

    def close_connection(self):
        self.cursor.close()
        self.db_connection.close()
        print("\n-----------------------------------------------")
        print("Connection to %s is closed" % self.db_connection.get_server_info())