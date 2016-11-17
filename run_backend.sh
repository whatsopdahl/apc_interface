#!/bin/bash
#
# Start the MongoDB service
# sudo service mongod start

#	Load data included in mock_data.js into table apcdata
mongo apcdata database/mock_data.js

#	Start the java backend
java -jar apcBackend_v1_1_1.jar 
