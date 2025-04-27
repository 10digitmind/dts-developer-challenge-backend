This is the backend API for the Task Manager project built with Node.js, Express.

It provides endpoints to create, read, update, and delete tasks.


Tech Stack

Node.js

Express.js

postgressSql for relational data base 

dotenv (for environment variables)
---------------------------------------------------
How to set it up 

git clone https://github.com/10digitmind/dts-developer-challenge-backend.git
-------------------------------------------------------------
Navigate to my backend folder 
cd backend 
----------------------------
Install all the dependencies 
npm install
---------------------------
Create a .env file
PORT=5000

-----------------------------------
consist of the following end point 

Post method, Route - /api/createtask
Get Method,  Route - /api/getalltasks
Delete method Route - /api/deletetask/:id
Patch method Route - /api/updatetask/:id
Get method   Route - /api/getbyid/:id

---------------------------------
I used nodemon to wacth the sever and automatic update the code you can start the server with  the below script 

Npm run dev

