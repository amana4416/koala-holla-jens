CREATE TABLE koalas (
    "id" serial PRIMARY KEY,
    "name" varchar(20) NOT NULL,
    "age" integer, 
    "gender" varchar(20) NOT NULL,
    "readyForTransfer" varchar(20) NOT NULL,
    "notes" varchar(50)
);

INSERT INTO koalas (name, age, gender, "readyForTransfer", notes)
	VALUES 
	('Scotty', 4, 'M', 'Y', 'Born in Guatemala'),
	('Jean', 5, 'F', 'Y', 'Allergic to lots of lava'),
	('Ororo', 7, 'F', 'N', 'Loves listening to Paula (Abdul)'), 
	('Logan', 15, 'M', 'N', 'Loves the sauna'),
	('Charlie', 9, 'M', 'Y', 'Favorite band is Nirvana'),
	('Betsy', 4, 'F', 'Y', 'Has a pet iguana');