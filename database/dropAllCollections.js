/**
 * Run this script throug the command line:
 *  $>>	mongo <dbname> mock_data.js
 */

 /**
 * Drop all existing collections
 */
db.users.drop();
db.depts.drop();
db.courses.drop();
db.proposals.drop();
db.archives.drop();
