#!/bin/bash
#
# Start the MongoDB service
# sudo service mongod start

#	Load data included in mock_data.js into table apcdata
mongo apcdata mock_data.js

#	Start the java backend
#java -jar ApcBackend-0.1-jar-with-dependencies.jar
java -jar ApcBackend/target/ApcBackend-1.0_2-jar-with-dependencies.jar
 

