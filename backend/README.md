# Backend - Vault Drop (Node.js + PostgreSQL + S3)

This is the backend API for the vault drop application. It stores file metadata in PostgreSQL and files in AWS S3.

## Tech Stack  
- **Framework**: Node.js (Express)  
- **Database**: PostgreSQL  
- **Storage**: AWS S3  

##  Setup & Installation  

### Install Dependencies  

npm install

### env configuration  


Create a .env file in the backend folder with the following:

PORT=5000

DB_HOST=your-db-host
DB_PORT=5432
DB_USER=your-db-user
DB_PASS=your-db-password
DB_NAME=your-db-name

AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET_NAME=your-bucket-name
S3_REGION=your-region


### start application

npm start
