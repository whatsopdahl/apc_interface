/**
 * Run this script throug the command line:
 *  $>>	mongo <dbname> mock_data.js
 */

/**
 * Recreate all collections
 */
users = [
			{ name : "Aidan Schmitt",
			  email : "schmai01@luther.edu",
			  dept : ["CS"],
			  recentlyViewed : []
			},
			{ name : "Kyle McNeese",
			  email : "mcneky01@luther.edu",
			  dept : ["CS", "MATH"],
                          chairs : ["CS", "MATH", "APC"],
			  recentlyViewed : []
			},
			{ name : "Jonathan Opdahl",
		          email : "opdajo01@luther.edu",
		  	  dept : ["CS", "MATH"],
		  	  chairs : ["CS", "MATH", "APC"],
		  	  recentlyViewed : []
		  	},
			{ name : "Brad Miller",
			  email : "bmiller@luther.edu",
			  dept : ["CS"],
			  chairs : ["APC", "CS"],
			  recentlyViewed : []
			},
			{ name : "Todd Pedlar",
			  email : "pedlto01@luther.edu",
			  dept : ["PHYS"],
			  chairs: ["APC"],
			  recentlyViewed : []
			},
			{ name: "Novian Whitsitt",
		 	  email: "whitsino@luther.edu",
		 	  dept: ["AFST"],
		 	  chairs : ["AFST"],
		 	  recentlyViewed : []
		 	},
		 	{ name: "Mark Eichinger",
		 	  email: "eichma01@luther.edu",
		 	  dept: ["BIO"],
		 	  chars: ["BIO"],
		 	  recentlyViewed : []
		 	},
		 	{ name: "Brad Chamberlain",
		 	  email: "chambr01@luther.edu",
		 	  dept: ["CHEM"],
		 	  chairs: ["CHEM"],
		 	  recentlyViewed : []
		 	},
		 	{ name: "Philip Freeman",
		 	  email: "freephi01@luther.edu",
		 	  dept: ["CLAS"],
		 	  chairs: ["CLAS"],
		 	  recentlyViewed : []
		 	},
		 	{ name:"Kimberly Powell",
		 	  email: "kimpowell@luther.edu",
		 	  dept: ["COMS"],
		 	  chairs: ["COMS"],
		      recentlyViewed : []
		 	},
		 	{ name: "Steve Holland",
		  	  email: "steve.holland@luther.edu",
		  	  dept: ["ECON", "ACCTG"],
		  	  chairs: ["ECON", "ACCTG"],
			  recentlyViewed : []
		  	},
	  		{ name: "Barbara Bohach",
	  	  	  email: "bohachba@luther.edu",
	  	  	  dept: ["ED"],
	  	  	  chairs: ["ED"],
	  		  recentlyViewed : []
	  		},
	  		{ name: "Martin Klammer",
		  	  email : "klammerm@luther.edu",
		  	  dept: ["ENG"],
		  	  chairs: ["ENG"],
		  	  recentlyViewed : []
		  	},
		  	{ name: "Eric Baack",
		  	  email: "baacer01@luther.edu",
		  	  dept: ["ENVS"],
		  	  chairs: ["ENVS"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Brian Solberg",
		  	  email: "solberbr@luther.edu",
		  	  dept: ["HLTH", "ATHTR"],
		  	  chairs: ["HLTH", "ATHTR"],
		  	  recentlyViewed : []
		  	},
		  	{ name: "Brian Caton",
		      email: "catobr01@luther.edu",
		  	  dept: ["HIST"],
		  	  chairs: ["HIST"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Pedro dos Santos",
		  	  email : "dosspe01@luther.edu",
		  	  dept: ["IS"],
		  	  chairs: ["IS"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Eric Westlund",
		  	  email : "wester01@luther.edu",
		  	  dept: ["MATH"],
		  	  charis : ["MATH"],
		  	  recentlyViewed : []
		  	},
		  	{ name: "David Thompson",
		  	  email : "thomda01@luther.edu",
		  	  dept: ["LING"],
		  	  chairs : ["LING"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Ed Tebbenhoff",
		  	  email : "tebbened@luther.edu",
		  	  dept: ["MUST"],
		  	  chairs: ["MUST"],
		  	  recentlyViewed : []
		  	},
		  	{ name: "Gregory Peterson",
		  	  email : "petegr01@luther.edu",
		  	  dept: ["MUS"],
		  	  chairs: ["MUS"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "La Donna McGohan",
		   	  email : "mcgola01@luther.edu",
		   	  dept: ["NURS"],
		   	  chairs : ["NURS"],
		   	  recentlyViewed : []
		   	},
		   	{ name : "Rebecca Sullivan",
		      email : "sullivre01@luther.edu",
		  	  dept: ["ENG"],
		  	  chairs: ["PAID"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Storm Bailey",
		   	  email : "baileyst@luther.edu",
		   	  dept : ["PHIL"],
		   	  chairs: ["PHIL"],
		   	  recentlyViewed : []
		   	},
		   	{ name : "James Perez",
		   	  email : "perezjam@luther.edu",
		   	  dept : ["PHYS"],
		   	  chairs: ["PHYS"],
		   	  recentlyViewed : []
		   	},
		   	{ name : "Paul Gardner",
		      email : "gardnerp@luther.edu",
		  	  dept : ["POLS"],
		  	  chairs : ["POLS"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "David Njus",
		  	  email : "njusdavi@luther.edu",
		  	  dept: ["PSYC"],
		  	  chairs : ["PSYC"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Sean Burke",
		  	  email : "burkse01@luther.edu",
		  	  dept: ["REL"],
		  	  chairs: ["REL"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Laurie Iudin-Nelson",
		  	  email : "iudinnel@luther.edu",
		  	  dept : ["RUS"],
		  	  chairs: ["RUS"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Ben Moore",
		  	  email : "mooreben@luther.edu",
		  	  dept : ["THE", "ARTH"],
		  	  chairs : ["THE", "ARTH"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Char Kunkel",
		  	  email : "kunkelch@luther.edu",
		  	  dept: ["WGST"],
		  	  chairs : ["WGST"],
		  	  recentlyViewed : []
		  	},
		  	{ name : "Kent Lee",
		  	  email : "leekentd@luther.edu",
		  	  dept : ["CS"],
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
//new courses for proposal
courses = [
		{
		  	"capacity" : 40,
		  	"name" : "CS-1",
		  	"title" : "Fun with computers",
		  	"dept" : "CS",
		  	"credit_hrs" : 1,
		  	"desc" : "Learn how the computer is magic! Learn about the little wizard inside that makes your computer work."
		},
		{
		    "capacity": 25,
		    "name": "MATH-150",
		    "title": "Introduction to Being a Nerd",
		    "dept": "MATH",
		    "credit_hrs": 3,
		    "gen_ed": [
		      "QUANT"
		    ],
		    "desc": "An introduction to computer science emphasizing problem solving. Problems are selected from a variety of interesting areas such as graphics, image processing, cryptography, data analysis, astronomy, video games, and environmental stimulation. Topics include algorithm design and object oriented programming."
		},
		{
		    "capacity": 30,
		    "name": "PSYC-352",
		    "title": "Cognitive Processes",
		    "pre_req": "PSYC 130, 349, and 350",
		    "dept": "PSYC",
		    "credit_hrs": 2,
		    "desc": "A study of the mental processes involved in the acquisition, organization, representation, and retrieval of information by humans. Topics to be covered include attention, recognition memory, short-term and long-term memory, concept formation, problem solving, and creativity. Lecture, discussion, and weekly laboratories."
		},
		{
		  	"capacity" : 25,
		  	"name" : "CS-237",
		  	"title" : "Testing",
		  	"pre_req" : "",
		  	"dept" : "CS",
		  	"credit_hrs" : 4,
		  	"desc" : "Learn best-practices and common frameworks for testing in Java, Python, and C++."
		},
		{
		 	"capacity" : 25,
		 	"name" : "MATH-452",
		 	"title" : "Partial Differential Equations",
		 	"pre_req" : "MATH 351",
		 	"dept" : "MATH",
		 	"credit_hrs" : 4,
		 	"desc" : "An introduction to initial and boundary value problems associated with certain linear partial differential equations (Laplace, heat and wave equations). Fourier series methods, including the study of best approximation in the mean and convergence, will be a focus. Sturm-Liouville problems and associated eigenfunctions will be included.  Numerical methods, such as finite difference, finite element and finite analytic, may be introduced, including the topics of stability and convergence of numerical algorithms. Extensive use of a computer algebra system.",
		 	"gen_ed" : [ ]
		},
		{
			"capacity" : 35,
			"name" : "ENG-334",
			"title" : "The Wizarding World: Investigating Harry Potter",
			"pre_req" : "PAID 111, 112 or transfer equivalents",
			"dept" : "ENG",
			"credit_hrs" : 4,
			"desc" : "A study on the social impact that the Harry Potter franchise has had on millenials through investigative readings of the Harry Potter series. Students will perform character analysis to determining what characterizes the millenial generation and how the novels and movies have impacted social events.",
			"gen_ed" : [ "HEPT" ]
		},
		{
			"capacity" : 14,
			"name" : "ART-200",
			"title" : "Finger Painting I",
			"pre_req" : "ART 108",
			"dept" : "ART",
			"credit_hrs" : 4,
			"desc" : "An introduction to finger painting techniques and color theory including a technical understanding of filangical oil media.  A visual vocabulary and the start of personal investigations into finger painting and conceptual problems will be explored using still life, landscape, and the human figure as subjects.",
			"gen_ed" : [
				"HE"
			]
		},
		{
			"capacity" : 25,
			"name" : "HIST-250",
			"title" : "Tea and Funny Accents: The History of Early Modern Britain",
			"dept" : "HIST",
			"credit_hrs" : 4,
			"desc" : "This class covers two centuries of dramatic change in Tudor-Stuart England. Encompassing the period from 1485 to 1689, the course considers the political, social, and religious history of Great Britain, during a period in which the monarchs in the south attempted to expand their control over the entire territory; the official religion of the land changed with surprising frequency; and the country eventually fell into civil war and revolution. In this survey course, students will be introduced to the major trends, characters and events of this period, examining them in depth via a variety of primary sources, such as letters, journals, and legal documents.",
			"gen_ed" : [
				"HIST",
				"HB"
			]
		},
		{
			"capacity" : 40,
			"name" : "CS-75",
			"title" : "Computer Magic",
			"dept" : "CS",
			"credit_hrs" : 4,
			"desc" : "Learn why your computer is beast mode."
		},
		{
			"capacity" : 40,
			"name" : "CS-80",
			"title" : "Computer Magic Tricks",
			"dept" : "CS",
			"credit_hrs" : 4,
			"desc" : "Learn why your computer is beast mode."
		},
		{
			"capacity" : 20,
			"name" : "ENG-75",
			"title" : "We Know Words",
			"dept" : "ENG",
			"credit_hrs" : 4,
			"desc" : "Learn so many words."
		},
		{
			"capacity" : 20,
			"name" : "ENG-80",
			"title" : "We Know Many Words",
			"dept" : "ENG",
			"credit_hrs" : 4,
			"desc" : "Learn so many words."
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

var course;
for (var i=0; i < courses.length; i++) {
	course = courses[i];
	dept = db.depts.findOne({"abbrev" : course.dept, "division" : {$exists: true}});
	if (dept != null) {
		course["division"] = dept.division;
	}
}

db.users.insert(users);
db.courses.insert(courses);

cs150 = db.courses.findOne({"name" : "CS-150"});
newcs150 = db.courses.findOne( {"title" : "Introduction to Being a Nerd" });
cs1 = db.courses.findOne({"name" : "CS-1"});
psyc352 = db.courses.findOne({"name" : "PSYC-352", "credit_hrs" : 4});
newpsych352 = db.courses.findOne({"name" : "PSYC-352", "credit_hrs" : 2});
testing = db.courses.findOne({"name" : "CS-237"});
oldMath452 = db.courses.findOne({"name" : "MATH-452", "gen_ed" : {"$all" : ["QUANT"]} } );
newMath452 = db.courses.findOne( {
	  	 	"division" : "Mathematics, Science and Physical Education",
	  	 	"capacity" : 25,
	  	 	"name" : "MATH-452",
	  	 	"title" : "Partial Differential Equations",
	  	 	"pre_req" : "MATH 351",
	  	 	"dept" : "MATH",
	  	 	"credit_hrs" : 4,
	  	 	"desc" : "An introduction to initial and boundary value problems associated with certain linear partial differential equations (Laplace, heat and wave equations). Fourier series methods, including the study of best approximation in the mean and convergence, will be a focus. Sturm-Liouville problems and associated eigenfunctions will be included.  Numerical methods, such as finite difference, finite element and finite analytic, may be introduced, including the topics of stability and convergence of numerical algorithms. Extensive use of a computer algebra system.",
	  	 	"gen_ed" : [ ]
	  	 	});
oldEng334 = db.courses.findOne({"name" : "ENG-334", "title" : "Young Adult Literature"});
newEng334 = db.courses.findOne({"name" : "ENG-334", "title" : "The Wizarding World: Investigating Harry Potter"});
oldArt200 = db.courses.findOne({"name" : "ART-200", "title" : "Painting I"});
newArt200 = db.courses.findOne({"name" : "ART-200", "title" : "Finger Painting I"});
oldHist250 = db.courses.findOne({"name" : "HIST-250", "title" : "Rulers, Reform, and Revolution:TheyHistory of Early Modern Britain"});
newHist250 = db.courses.findOne({"name" : "HIST-250", "title" : "Tea and Funny Accents: The History of Early Modern Britain"});


cs75 = db.courses.findOne({"name" : "CS-75", "title" : "Computer Magic"});
eng75 = db.courses.findOne({"name" : "ENG-75", "title" : "We Know Words"});

cs80 = db.courses.findOne({"name" : "CS-80", "title" : "Computer Magic Tricks"});
eng80 = db.courses.findOne({"name" : "ENG-80", "title" : "We Know Many Words"});

proposals = [
  {
	"terms": ["Fall", "Spring"],
	"owner": "Jonathan Opdahl",
	"stage": 3,
	"staffing": "We will need to hire a new professor.",
	"rationale": "How long until this proposal gets rejected?",
	"impact": "Greatest class ever.",
	"date": "2016-10-15T16:46:33.616Z",
	"oldCourse": null,
	"newCourse": cs1,
	"fees": null,
	"est_enrollment": 25,
	"instructors": ["Jon Opdahl"],
	"comments":  [],
  },
  {
	"terms": ["Fall", "Spring", "J-term"],
	"owner": "Kyle McNeese",
	"stage": 0,
	"staffing": "Any professor in the CS department can teach this course.",
	"rationale": "Let's call it what it is....",
	"impact": "Worst class ever.",
	"date": "2016-11-04T16:46:33.616Z",
	"oldCourse": cs150,
	"newCourse": newcs150,
	"fees": null,
	"est_enrollment": 30,
	"instructors": ["Jonathan Opdahl", "Kyle McNeese"],
	"comments":  [
		{
			"user": "Jonathan Opdahl",
			"date": "Mon Nov 14 2016 21:26:22 GMT-0600 (CST)",
			"body": "Hi Kyle"
		},
		{
			"user": "Kyle McNeese",
			"date": "Mon Nov 14 2016 21:29:26 GMT-0600 (CST)",
			"body": "suh dude"
		}
	]
  },
  {
	"terms": ["Fall", "Spring", "J-term"],
	"owner": "Kyle McNeese",
	"stage": 0,
	"staffing": "",
	"rationale": "Students will no longer do original research. Ever since the rat race incident of 2015, we don't let psych students conduct original research.",
	"impact": "Worst class ever.",
	"date": "2016-11-10T16:46:33.616Z",
	"oldCourse": psyc352,
	"newCourse": newpsych352,
	"fees": null,
	"est_enrollment": 30,
	"instructors": ["Jonathan Opdahl", "Kyle McNeese"],
	"comments":  []
  },
  {
  	"terms" : [ "FALL", "SPRING" ],
  	"owner" : "Brad Miller",
  	"stage" : 4,
  	"staffing" : "",
  	"rationale" : "",
  	"impact" : "",
  	"date" : "2016-11-15T16:46:33.616Z",
  	"oldCourse" : null,
  	"newCourse" : testing,
  	"fees" : "",
  	"est_enrollment" : 15,
  	"instructors" : [ "Jonathan Opdahl", "Kyle McNeese", "Aidan Schmitt" ],
  	"comments" : [ ]
  	},
  	{
  		"terms" : [ "FALL", "SPRING" ],
  		"owner" : "Jonathan Opdahl",
  		"stage" : 1,
  		"staffing" : "",
  		"rationale" : "We removed the QUANT all college requirement as anyone who takes this class will have achieved this by the time they take this class.",
  		"impact" : "",
  		"date" : "2016-11-22T07:01:02.896Z",
  		"oldCourse" : oldMath452,
	  	"fees" : "",
	  	"est_enrollment" : 12,
	  	"instructors" : [ "Eric Westlund" ],
	  	"comments" : [ ],
	  	"newCourse" : newMath452,
	  	},
	{
		"terms" : [ "FALL", "J-TERM", "SPRING" ],
		"owner" : "Aidan Schmitt",
		"stage" : 0,
		"staffing" : "",
		"rationale" : "As Harry Potter remains the defining work of literature for the millenial generation, the study of young adult literature previously highlighted in this course can be synthesized into the study of J.K. Rowling's series of novels.",
		"oldCourse" : oldEng334,
		"newCourse" : newEng334,
		"impact" : "",
		"date" : "2016-12-06T15:28:55.769Z",
		"fees" : "",
		"est_enrollment" : 35,
		"instructors" : [ "Rebecca Sullivan" ],
		"comments" : [ ]
	},
	{
		"terms" : [
			"FALL",
			"J-TERM",
			"SPRING"
		],
		"owner" : "Jonathan Opdahl",
		"stage" : 1,
		"staffing" : "",
		"rationale" : "To understand how to paint with a brush, one must become one with the paint through touching and immersing themselves in the experience of finger painting.",
		"impact" : "",
		"date" : "2016-12-06T15:45:06.379Z",
		"oldCourse" : oldArt200,
		"newCourse" : newArt200,
		"fees" : "",
		"est_enrollment" : 14,
		"instructors" : [
			"Philip Freeman"
		],
		"comments" : [ ]
	},
	{
		"terms" : [
			"J-TERM"
		],
		"owner" : "Kyle McNeese",
		"stage" : 2,
		"staffing" : "",
		"rationale" : "Tea and funny accents epitomize the British in the early part of the 1800 to current day.",
		"impact" : "",
		"date" : "2016-12-06T15:58:18.270Z",
		"oldCourse" : oldHist250,
		"newCourse" : newHist250,
		"fees" : "",
		"est_enrollment" : 0,
		"instructors" : [
			"Kimberly Powell"
		],
		"comments" : [ ]
	},
	{
	  	"terms": ["Fall", "Spring"],
	  	"owner": "Kyle McNeese",
	  	"stage": 2,
	  	"staffing": "We will need to hire a new professor.",
	  	"rationale": "It will help.",
	  	"impact": "1st",
	  	"date": "2016-03-15T16:46:33.616Z",
	  	"oldCourse": cs75,
	  	"newCourse": cs80,
	  	"fees": null,
	  	"est_enrollment": 20,
	  	"instructors": ["Jon Opdahl", "Kyle McNeese"],
	  	"comments":  [],
    },
	{
		"terms": ["Fall", "Spring"],
	  	"owner": "Jon Opdahl",
	  	"stage": 3,
	  	"staffing": "We can use our current professors. They agreed to it.",
	  	"rationale": "More words, more better.",
	  	"impact": "1st",
	  	"date": "2016-02-15T16:46:33.616Z",
	  	"oldCourse": eng75,
	  	"newCourse": eng80,
	  	"fees": null,
	  	"est_enrollment": 15,
	  	"instructors": ["Kyle McNeese"],
	  	"comments":  [],
	}
];

db.proposals.insert(proposals);

for (var i=0; i < proposals.length; i++) {
	var owner = proposals[i].owner;
	var user = db.users.findOne({"name" : owner});
	if (user != null) {
		if (user.totalProps) {
			db.users.update({"name" : owner}, { $inc : { totalProps : 1 } });
		} else {
			db.users.update({"name" : owner}, { $set : { totalProps : 1 } });
		}
	}
}


cs70 = {
		"division" : "Mathematics, Science and Physical Education",
		"capacity" : 30,
		"name" : "CS-70",
		"title" : "Computer Magic",
		"dept" : "CS",
		"credit_hrs" : 4,
		"desc" : "Learn why your computer is a beast."
	};

eng70 = {
		"division" : "Humanities",
		"capacity" : 15,
		"name" : "ENG-70",
		"title" : "We Know Words",
		"dept" : "ENG",
		"credit_hrs" : 4,
		"desc" : "Learn so many words."
	};

cs75prop = {
	  	"terms": ["Fall", "Spring"],
	  	"owner": "Kyle McNeese",
	  	"stage": 2,
	  	"staffing": "We will need to hire a new professor.",
	  	"rationale": "It will help.",
	  	"impact": "1st",
	  	"date": "2000-11-15T16:46:33.616Z",
	  	"oldCourse": cs70,
	  	"newCourse": cs75,
	  	"fees": null,
	  	"est_enrollment": 20,
	  	"instructors": ["Jon Opdahl", "Kyle McNeese"],
	  	"comments":  []
    };

eng75prop = {
		"terms": ["Fall", "Spring"],
	  	"owner": "Jon Opdahl",
	  	"stage": 3,
	  	"staffing": "We can use our current professors. They agreed to it.",
	  	"rationale": "More words, more better.",
	  	"impact": "1st",
	  	"date": "2000-10-15T16:46:33.616Z",
	  	"oldCourse": eng70,
	  	"newCourse": eng75,
	  	"fees": null,
	  	"est_enrollment": 15,
	  	"instructors": ["Kyle McNeese"],
	  	"comments":  []
	};


cs80prop = db.proposals.findOne({"date" : "2016-03-15T16:46:33.616Z"});
eng80prop = db.proposals.findOne({"date" : "2016-02-15T16:46:33.616Z"});

var archives = [
	{
	  	proposals : [cs75prop, cs80prop],
	  	curr_course : cs80._id.str
	},
	{
	  	proposals : [eng75prop, eng80prop],
	  	curr_course : eng80._id.str
	}
]

db.archives.insert(archives);
