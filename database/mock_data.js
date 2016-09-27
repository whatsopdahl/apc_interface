/**
 * Run this script throug the command line:
 *  $>>	mongo <dbname> mock_data.js
 */

/**
 * Drop all existing collections
 */
db.users.drop();
db.courses.drop();
db.proposals.drop();
db.archive.drop();

/**
 * Recreate all collections
 */
users = [ 
			{ name : "Brad Miller", 
			  email : "bmiller@luther.edu",
			  division : "Science",
			  dept : ["CS"],
			  chairs : ["APC", "CS"]},
			{ name : "Todd Pedlar",
			  email : "pedlto01@luther.edu",
			  division : "Science",
			  dept : ["PHYS"],
			  chairs: ["APC"]},
			{ name: "Novian Whitsitt",
		 	  email: "whitsino@luther.edu",
		 	  division: "Humanities",
		 	  dept: ["AFST"],
		 	  chairs : ["AFST"]},
		 	{ name: "Mark Eichinger",
		 	  email: "eichma01@luther.edu",
		 	  division: "Science",
		 	  dept: ["BIO"],
		 	  chars: ["BIO"]},
		 	{ name: "Brad Chamberlain",
		 	  email: "chambr01@luther.edu",
		 	  division: "Science",
		 	  dept: ["CHEM"],
		 	  chairs: ["CHEM"]},
		 	{ name: "Philip Freeman",
		 	  email: "freephi01@luther.edu",
		 	  division: "Humanities",
		 	  dept: ["CLAS"],
		 	  chairs: ["CLAS"]},
		 	{ name:"Kimberly Powell",
		 	  email: "kimpowell@luther.edu",
		 	  division: "Humanities",
		 	  dept: ["COMS"],
		 	  chairs: ["COMS"]},
		 	{ name: "Steve Holland",
		  	  email: "steve.holland@luther.edu",
		  	  division: "Humanities",
		  	  dept: ["ECON", "ACCTG"],
		  	  chairs: ["ECON", "ACCTG"]},
		  	{ name: "Barbara Bohach",
		  	  email: "bohachba@luther.edu",
		  	  division: "Humanities",
		  	  dept: ["ED"],
		  	  chair: ["ED"]},
		  	{ name: "Martin Klammer",
		  	  email : "klammerm@luther.edu",
		  	  division : "Humanities",
		  	  dept: ["ENG"],
		  	  chairs: ["ENG"]},
		  	{ name: "Eric Baack",
		  	  email: "baacer01@luther.edu",
		  	  division: "Science",
		  	  dept: ["ENVS"],
		  	  chairs: ["ENVS"]},
		  	{ name : "Brian Solberg",
		  	  email: "solberbr@luther.edu",
		  	  division: "Science",
		  	  dept: ["HLTH", "ATHTR"],
		  	  chair: ["HLTH", "ATHTR"]},
		  	{ name: "Brian Caton",
		      email: "catobr01@luther.edu",
		      division : "Humanities",
		  	  dept: ["HIST"],
		  	  chairs: ["HIST"]},
		  	{ name : "Pedro dos Santos",
		  	  email : "dosspe01@luther.edu",
		  	  division: "Humanities",
		  	  dept: ["IS"],
		  	  chairs: ["IS"]},
		  	{ name : "Eric Westlund",
		  	  email : "wester01@luther.edu",
		  	  division : "Science",
		  	  dept: ["MATH"],
		  	  charis : ["MATH"]},
		  	{ name: "David Thompson",
		  	  email : "thomda01@luther.edu",
		  	  division : "Humanities",
		  	  dept: ["LING"],
		  	  chairs : ["LING"]},
		  	{ name : "Ed Tebbenhoff",
		  	  email : "tebbened@luther.edu",
		  	  division : "Humanities",
		  	  dept: ["MUST"],
		  	  chairs: ["MUST"]},
		  	{ name: "Gregory Peterson",
		  	  email : "petegr01@luther.edu",
		  	  division : "Fine Arts",
		  	  dept: ["MUS"],
		  	  chair: ["MUS"]},
		  	{ name : "La Donna McGohan",
		   	  email : "mcgola01@luther.edu",
		   	  division : "Science",
		   	  dept: ["NURS"],
		   	  chairs : ["NURS"]},
		   	{ name : "Rebecca Sullivan",
		      email : "sullivre01@luther.edu",
		  	  division: "Humanities",
		  	  dept: ["ENG"],
		  	  chair: ["PAID"]},
		  	{ name : "Storm Bailey",
		   	  email : "baileyst@luther.edu",
		   	  division : "Humanities",
		   	  dept : ["PHIL"],
		   	  chair: ["PHIL"]},
		   	{ name : "James Perez", 
		   	  email : "perezjam@luther.edu",
		   	  division : "Science",
		   	  dept : ["PHYS"],
		   	  chairs: ["PHYS"]},
		   	{ name : "Paul Gardner",
		      email : "gardnerp@luther.edu",
		  	  division : "Science",
		  	  dept : ["POLS"],
		  	  chairs : ["POLS"]},
		  	{ name : "David Njus",
		  	  email : "njusdavi@luther.edu",
		  	  division : "Science",
		  	  dept: ["PSYC"],
		  	  chair : ["PSYC"]},
		  	{ name : "Sean Burke",
		  	  email : "burkse01@luther.edu",
		  	  division : "Humanities",
		  	  dept: ["REL"],
		  	  chairs: ["REL"]},
		  	{ name : "Laurie Iudin-Nelson",
		  	  email : "iudinnel@luther.edu",
		  	  division : "Humanities",
		  	  dept : ["RUS"],
		  	  chairs: ["RUS"]},
		  	{ name : "Ben Moore",
		  	  email : "mooreben@luther.edu",
		  	  division : "Fine Arts",
		  	  dept : ["THE", "ARTH"],
		  	  chair : ["THE", "ARTH"] },
		  	{ name : "Char Kunkel",
		  	  email : "kunkelch@luther.edu",
		  	  division : "Humanities",
		  	  dept: ["WGST"],
		  	  chair : ["WGST"]},
		  	{ name : "Kent Lee",
		  	  email : "leekentd@luther.edu",
		  	  division : "Science",
		  	  dept : ["CS"]}
		];
