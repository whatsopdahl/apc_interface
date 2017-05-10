#!/bin/bash
#
# Start the MongoDB service
# echo"[info] Starting the Mongo Daemon..."
# sudo service mongod start

#	Load data included in mock_data.js into table apcdata
echo "[info] Creating new mongoDB database from database/mock_data.js..."
mongo apcdata ./dropAllCollections.js
mongoimport --db apcdata --collection courses --type json --file ./courseData.json --jsonArray
mongo apcdata ./mock_data.js
