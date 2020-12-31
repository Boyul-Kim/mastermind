insert into "users" ("username", "hashedPassword", "email")
values ('BoyulKim', 'password123', 'boyulkim1@gmail.com');

insert into "statuses" ("statusId", "statusName")
values (default, 'Current Tasks'),
       (default, 'For Review'),
       (default, 'Completed'),
       (default, 'Backlog');

insert into "project" ("projectId", "projectName")
values (default, 'App Refactor'),
       (default, 'Body Shaping');

insert into "tasks" ("taskId", "statusId", "userId", "projectId", "taskName", "description", "dateCreated", "deadline", "files")
values (default, 1, 1, 1, 'User Dependency Injection','created data model', 'Dec 23, 2020', 'Jan 2, 2021', 'test.txt'),
       (default, 1, 1, 1, 'User Testing', 'perform user testing', 'Dec 31, 2020', 'Jan 4, 2021', 'text.txt'),
       (default, 2, 1, 1, 'Create Figma', 'create figma for project', 'Dec 31, 2020', 'Jan 4, 2021', 'text.txt'),
       (default, 3, 1, 1, 'Create Project Features', 'perform user testing', 'Dec 31, 2020', 'Jan 4, 2021', 'text.txt'),
       (default, 4, 1, 1, 'Create Data Model', 'perform user testing', 'Dec 31, 2020', 'Jan 4, 2021', 'text.txt'),
       (default, 1, 1, 2, 'Create Body', 'create body for body shaping', 'Dec 31, 2020', 'Jan 4, 2021', 'text.txt');
