import csv
import json

genEds = ["BL","SKL","WEL","REL","NWL","NWNL","HB","HBSSM","HE","HEPT","INTCL","HIST","QUANT"]

depts =  {"ACCTG" : { "name" : "Accounting",
			  "abbrev" : "ACCTG",
			  "division" : "Science"
			},
          "AFRS" :
			{ "name" : "Africana Studies",
			  "abbrev" : "AFRS",
			  "division" : "Humanities"
			},
          "ANTH" :
			{ "name" : "Anthropology",
			  "abbrev": "ANTH",
			  "division" : "Science"
			},
          "ART" :
			{ "name" : "Art",
			  "abbrev" : "ART",
			  "division" : "Fine Arts"
			},
          "ARTH" :
			{ "name" : "Art History",
			  "abbrev" : "ARTH",
			  "division" : "Fine Arts"
			},
          "AS" :
			{ "name" : "Aisian Studies",
			  "abbrev" : "AS",
			  "division" : "Humanities"
			},
          "ATHTR" :
			{ "name" : "Athletic Training",
		 	  "abbrev" : "ATHTR",
		 	  "division" : "Science"
		 	},
          "BIO" :
		 	{ "name" : "Biology",
		 	  "abbrev" : "BIO",
		 	  "division": "Science"
		 	},
          "CHEM" :
		 	{ "name" : "Chemistry",
		 	  "abbrev" : "CHEM",
		 	  "division" : "Science"
		 	},
          "CHIN" :
		 	{ "name" : "Chinese",
		 	  "abbrev" : "CHIN",
		 	  "division" : "Humanities"
		 	},
          "CLAS" :
		 	{ "name" : "Classics",
		 	  "abbrev" : "CLAS",
		 	  "division" : "Humanities"
		 	},
          "COMS" :
		 	{ "name" : "Commuication Studies",
		 	  "abbrev" : "COMS",
		 	  "division" : "Humanities"
		 	},
          "CS" :
		 	{ "name" : "Computer Science",
		 	  "abbrev" : "CS",
		 	  "division" : "Science"
		 	},
          "DAN" :
		 	{ "name" : "Dance",
		 	  "abbrev" : "DAN",
		 	  "division" : "Fine Arts"
		 	},
          "DS" :
		 	{ "name" : "Data Science",
		 	  "abbrev" : "DS",
		 	  "division" : "Science"
		 	},
          "ECON" :
		 	{ "name" : "Economics",
		 	  "abbrev" : "ECON",
		 	  "division" : "Science"
		 	},
          "EDUC" :
		 	{ "name" : "Education",
		 	  "abbrev" : "EDUC",
		 	  "division" : "Humanities"
		 	},
          "ENG" :
		 	{ "name" : "English",
		 	  "abbrev" : "ENG",
			  "division" :"Humanities"
			},
          "ENVS" :
			{ "name" : "Environmental Science",
			  "abbrev" : "ENVS",
			  "division" : "Science"
			},
          "FCUL" :
              {"name" : "Foreign Culture",
               "abbrev" : "FCUL",
               "division" : "Humanities"
               },
          "FREN" :
			{ "name" : "French",
			  "abbrev" : "FREN",
			  "division" : "Humanities"
			},
          "GER" :
			{ "name" : "German",
			  "abbrev" : "GER",
			  "division" : "Humanities"
			},
          "GRK" :
			{ "name" : "Greek",
			  "abbrev" : "GRK",
			  "division" : "Humanities"
			},
          "GS" :
              {"name": "Global Studies",
               "abbrev": "GS",
               "division": "Humanities"
               },
          "HLTH" :
			{ "name" : "Health",
			  "abbrev" : "HLTH",
			  "division" : "Science"
			},
          "HEB" :
			{
			  "name" : "Hebrew",
			  "abbrev" : "HEB",
			  "division" : "Humanities"
			},
          "HIST" :
			{
			  "name" : "History",
			  "abbrev" : "HIST",
			  "division" : "Humanities"
			},
          "HONR" :
              {
                  "name": "Honor",
                  "abbrev": "HONR",
                  "division": "Humanities"
              },
          "IMA" : {

                  "name": "Intermedia Arts",
                  "abbrev": "IMA",
                  "division": "Fine Arts"
          },
          "INSYS" :
            {
              "name": "Information Systems",
              "abbrev": "INSYS",
              "division": "Science"
          },
          "INTS" :
              {
                  "name": "International Studies",
                  "abbrev": "IS",
                  "division": "Humanities"
              },
          "IS" :
			{
			  "name" : "International Studies",
			  "abbrev" : "IS",
			  "division" : "Humanities"
			},
          "ITAL" :
			{
			  "name" : "Italian",
			  "abbrev" : "ITAL",
			  "division" : "Humanities"
			},
          "JOUR" :
			{
			  "name" : "Journalism",
			  "abbrev" : "JOUR",
			  "division" : "Humanities"
			},
          "LAT" :
			{
			  "name" : "Latin",
			  "abbrev" : "LAT",
			  "division" : "Humanities"
			},
          "LING" :
			{
			  "name" : "Linguistics",
			  "abbrev" : "LING",
			  "division" : "Humanities"
			},
          "LIST" :
              {
                "name" : "Library and Information Studies",
			    "abbrev" : "LIST",
			    "division" : "Humanities"
              },
          "MGT" :
			{
			  "name" : "Management",
			  "abbrev" : "MGT",
			  "division" : "Humanities"
			},
          "MATH" :
			{
			  "name" : "Mathematics",
			  "abbrev" : "MATH",
			  "division" : "Science"
			},
          "MUST" :
			{
			  "name" : "Museums Studies",
			  "abbrev" : "MUST",
			  "division" : "Humanities"
			},
          "MUS":
			{
			  "name" : "Music",
			  "abbrev" : "MUS",
			  "division" : "Fine Arts"
			},
          "NEUR" :
              {
                  "name" : "Neuroscience",
                  "abbrev" : "NEUR",
                  "division" : "Science"
              },
          "SCST" :
			{
			  "name" : "Nordic Studies",
			  "abbrev" : "SCST",
			  "division" : "Humanities"
			},
          "NURS" :
			{
			  "name" : "Nursing",
			  "abbrev" : "NURS",
			  "division" : "Science"
			},
          "OC" :
            {
			  "name" : "Off Campus Studies",
			  "abbrev" : "OC",
			  "division" : "General"
			},
          "PAID" :
			{
			  "name" : "Paideia",
			  "abbrev" : "PAID",
			  "division" : "Humanities"
			},
          "PAID2" :
			{
			  "name" : "Paideia 2",
			  "abbrev" : "PAID2",
			  "division" : "Humanities"
			},
          "PHIL" :
			{
			  "name" : "Philosophy",
			  "abbrev" : "PHIL",
			  "division" : "Humanities"
			},
          "PE" :
			{
			  "name" : "Physical Education",
			  "abbrev" : "PE",
			  "division" : "Humanities"
			},
          "PHYS" :
			{
			  "name" : "Physics",
			  "abbrev" : "PHYS",
			  "division" : "Science"
			},
          "POLS" :
			{
			  "name" : "Political Science",
			  "abbrev" : "POLS",
			  "division" : "Humanities"
			},
          "PSYC" :
			{
			  "name" : "Psychology",
			  "abbrev" : "PSYC",
			  "division" : "Science"
			},
          "REL" :
			{
			  "name" : "Religion",
			  "abbrev" : "REL",
			  "division" : "Humanities"
			},
          "RUS" :
			{
			  "name" : "Russian Studies",
			  "abbrev" : "RUS",
			  "division" : "Humanities"
			},
          "SCST" :
			{
			  "name" : "Scandinavian Studies",
			  "abbrev" : "SCST",
			  "division" : "Humanities"
			},
          "SCI" :
			{
			  "name" : "Science",
			  "abbrev" : "SCI",
			  "division" : "Science"
			},
          "SW" :
			{
			  "name" : "Social Work",
			  "abbrev" : "SW",
			  "division" : "Humanities"
			},
          "SOC" :
			{
			  "name" : "Sociology",
			  "abbrev" : "SOC",
			  "division" : "Humanities"
			},
          "SPAN" :
			{
			  "name" : "Spanish",
			  "abbrev" : "SPAN",
			  "division" : "Humanities"
			},
          "THE" :
			{
			  "name" : "Theatre",
			  "abbrev" : "THE",
			  "division" : "Fine Arts"
			},
          "WGST":
			{
			  "name" : "Women and Gender Studies",
			  "abbrev" : "WGST",
			  "division" : "Humanities"
			}
          }


def main():

    res = []

    with open('courses for apc project 2.csv') as csvfile:
        dictreader = csv.DictReader(csvfile, fieldnames=['crsId', 'title', 'name', 'dept', 'desc', 'shortTitle', 'credit_hrs',
                                                         'max_credit_hrs', 'crs_start', 'crs_end', 'gen_ed', 'capacity', 'pre_req'])

        skip = True
        for row in dictreader:
            #skip first row
            if not skip:
                for k,v in row.items():
                    if v == '':
                        del row[k]
                    elif k == 'crsId' or k == 'crs_start' or k == 'crs_end' or k == 'shortTitle' or k=='max_credit_hrs':
                        del row[k]
                    elif k == 'gen_ed':
                        v = v.strip(".")
                        row[k] = v.split(",")
                    elif k == 'dept':
                        row['division'] = depts[v]["division"]
                    elif k == 'credit_hrs' or k == 'capacity':
                        row[k] = int(v)
                    elif k == 'pre_req':
                        v = v.strip(".")
                res.append(row)
            skip = False

    f = open('courseData.json', 'w')
    f.write(json.dumps(res, indent=2))
    f.close()

if __name__ == '__main__':
    main()