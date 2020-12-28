insert into "users" ("username", "hashedPassword", "email")
values ('BoyulKim', 'password123', 'boyulkim1@gmail.com');

insert into "statuses" ("statusId", "statusName")
values (default, 'Current Tasks'),
       (default, 'For Review'),
       (default, 'Completed'),
       (default, 'Backlog');

insert into "project" ("projectId", "projectName")
values (default, 'App Refactor');

insert into "tasks" ("taskId", "statusId", "userId", "projectId", "description", "dateCreated", "deadline", "files")
values (default, 1, 1, 1, 'created data model', 'Dec 23, 2020', 'Jan 2, 2021', 'test.txt');
