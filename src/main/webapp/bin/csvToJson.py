import pandas as pd
import json

genEds = ["BL","SKL","WEL","REL","NWL","NWNL","HB","HBSSM","HE","HEPT","INTCL","HIST","QUANT"]

depts =  {"ACCTG" : 
			{ "name" : "Accounting",
			  "abbrev" : "ACCTG",
			  "division" : "Mathematics, Science and Physical Education"
			},
          "AFRS" :
			{ "name" : "Africana Studies",
			  "abbrev" : "AFRS",
			  "division" : "History and Social Sciences"
			},
          "ANTH" :
			{ "name" : "Anthropology",
			  "abbrev": "ANTH",
			  "division" : "History and Social Sciences"
			},
          "ART" :
			{ "name" : "Art",
			  "abbrev" : "ART",
			  "division" : "Humanities and Fine Arts"
			},
          "ARTH" :
			{ "name" : "Art History",
			  "abbrev" : "ARTH",
			  "division" : "History and Social Sciences"
			},
          "AS" :
			{ "name" : "Aisian Studies",
			  "abbrev" : "AS",
			  "division" : "History and Social Sciences"
			},
          "ATHTR" :
			{ "name" : "Athletic Training",
		 	  "abbrev" : "ATHTR",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
          "BIO" :
		 	{ "name" : "Biology",
		 	  "abbrev" : "BIO",
		 	  "division": "Mathematics, Science and Physical Education"
		 	},
          "CHEM" :
		 	{ "name" : "Chemistry",
		 	  "abbrev" : "CHEM",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
          "CHIN" :
		 	{ "name" : "Chinese",
		 	  "abbrev" : "CHIN",
		 	  "division" : "Humanities and Fine Arts"
		 	},
          "CLAS" :
		 	{ "name" : "Classics",
		 	  "abbrev" : "CLAS",
		 	  "division" : "Humanities and Fine Arts"
		 	},
          "COMS" :
		 	{ "name" : "Commuication Studies",
		 	  "abbrev" : "COMS",
		 	  "division" : "History and Social Sciences"
		 	},
          "CS" :
		 	{ "name" : "Computer Science",
		 	  "abbrev" : "CS",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
          "DAN" :
		 	{ "name" : "Dance",
		 	  "abbrev" : "DAN",
		 	  "division" : "Humanities and Fine Arts"
		 	},
          "DS" :
		 	{ "name" : "Data Science",
		 	  "abbrev" : "DS",
		 	  "division" : "Mathematics, Science and Physical Education"
		 	},
          "ECON" :
		 	{ "name" : "Economics",
		 	  "abbrev" : "ECON",
		 	  "division" : "History and Social Sciences"
		 	},
          "EDUC" :
		 	{ "name" : "Education",
		 	  "abbrev" : "EDUC",
		 	  "division" : "History and Social Sciences"
		 	},
          "ENG" :
		 	{ "name" : "English",
		 	  "abbrev" : "ENG",
		 	  "division" : "Humanities and Fine Arts"
			},
          "ENVS" :
			{ "name" : "Environmental Science",
			  "abbrev" : "ENVS"
			},
          "FCUL" :
            { "name" : "Foreign Culture",
              "abbrev" : "FCUL",
		 	  "division" : "History and Social Sciences"
            },
          "FREN" :
			{ "name" : "French",
			  "abbrev" : "FREN",
		 	  "division" : "Humanities and Fine Arts"
			},
          "GER" :
			{ "name" : "German",
			  "abbrev" : "GER",
		 	  "division" : "Humanities and Fine Arts"
			},
          "GRK" :
			{ "name" : "Greek",
			  "abbrev" : "GRK",
		 	  "division" : "Humanities and Fine Arts"
			},
          "GS" :
            { "name": "Global Studies",
              "abbrev": "GS",
		 	  "division" : "History and Social Sciences"
            },
          "HLTH" :
			{ "name" : "Health",
			  "abbrev" : "HLTH",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
          "HEB" :
			{
			  "name" : "Hebrew",
			  "abbrev" : "HEB",
		 	  "division" : "Humanities and Fine Arts"
			},
          "HIST" :
			{ "name" : "History",
			  "abbrev" : "HIST",
		 	  "division" : "History and Social Sciences"
			},
          "HONR" :
            { "name": "Honor",
              "abbrev": "HONR"
            },
          "IMA" : 
          	{ "name": "Intermedia Arts",
              "abbrev": "IMA",
		 	  "division" : "Humanities and Fine Arts"
          	},
          "INSYS" :
            { "name": "Information Systems",
              "abbrev": "INSYS",
		 	  "division" : "History and Social Sciences"
          	},
          "INTS" :
            { "name": "International Studies",
              "abbrev": "IS",
		 	  "division" : "History and Social Sciences"
            },
          "IS" :
			{
			  "name" : "International Studies",
			  "abbrev" : "IS",
		 	  "division" : "History and Social Sciences"
			},
          "ITAL" :
			{
			  "name" : "Italian",
			  "abbrev" : "ITAL",
		 	  "division" : "Humanities and Fine Arts"
			},
          "JOUR" :
			{
			  "name" : "Journalism",
			  "abbrev" : "JOUR",
		 	  "division" : "History and Social Sciences"
			},
          "LAT" :
			{
			  "name" : "Latin",
			  "abbrev" : "LAT",
		 	  "division" : "Humanities and Fine Arts"
			},
          "LING" :
			{
			  "name" : "Linguistics",
			  "abbrev" : "LING",
		 	  "division" : "Humanities and Fine Arts"
			},
          "LIST" :
            { "name" : "Library and Information Studies",
			  "abbrev" : "LIST",
		 	  "division" : "History and Social Sciences"
            },
          "MGT" :
			{ "name" : "Management",
			  "abbrev" : "MGT",
		 	  "division" : "History and Social Sciences"
			},
          "MATH" :
			{ "name" : "Mathematics",
			  "abbrev" : "MATH",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
          "MUST" :
			{ "name" : "Museums Studies",
			  "abbrev" : "MUST",
		 	  "division" : "History and Social Sciences"
			},
          "MUS":
			{ "name" : "Music",
			  "abbrev" : "MUS",
		 	  "division" : "Humanities and Fine Arts"
			},
          "NEUR" :
            { "name" : "Neuroscience",
              "abbrev" : "NEUR",
		 	  "division" : "Mathematics, Science and Physical Education"
            },
          "SCST" :
			{ "name" : "Nordic Studies",
			  "abbrev" : "SCST",
		 	  "division" : "History and Social Sciences"
			},
          "NURS" :
			{ "name" : "Nursing",
			  "abbrev" : "NURS",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
          "OC" :
            { "name" : "Off Campus Studies",
			  "abbrev" : "OC"
			},
          "PAID" :
			{ "name" : "Paideia",
			  "abbrev" : "PAID" 
			},
          "PAID2" :
			{ "name" : "Paideia 2",
			  "abbrev" : "PAID2"
			},
          "PHIL" :
			{ "name" : "Philosophy",
			  "abbrev" : "PHIL",
		 	  "division" : "Humanities and Fine Arts"
			},
          "PE" :
			{
			  "name" : "Physical Education",
			  "abbrev" : "PE",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
          "PHYS" :
			{
			  "name" : "Physics",
			  "abbrev" : "PHYS",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
          "POLS" :
			{
			  "name" : "Political Science",
			  "abbrev" : "POLS",
		 	  "division" : "History and Social Sciences"
			},
          "PSYC" :
			{
			  "name" : "Psychology",
			  "abbrev" : "PSYC",
		 	  "division" : "History and Social Sciences"
			},
          "REL" :
			{
			  "name" : "Religion",
			  "abbrev" : "REL",
		 	  "division" : "Humanities and Fine Arts"
			},
          "RUS" :
			{
			  "name" : "Russian Studies",
			  "abbrev" : "RUS",
		 	  "division" : "History and Social Sciences"
			},
          "SCST" :
			{
			  "name" : "Scandinavian Studies",
			  "abbrev" : "SCST",
		 	  "division" : "History and Social Sciences"
			},
          "SCI" :
			{
			  "name" : "Science",
			  "abbrev" : "SCI",
		 	  "division" : "Mathematics, Science and Physical Education"
			},
          "SW" :
			{
			  "name" : "Social Work",
			  "abbrev" : "SW",
		 	  "division" : "History and Social Sciences"
			},
          "SOC" :
			{
			  "name" : "Sociology",
			  "abbrev" : "SOC",
		 	  "division" : "History and Social Sciences"
			},
          "SPAN" :
			{
			  "name" : "Spanish",
			  "abbrev" : "SPAN",
		 	  "division" : "Humanities and Fine Arts"
			},
          "THE" :
			{
			  "name" : "Theatre",
			  "abbrev" : "THE",
		 	  "division" : "Humanities and Fine Arts"
			},
          "WGST":
			{
			  "name" : "Women and Gender Studies",
			  "abbrev" : "WGST",
		 	  "division" : "History and Social Sciences"
			}
        }

def getDivision(row):
	if 'division' in depts[row['dept']]:
		return depts[row['dept']]['division']
	return None

# read csv data
courses = pd.read_csv("courses for apc project 2.csv");

# eliminate unused columns and change course names
courses = courses[['Crs Title','Crs Name','Crs Subject', 'Crs Desc', 'Crs Min Cred', 'Catalog Course Types CSV', 'Crs Capacity', 'Prerequisite']]
courses.columns = ['title','name','dept','desc','credit_hrs', 'gen_eds','capacity', 'pre_req'] 

#change capacity and credit_hrs to int
courses[['credit_hrs','capacity']] = courses[['credit_hrs','capacity']].fillna(0.0).astype(int)

# get the division associated with the course
courses["division"] = courses.apply(getDivision, axis=1)
courses = courses[courses.title.str.contains("ST:XFR Course Since") == False]

#prettify the json data
jsonData = json.loads(courses.to_json(orient="records"))

f = open('courseData.json', 'w')
f.write(json.dumps(jsonData, indent=2))
f.close()