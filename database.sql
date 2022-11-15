CREATE TABLE "todo" (
	"id" SERIAL PRIMARY KEY,
	"description" VARCHAR(250) NOT NULL,
	"IsComplete" BOOLEAN DEFAULT FALSE NOT NULL
);
INSERT INTO "todo" ( "description" )
VALUES ( 'Morning Exercise' );

INSERT INTO "todo" ( "description" )
VALUES ( 'Take out the Trash!' );

INSERT INTO "todo" ( "description" )
VALUES ( 'Take out the Trash!' );

SELECT * FROM "todo"; 

DELETE FROM "todo" WHERE "id"= 1;

SELECT * FROM "todo"; 

INSERT INTO "todo" ( "description" )
VALUES ( 'Take out the Trash!' );

INSERT INTO "todo" ( "description" )
VALUES ( 'Clean Room!' );

SELECT * FROM "todo";