depts = [
			{ name : "Accounting",
			  abbrev : "ACCTG",
			  division : "Science"
			},
			{ name : "Africana Studies",
			  abbrev : "AFST",
			  division : "Humanities"
			},
			{ name : "Anthropology",
			  abbrev: "ANTH",
			  division : "Science"
			},
			{ name : "Art",
			  abbrev : "ART",
			  division : "Fine Arts"
			},
			{ name : "Art History",
			  abbrev : "ARTH",
			  division : "Fine Arts"
			},
			{ name : "Aisian Studies",
			  abbrev : "AS",
			  division : "Humanities"
			},
			{ name : "Athletic Training",
		 	  abbrev : "ATHTR",
		 	  division : "Science"
		 	},
		 	{ name : "Biology",
		 	  abbrev : "BIO",
		 	  division: "Science"
		 	},
		 	{ name : "Chemistry",
		 	  abbrev : "CHEM",
		 	  division : "Science"
		 	},
		 	{ name : "Chinese",
		 	  abbrev : "CHIN",
		 	  division : "Humanities"
		 	},
		 	{ name : "Classics",
		 	  abbrev : "CLAS",
		 	  division : "Humanities"
		 	},
		 	{ name : "Commuication Studies",
		 	  abbrev : "COMS",
		 	  division : "Humanities"
		 	},
		 	{ name : "Computer Science",
		 	  abbrev : "CS",
		 	  division : "Science"
		 	},
		 	{ name : "Dance",
		 	  abbrev : "DAN",
		 	  division : "Fine Arts"
		 	},
		 	{ name : "Data Science",
		 	  abbrev : "DS",
		 	  division : "Science"
		 	},
		 	{ name : "Economics",
		 	  abbrev : "ECON",
		 	  division : "Science"
		 	},
		 	{ name : "Education",
		 	  abbrev : "EDUC",
		 	  division : "Humanities"
		 	},
		 	{ name : "English",
		 	  abbrev : "ENG",
			  division :"Humanities"
			},
			{ name : "Environmental Science",
			  abbrev : "ENVS",
			  division : "Science"
			},
			{ name : "French",
			  abbrev : "FREN",
			  division : "Humanities"
			},
			{ name : "German",
			  abbrev : "GER",
			  division : "Humanities"
			},
			{ name : "Greek",
			  abbrev : "GRK",
			  division : "Humanities"
			},
			{ name : "Health",
			  abbrev : "HLTH",
			  division : "Science"
			},
			{
			  name : "Hebrew",
			  abbrev : "HEB",
			  division : "Humanities"
			},
			{
			  name : "History",
			  abbrev : "HIST",
			  division : "Humanities"
			},
			{
			  name : "International Studies",
			  abbrev : "IS",
			  division : "Humanities"
			},
			{
			  name : "Italian",
			  abbrev : "ITAL",
			  division : "Humanities"
			},
			{
			  name : "Journalism",
			  abbrev : "JOUR",
			  division : "Humanities"
			},
			{
			  name : "Latin",
			  abbrev : "LAT",
			  division : "Humanities"
			},
			{
			  name : "Linguistics",
			  abbrev : "LING",
			  division : "Humanities"
			},
			{
			  name : "Management",
			  abbrev : "MGT",
			  division : "Humanities"
			},
			{
			  name : "Mathematics",
			  abbrev : "MATH",
			  division : "Science"
			},
			{
			  name : "Museums Studies",
			  abbrev : "MUST",
			  division : "Humanities"
			},
			{
			  name : "Music",
			  abbrev : "MUS",
			  division : "Fine Arts"
			},
			{
			  name : "Nordic Studies",
			  abbrev : "SCST",
			  division : "Humanities"
			},
			{
			  name : "Nursing",
			  abbrev : "NURS",
			  division : "Science"
			},
			{
			  name : "Paideia",
			  abbrev : "PAID",
			  division : "Humanities"
			},
			{
			  name : "Philosophy",
			  abbrev : "PHIL",
			  division : "Humanities"
			},
			{
			  name : "Physical Education",
			  abbrev : "PE",
			  division : "Humanities"
			},
			{
			  name : "Physics",
			  abbrev : "PHYS",
			  division : "Science"
			},
			{
			  name : "Political Science",
			  abbrev : "POLS",
			  division : "Humanities"
			},
			{
			  name : "Psychology",
			  abbrev : "PSYC",
			  division : "Science"
			},
			{
			  name : "Religion",
			  abbrev : "REL",
			  division : "Humanities"
			},
			{
			  name : "Russian Studies",
			  abbrev : "RUS",
			  division : "Humanities"
			},
			{
			  name : "Scandinavian Studies",
			  abbrev : "SCST",
			  division : "Humanities"
			},
			{
			  name : "Science",
			  abbrev : "SCI",
			  division : "Science"
			},
			{
			  name : "Social Work",
			  abbrev : "SW",
			  division : "Humanities"
			},
			{
			  name : "Sociology",
			  abbrev : "SOC",
			  division : "Humanities"
			},
			{
			  name : "Spanish",
			  abbrev : "SPAN",
			  division : "Humanities"
			},
			{
			  name : "Theatre",
			  abbrev : "THE",
			  division : "Fine Art"
			},
			{
			  name : "Women and Gender Studies",
			  abbrev : "WGST",
			  division : "Humanities"
			}
		];
