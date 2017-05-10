/**
 * Run this script throug the command line:
 *  $>>	mongo <dbname> mock_data.js
 */

/**
 * Recreate all collections
 */
users = [
			{ name : "Bradley N. Miller",
			  email : "bmiller@luther.edu",
			  dept : ["CS"],
			  chairs : ["APC", "CS"],
			  recentlyViewed : []
			}
		];
depts = [
			{ "name" : "Accounting",
			  "abbrev" : "ACCTG",
			  "division" : "Mathematics, Science and Physical Education"
			},
			{ "name" : "Africana Studies",
			  "abbrev" : "AFRS",
			  "division" : "History and Social Sciences"
			},
			{ "name" : "Anthropology",
			  "abbrev": "ANTH",
			  "division" : "History and Social Sciences"
			},
			{ "name" : "Art",
			  "abbrev" : "ART",
			  "division" : "Humanities and Fine Arts"
			},
			{ "name" : "Art History",
			  "abbrev" : "ARTH",
			  "division" : "History and Social Sciences"
			},
			{ "name" : "Aisian Studies",
			  "abbrev" : "AS",
			  "division" : "History and Social Sciences"
			},
			{ "name" : "Athletic Training",
		 	  "abbrev" : "ATHTR",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
		 	{ "name" : "Biology",
		 	  "abbrev" : "BIO",
		 	  "division": "Mathematics, Science and Physical Education"
		 	},
		 	{ "name" : "Chemistry",
		 	  "abbrev" : "CHEM",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
		 	{ "name" : "Chinese",
		 	  "abbrev" : "CHIN",
		 	  "division" : "Humanities and Fine Arts"
		 	},
		 	{ "name" : "Classics",
		 	  "abbrev" : "CLAS",
		 	  "division" : "Humanities and Fine Arts"
		 	},
		 	{ "name" : "Commuication Studies",
		 	  "abbrev" : "COMS",
		 	  "division" : "History and Social Sciences"
		 	},
		 	{ "name" : "Computer Science",
		 	  "abbrev" : "CS",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
		 	{ "name" : "Dance",
		 	  "abbrev" : "DAN",
		 	  "division" : "Humanities and Fine Arts"
		 	},
		 	{ "name" : "Data Science",
		 	  "abbrev" : "DS",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
		 	{ "name" : "Economics",
		 	  "abbrev" : "ECON",
		 	  "division" : "History and Social Sciences"
		 	},
		 	{ "name" : "Education",
		 	  "abbrev" : "EDUC",
		 	  "division" : "History and Social Sciences"
		 	},
		 	{ "name" : "English",
		 	  "abbrev" : "ENG",
		 	  "division" : "Humanities and Fine Arts"
			},
			{ "name" : "Environmental Science",
			  "abbrev" : "ENVS"
			},
            { "name" : "Foreign Culture",
              "abbrev" : "FCUL",
		 	  "division" : "History and Social Sciences"
            },
			{ "name" : "French",
			  "abbrev" : "FREN",
		 	  "division" : "Humanities and Fine Arts"
			},
			{ "name" : "German",
			  "abbrev" : "GER",
		 	  "division" : "Humanities and Fine Arts"
			},
			{ "name" : "Greek",
			  "abbrev" : "GRK",
		 	  "division" : "Humanities and Fine Arts"
			},
            { "name": "Global Studies",
              "abbrev": "GS",
		 	  "division" : "History and Social Sciences"
            },
			{ "name" : "Health",
			  "abbrev" : "HLTH",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
			{
			  "name" : "Hebrew",
			  "abbrev" : "HEB",
		 	  "division" : "Humanities and Fine Arts"
			},
			{ "name" : "History",
			  "abbrev" : "HIST",
		 	  "division" : "History and Social Sciences"
			},
            { "name": "Honor",
              "abbrev": "HONR"
            },
          	{ "name": "Intermedia Arts",
              "abbrev": "IMA",
		 	  "division" : "Humanities and Fine Arts"
          	},
            { "name": "Information Systems",
              "abbrev": "INSYS",
		 	  "division" : "History and Social Sciences"
          	},
            { "name": "International Studies",
              "abbrev": "IS",
		 	  "division" : "History and Social Sciences"
            },
			{
			  "name" : "International Studies",
			  "abbrev" : "IS",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Italian",
			  "abbrev" : "ITAL",
		 	  "division" : "Humanities and Fine Arts"
			},
			{
			  "name" : "Journalism",
			  "abbrev" : "JOUR",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Latin",
			  "abbrev" : "LAT",
		 	  "division" : "Humanities and Fine Arts"
			},
			{
			  "name" : "Linguistics",
			  "abbrev" : "LING",
		 	  "division" : "Humanities and Fine Arts"
			},
            { "name" : "Library and Information Studies",
			  "abbrev" : "LIST",
		 	  "division" : "History and Social Sciences"
            },
			{ "name" : "Management",
			  "abbrev" : "MGT",
		 	  "division" : "History and Social Sciences"
			},
			{ "name" : "Mathematics",
			  "abbrev" : "MATH",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
			{ "name" : "Museums Studies",
			  "abbrev" : "MUST",
		 	  "division" : "History and Social Sciences"
			},
			{ "name" : "Music",
			  "abbrev" : "MUS",
		 	  "division" : "Humanities and Fine Arts"
			},
            { "name" : "Neuroscience",
              "abbrev" : "NEUR",
		 	  "division" : "Mathematics, Science and Physical Education"
            },
			{ "name" : "Nordic Studies",
			  "abbrev" : "SCST",
		 	  "division" : "History and Social Sciences"
			},
			{ "name" : "Nursing",
			  "abbrev" : "NURS",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
            { "name" : "Off Campus Studies",
			  "abbrev" : "OC"
			},
			{ "name" : "Paideia",
			  "abbrev" : "PAID"
			},
			{ "name" : "Paideia 2",
			  "abbrev" : "PAID2"
			},
			{ "name" : "Philosophy",
			  "abbrev" : "PHIL",
		 	  "division" : "Humanities and Fine Arts"
			},
			{
			  "name" : "Physical Education",
			  "abbrev" : "PE",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
			{
			  "name" : "Physics",
			  "abbrev" : "PHYS",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
			{
			  "name" : "Political Science",
			  "abbrev" : "POLS",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Psychology",
			  "abbrev" : "PSYC",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Religion",
			  "abbrev" : "REL",
		 	  "division" : "Humanities and Fine Arts"
			},
			{
			  "name" : "Russian Studies",
			  "abbrev" : "RUS",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Scandinavian Studies",
			  "abbrev" : "SCST",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Science",
			  "abbrev" : "SCI",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
			{
			  "name" : "Social Work",
			  "abbrev" : "SW",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Sociology",
			  "abbrev" : "SOC",
		 	  "division" : "History and Social Sciences"
			},
			{
			  "name" : "Spanish",
			  "abbrev" : "SPAN",
		 	  "division" : "Humanities and Fine Arts"
			},
			{
			  "name" : "Theatre",
			  "abbrev" : "THE",
		 	  "division" : "Humanities and Fine Arts"
			},
			{
			  "name" : "Women and Gender Studies",
			  "abbrev" : "WGST",
		 	  "division" : "History and Social Sciences"
			}
		];

db.depts.insert(depts);
db.depts.createIndex({"abbrev" : 1});

//assign divisions to the users based on departments
var user;
for (var i=0; i < users.length; i++) {
	user = users[i];
	var query = {"abbrev": { $in : user.dept }, "division" : {$exists : true}};
	var memberDepts = db.depts.find(query);
	user["division"] = [];
	while (memberDepts.hasNext()) {
		var dept = memberDepts.next();
		if (user.division.indexOf(dept.division) == -1) {
			user.division.push(dept.division);
		}
	}
}

db.users.insert(users);