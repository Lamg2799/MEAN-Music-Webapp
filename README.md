# MeanMusicWebapp

## Sample images are provided in the sample-images folder

## Description

- This is a music manager built with the MEAN STACK (Mongodb, ExpressJs, Angular, NodeJs). 
- This app allows users to create an account, upload music with the account and listen to the uploaded music.

## Features

- Includes a REST API in node for backend functionality.
- Login, register, logout and general authentication for page access.
- The ability to upload music and retrieve music from AWS S3.
- The ability to click on and listen to music that has been uploaded.
- A filtering functionality for music.

# Requirements

- Mongodb.
- NodeJs (dependencies such as express installed via "npm install").
- Angular (dependencies installed via "npm install").
- .env file within the backend with aws s3 credentials stored within "/backend/node/" (bad practice to share this publicly).

# Instructions

- Clone repo and create a mongo db with the same credentials and database as in "/backend/node/express-dataserver.js".
- Run "mongod".
- Navigate to both frontend and backend and run "npm install".
- Navigate to "/backend/node/" and run "node express-dataserver.js".
- Navigate to "/frontend/" and run "ng serve".
