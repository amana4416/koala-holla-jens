CREATE TABLE "koalas" (
  "id" serial PRIMARY KEY,
  "name" varchar(20) NOT NULL,
  "age" INTEGER,
  "gender" varchar(1) NOT NULL, 
  "readyForTransfer" BOOLEAN DEFAULT false,
  "notes" varchar(255)
);

INSERT INTO "koalas" ("name", "age", "gender", "readyForTransfer", "notes") 
VALUES ( 'Scotty', 4, 'M', TRUE, 'Born in Guatemala'),
 ('Jean', 5, 'F', TRUE, 'Allergic to lots of lava'), 
 ('Ororo',  7, 'F', FALSE, 'Loves listening to Paula (Abdul)'),
 ('Logan', 15, 'M', FALSE, 'Loves to sauna'),
 ('Charlie', 9, 'm', TRUE, 'Favorite band is Nirvana'),
 ('Betsy', 4, 'F', TRUE, 'Has a pet iguana');
 
 SELECT * FROM "koalas";