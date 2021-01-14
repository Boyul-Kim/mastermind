insert into "statuses" ("statusId", "statusName")
values (default, 'Current Tasks'),
       (default, 'For Review'),
       (default, 'Completed'),
       (default, 'Backlog');

insert into "project" ("projectId", "projectName")
values (default, 'Mastermind');

insert into "users" ("userId", "username", "hashedPassword", "email", "userMap")
values (default, 'demoUser', '$argon2i$v=19$m=4096,t=3,p=1$X/yhxhemvA73Sg/6sVld5g$PPlRjJZLVL9xxA4z0/1HNOg3wsecw/FqDVeHyltSPFw', 'test123@test.com', default);

insert into "tasks" ("taskId", "statusId", "userId", "projectId", "taskName", "description", "dateCreated", "deadline")
values (default, 1, 1, 1, 'User can delete a task', 'User can delete a task when user clicks on delete button', '1/9/2021', '1/10/2021'),
       (default, 2, 1, 1, 'User can create a task', 'User can create a task when user clicks on plus button', '1/8/2021', '1/9/2021'),
       (default, 3, 1, 1, 'User can slide horizontally', 'User can slide horizontally to view all statuses', '1/6/2021', '1/7/2021'),
       (default, 4, 1, 1, 'User can upload documents', 'User can upload documents', '1/13/2021', '1/15/2021');
