set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "statuses" (
	"statusId" serial NOT NULL,
	"statusName" TEXT NOT NULL,
	CONSTRAINT "statuses_pk" PRIMARY KEY ("statusId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tasks" (
	"taskId" serial NOT NULL,
	"statusId" integer NOT NULL,
	"userId" integer NOT NULL,
	"projectId" integer NOT NULL,
	"description" TEXT NOT NULL,
	"dateCreated" TEXT NOT NULL,
	"deadline" TEXT NOT NULL,
	"files" TEXT NOT NULL,
	CONSTRAINT "tasks_pk" PRIMARY KEY ("taskId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "comments" (
	"commentId" serial NOT NULL,
	"taskId" integer NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "documents" (
	"documentId" serial NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "documents_pk" PRIMARY KEY ("documentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "timeTracker" (
	"timeTrackerId" serial NOT NULL,
	"userId" integer NOT NULL,
	"timeLog" TEXT NOT NULL,
	CONSTRAINT "timeTracker_pk" PRIMARY KEY ("timeTrackerId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "project" (
	"projectId" serial NOT NULL,
	"projectName" TEXT NOT NULL,
	CONSTRAINT "project_pk" PRIMARY KEY ("projectId")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("statusId") REFERENCES "statuses"("statusId");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk2" FOREIGN KEY ("projectId") REFERENCES "project"("projectId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("taskId") REFERENCES "tasks"("taskId");

ALTER TABLE "documents" ADD CONSTRAINT "documents_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "timeTracker" ADD CONSTRAINT "timeTracker_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
