#!/bin/bash -x
cp .env /home/ubuntu/backend/
cd /home/ubuntu/backend
directory=$(pwd)
echo "Directory is $directory"
npx kill-port 4000
npm install
npm start
echo "Successfully Deployed"