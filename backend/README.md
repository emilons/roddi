## Description of backend:

Using the DJANGO framework, DJANGO REST framework, and a connection to a localhost instance of MySQL, the backend folder is responsible for defining all tables with necessary constraints and the required URLs for altering and accessing these tables using REST API.

The (innermost) roddi folder is responsible for any and all settings, such as connection to MySQL and setup of JWT authentication. 

The api folder, named as such for the purpose of making readable URLs, contains all necessary models which consequently creates appropriate tables in MySQL. It also contains the URLs for allowing REST API (the communication between frontend and backend) to work as intended. Every GET, POST, PUT, UPDATE and DELETE used on the frontend-side is present here.

The media folder is used solely as a storage for all images uploaded by users, and an image is always associated with a particular row in a table. Currently, this folder is only used for saving the images uploaded by admins during an Item-creation on the website.
