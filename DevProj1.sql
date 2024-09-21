select * from AffanUsers;
select * from AffanPosts;

drop table AffanPosts
drop table AffanUsers

Create Table AffanUsers(
 userId int Primary Key identity(1,1),
 userName varchar(50) not null unique,
 password varchar(50) not null
);

CREATE TABLE AffanPosts (
    postId INT PRIMARY KEY IDENTITY(1,1),
    userId INT FOREIGN KEY REFERENCES AffanUsers(userId),
    title VARCHAR(100),
    description VARCHAR(500),
    createdOn DATETIME DEFAULT GETDATE()
);



-- Inserting 5 Users
Insert Into AffanUsers (userName, password)
Values 
('Aryan', 'pass123'),
('Rahul', 'rahul@321'),
('Meena', 'meena456'),
('Sneha', 'sneha!987'),
('Vikas', 'vikas@789');


-- Inserting 10 Posts with random titles and descriptions linked to the users
Insert Into AffanPosts (userId, title, description)
Values 
(1, 'My First Post', 'This is the description of my first post.'),
(1, 'Learning SQL', 'Excited to learn SQL and work on databases!'),
(2, 'Rahul''s Update', 'Here''s what I have been up to recently.'),
(2, 'Travel Diaries', 'Sharing my experience of recent travels across India.'),
(3, 'Meena''s Story', 'This is a short story I wrote recently.'),
(3, 'Cooking Adventures', 'Trying out new recipes and learning to cook.'),
(4, 'Sneha''s Fitness Journey', 'How I stay fit and healthy every day.'),
(4, 'Tech Innovations', 'Exploring the latest trends in technology.'),
(5, 'Vikas''s Startup Idea', 'I have an exciting startup idea to share with everyone.'),
(5, 'Motivational Thoughts', 'Sharing some motivational thoughts and quotes for the day.');

insert into AffanUsers values('test1', 'test@123');
insert into AffanPosts (userId,title, description ) values (1, 'hola', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry');