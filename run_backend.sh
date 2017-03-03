#!/bin/bash
#
# Start the MongoDB service
# echo"[info] Starting the Mongo Daemon..."
# sudo service mongod start

#	Load data included in mock_data.js into table apcdata
echo "[info] Creating new mongoDB database from database/mock_data.js..."
mongo apcdata database/dropAllCollections.js
mongoimport --db apcdata --collection courses --type json --file ./database/courseData.json --jsonArray
mongo apcdata database/mock_data.js

#	Start the java backend
if [ -e ./database/ApcBackend/target/ApcBackend-1.1.3-jar-with-dependencies.jar ] 
then
	echo "[info] Copying original jar file to proper directory"
	cp ./database/ApcBackend/target/ApcBackend-1.1.3-jar-with-dependencies.jar ./apcBackend_current.jar
fi

if [ -e ./apcBackend_current.jar ]
then
	echo "[info] Starting jar..."
	java -jar apcBackend_current.jar
else
	echo "[error] jar file not found! Exiting."
fi 