courses = [ 
			{ title: "Fundamentals of Web Programming",
			  num : 130,
			  dept: "CS",
			  division : "Science",
			  instructors: ["Brad Miller"],
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity: 25,
			  term: ["FALL","SPRING"],
			  desc: "This course focuses on learning the basic building blocks of web programming. The student will be introduced to three languages used for web page design and implementation: HTML, CSS, and Javascript. To develop a deeper understanding of how web sites work together, the HTTP protocol will be introduced along with basic AJAX programming. The 4 credit option is available when offered during the summer. Recommended for students with an interest in computer science but no prior experience."
			},
			{ title : "Data Modeling and Querying",
			  num : 140,
			  dept : "CS",
			  division : "Science",
			  credit_hrs : 2,
			  est_enrollment: 25,
			  capacity : 25,
			  term : ["FALL", "SPRING"],
			  desc :"The course focuses on constructing relational models of data, the relational algebra, querying relational databases using SQL. Students will become familiar with a popular open source data management system such as MySQL or Postgresql."
			},
			{ title : "Classics and Culture",
			  num : 300,
			  dept : "CLAS",
			  division : "Humanities",
			  instructors : ["Philip Freeman"],
			  credit_hrs : 4,
			  est_enrollment : 15,
			  capacity : 25,
			  term : ["SPRING"],
			  gen_ed: ["HEPT"],
			  pre_req : ["PAID 112"],
			  desc : "Using texts in translation, this course explores select aspects or themes from the cultures of ancient Greece and Rome. Topics range from consideration of a particular literary genre to the in-depth study of a particular place and time, and its broader explorations of Greco-Roman culture in comparison with other cultures. This course is writing intensive and fulfills the writing requirements for all majors in the classics department. Offered alternate years."
			},
			{ title: "Introduction to Computer Science",
			  num : 150, 
			  dept : "CS",
			  division : "Science",
			  credit_hrs : 4,
			  est_enrollment : 25,
			  capacity : 25,
			  term : ["FALL", "SPRING"],
			  gen_ed : ["QUANT"],
			  desc: "An introduction to computer science emphasizing problem solving. Problems are selected from a variety of interesting areas such as graphics, image processing, cryptography, data analysis, astronomy, video games, and environmental stimulation. Topics include algorithm design and object oriented programming."
			},
			{ title : "Algorithms and Data Structures",
			  num : 160,
			  dept : "CS",
			  division : "Science",
			  credit_hrs : 4,
			  est_enrollment : 25,
			  capacity : 25,
			  term : ["FALL","SPRING"],
			  pre_req : ["CS 150"],
			  desc : "A continuation of the ideas presented in CS 150 with particular emphasis on data structures, algorithms, and analysis. Implementation of abstract data types such as stacks, queues, trees, and graphs as well as important recursive and non-recursive algorithms. Analysis of sorting and searching algorithms."
			},
			{
			  title : "Software Developement Tools",
			  num : 165,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 2,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  desc : "Students are introduced to tools for automation including shell programming, use of the Linux operating system including redirection of input and output, piping, file management, and system security."
			},
			{
			  title : "Object-Oriented Programming with Java",
			  num : 252,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 2,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req : ["CS 150", "CS 165"],
			  desc: "Introduction to Java and development in an object-oriented programming language. Topics include project setup and organization, packages, classes, object creation, inheritance, interfaces, polymorphism and the use of built-in types and the Java class library. Considerable time is dedicated to learning incremental programming, debugging strategies, testing strategies, interface documentation, preconditions, postconditions, boundary case testing, unit testing of individual functions, test stubs and test harnesses"
			},
			{
			  title : "Object-Oriented Programming with C++",
			  num : 253,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 2,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req : ["CS 150","CS 165"],
			  desc : "Introduction to C and C++ and development in an object-oriented programming language. Topics include C++ organization of classes and function prototypes, header files, class declaration and implementation. Other topics include inheritance, polymorphism, the use of copy constructors, destructors, streams, and operator overloading. Considerable time is dedicated to learning incremental programming, debugging strategies, testing strategies, interface documentation, preconditions, postconditions, boundary case testing, unit testing of individual functions, test stubs and test harnesses."
			},
			{
			  title : "Computational Models",
			  num : 260,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req : ["CS 160", "CS 165"],
			  desc:"In this course we examine mathematical structures that are relevant to understanding both theoretical as well as practical ideas in computer science. Topics include: logic, sets, graph theory, regular languages, deterministic and nondeterministic finite automata, regular grammars, regular expressions, induction and recursion, pushdown automata, turing machines, and computability."
			},
			{
			  title : "Internet Programming",
			  num : 330,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req : ["CS 130", "CS 140", "CS 160"],
			  desc : "In this course we examine three-tier Internet application architectures. Applications developed for the internet typically have a database back end, an application server in the middle and a web server on the front end. We will examine application programming frameworks from CGI to Servlets, and other modern application programming frameworks such as Ruby on Rails. Other topics include XML-based architectures such as RSS and web services, data transformation using XSL and XSLT. The course is largely project driven, students will implement a complete web based application. HCI is addressed."
			},
			{
			  title : "Advanced Algorithms and Data Structures",
			  num : 360,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  desc: "Development of advanced data structures, parallel algorithms, and advanced analysis of algorithms. Included topics are B-trees, Tries, B+ and B* trees, hashing algorithms and other structures for dealing with large data sets. Algorithms for data set manipulation including parallel algorithms for processing data sets."
			},
			{
			  title : "Programming Languages",
			  num : 370,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req: ["CS 252 or 253", "CS 260"],
			  desc : "A comparison of the structure, design, and applications of various programming languages. Topics include history, language definition, formal models of syntax and semantics, data types and structures, data abstraction, control structures, data flow, and runtime considerations. Languages will be discussed in a logical organization based upon the major paradigms including imperative, logic, functional, and object oriented. Examples from classic and contemporary languages."		
			},
			{
			  title : "Computer Networks",
			  num : 430,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req: ["CS 252 or 253", "CS 260"],		
			  desc : "Concepts, principles, protocols, and applications of computer networks with a focus on the Internet, including application layer protocols such as http, smtp; socket programming and peer-to-peer networks; transport-layer protocols such as TCP, UDP and congestion control; network layer algorithms for routing and broadcast, and multicast; link-level protocols for local area networks such as Ethernet and WIFI; and issues in network privacy and security."	
			},
			{
			  title : "Database Management Systems",
			  num : 440,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req: ["CS 140", "CS 252 or 253", "CS 260"],
			  desc : "This course takes a bottom-up approach to understanding a complex software system. The course examines the implementation of a database management system. Topics include disk and file management, transaction processing, meta-data management, query planning and implementation, parsing queries, indexing, query optimization, and B-trees."				
			},
			{
			  title : "Operating Systems and Architecture",
			  num : 450,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 4,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  pre_req: ["CS 252 or 253", "CS 260"],	
			  desc : "A study of computer architecture and operating systems structures and algorithms emphasizing multiple-user systems. Topics include binary number systems, digital logic circuits, machine architecture and assembly language, process management, CPU scheduling, concurrency and multi-tasking computing concepts including communication and synchronization issues, storage management, and protection and security."			
			},
			{
			  title : "Writing in the Major Lab",
			  num : 296,
			  dept : "CS",
			  division : "Science",
			  credit_hrs: 1,
			  est_enrollment: 25,
			  capacity :25,
			  term : ["FALL", "SPRING"],
			  desc : "A companion to any of CS 320, 330, 352, 353, 360, 370, 420, 430, 440, or 450. Students wishing to delve deeper into a subject in one of the companion courses may register for this lab with consent of instructor. A student taking this lab will be required to write a technical paper in the style typical of a computer science journal or conference proceedings, on a topic agreed to by the companion course instructor. Feedback will be provided on writing style and content with the paper going through multiple revisions. Students receiving a C or better on their paper will fulfill the writing in the major requirement. Students may register for this as a seven week lab anytime prior to the middle of the semester in which the companion course is taught. Requires consent of instructor."				
			}
		  ];
db.users.insert(users);
db.depts.insert(depts);
db.courses.insert(courses);
//initialilze archive with courses.
db.archive.insert(courses);

//add pre-req links for courses


