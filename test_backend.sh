#!/bin/bash
#
# Start the MongoDB service
# sudo service mongod start

#	Load data included in mock_data.js into table apcdata
mongo apcdata database/dropAllCollections.js
mongoimport --db apcdata --collection courses --type json --file ./database/courseData.json --jsonArray
mongo apcdata database/mock_data.js

#	Start the java backend
java -jar database/ApcBackend/target/ApcBackend-1.1.3-jar-with-dependencies.jar 
