CREATE TABLE "ToDo" (
	"id" serial primary key,
	"description" varchar(250)
);

SELECT * FROM "ToDo"; 

INSERT INTO "ToDo" ( "description" )
VALUES ( 'Morning Exercise' );

SELECT * FROM "ToDo"; 

DELETE FROM "ToDo" WHERE "id"= 1;

SELECT * FROM "ToDo"; 

INSERT INTO "ToDo" ( "description" )
VALUES ( 'Take out the Trash!' );

ALTER TABLE "ToDo"
ADD "completed" BOOLEAN;

SELECT * FROM "ToDo";