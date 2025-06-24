-- Create database
CREATE DATABASE IF NOT EXISTS loopin_portal;
USE loopin_portal;
Show tables; 
-- Create team_members table with enhanced structure
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    position_hierarchy ENUM('Chairperson', 'Vice-chairperson', 'Secretary', 'Director', 'Head', 'Subhead', 'Member') DEFAULT 'Member',
    department ENUM('Technicals', 'Research', 'SMCW', 'Digital Creatives', 'Marketing', 'Public Relations', 'Logistics', 'Inhouse Creatives', 'Photography') DEFAULT NULL,
    member_type ENUM('super_core', 'core', 'member') DEFAULT 'member',
    image VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    Instagram VARCHAR(255),
    bio TEXT,
    hobbies TEXT,
    tags Text,
    email VARCHAR(150),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE team_members MODIFY image MEDIUMTEXT;
drop table team_members;
select * from team_members;
 UPDATE team_members SET name='Test', hobbies='Reading,Writing', tags='[\"Leadership\"]', email='test@example.com' WHERE id=3;
-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME,
    location VARCHAR(200),
    image VARCHAR(255),
    category VARCHAR(50),
    status ENUM('upcoming', 'completed') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
drop table events;
INSERT INTO events (title, description, date, time, location, image, category, status)
VALUES
-- Upcoming Events
('Tech Symposium 2024', 'A full-day symposium featuring talks and workshops on AI, IoT, and Robotics.', '2026-07-15', '10:00:00', 'Auditorium A', '/images/events/tech-symposium.jpg', 'Technical', 'upcoming'),
('Women in Engineering Panel', 'Panel discussion with leading women engineers sharing their journeys and advice.', '2026-07-22', '14:00:00', 'Conference Hall 2', '/images/events/women-in-eng.jpg', 'Panel', 'upcoming'),
('Annual Coding Marathon', '24-hour coding competition open to all students. Teams of up to 4.', '2026-08-05', '09:00:00', 'Lab 3', '/images/events/coding-marathon.jpg', 'Competition', 'upcoming'),

-- Completed Events
('Robotics Bootcamp', 'Hands-on bootcamp covering basics of robotics and automation.', '2024-05-10', '09:30:00', 'Workshop Room 1', '/images/events/robotics-bootcamp.jpg', 'Workshop', 'completed'),
('Alumni Networking Night', 'An evening to connect with IET alumni and industry professionals.', '2026-04-20', '18:00:00', 'Banquet Hall', '/images/events/alumni-night.jpg', 'Networking', 'completed'),
('Green Energy Seminar', 'Seminar on sustainable energy solutions and innovations.', '202-03-15', '16:00:00', 'Seminar Hall', '/images/events/green-energy.jpg', 'Seminar', 'completed');
-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Insert dummy events data
INSERT INTO events (title, description, date, time, location, image, category, status) VALUES
('Annual Tech Conference 2024', 'Join us for the biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities.', '2024-03-15', '09:00:00', 'Main Auditorium', '/events/tech-conference.jpg', 'Conference', 'upcoming'),
('Web Development Workshop', 'Learn modern web development techniques with hands-on projects and expert guidance.', '2024-02-28', '14:00:00', 'Computer Lab 101', '/events/web-dev-workshop.jpg', 'Workshop', 'upcoming'),
('AI and Machine Learning Seminar', 'Explore the latest developments in AI and ML with industry experts.', '2024-03-10', '16:00:00', 'Seminar Hall', '/events/ai-seminar.jpg', 'Seminar', 'upcoming'),
('Hackathon 2024', '24-hour coding challenge to solve real-world problems with amazing prizes.', '2024-04-05', '10:00:00', 'Innovation Center', '/events/hackathon.jpg', 'Competition', 'upcoming'),
('Career Fair', 'Connect with top companies and explore internship and job opportunities.', '2024-03-20', '11:00:00', 'Exhibition Hall', '/events/career-fair.jpg', 'Career', 'upcoming'),
('Cybersecurity Workshop', 'Learn about cybersecurity best practices and ethical hacking.', '2024-02-25', '15:00:00', 'Security Lab', '/events/cybersecurity.jpg', 'Workshop', 'upcoming');

-- Insert dummy announcements data
INSERT INTO announcements (title, content, date, priority) VALUES
('Important: Annual General Meeting', 'The Annual General Meeting will be held on March 15th, 2024. All members are requested to attend.', '2024-02-20', 'high'),
('New Committee Members Announced', 'We are pleased to announce the new committee members for the academic year 2024-25.', '2024-02-18', 'medium'),
('Upcoming Events Schedule', 'Check out our exciting lineup of events for the upcoming semester including workshops, seminars, and competitions.', '2024-02-15', 'medium'),
('Registration Open for Tech Conference', 'Registration for the Annual Tech Conference 2024 is now open. Early bird discounts available until February 28th.', '2024-02-12', 'high'),
('Volunteer Opportunities', 'We are looking for volunteers for our upcoming events. This is a great opportunity to gain experience and contribute to the community.', '2024-02-10', 'low'); 


CREATE TABLE IF NOT EXISTS contact_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

select * from contact_messages;

CREATE TABLE IF NOT EXISTS newsletters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    category ENUM('weekly', 'monthly', 'quarterly', 'special') DEFAULT 'weekly',
    downloadUrl VARCHAR(255),
    views INT DEFAULT 0,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy events data
INSERT INTO events (title, description, date, time, location, image, category, status) VALUES
('Annual Tech Conference 2024', 'Join us for the biggest tech event of the year featuring keynote speakers, workshops, and networking opportunities.', '2024-03-15', '09:00:00', 'Main Auditorium', '/events/tech-conference.jpg', 'Conference', 'upcoming'),
('Web Development Workshop', 'Learn modern web development techniques with hands-on projects and expert guidance.', '2024-02-28', '14:00:00', 'Computer Lab 101', '/events/web-dev-workshop.jpg', 'Workshop', 'upcoming'),
('AI and Machine Learning Seminar', 'Explore the latest developments in AI and ML with industry experts.', '2024-03-10', '16:00:00', 'Seminar Hall', '/events/ai-seminar.jpg', 'Seminar', 'upcoming'),
('Hackathon 2024', '24-hour coding challenge to solve real-world problems with amazing prizes.', '2024-04-05', '10:00:00', 'Innovation Center', '/events/hackathon.jpg', 'Competition', 'upcoming'),
('Career Fair', 'Connect with top companies and explore internship and job opportunities.', '2024-03-20', '11:00:00', 'Exhibition Hall', '/events/career-fair.jpg', 'Career', 'upcoming'),
('Cybersecurity Workshop', 'Learn about cybersecurity best practices and ethical hacking.', '2024-02-25', '15:00:00', 'Security Lab', '/events/cybersecurity.jpg', 'Workshop', 'upcoming');

-- Insert dummy announcements data
INSERT INTO announcements (title, content, date, priority) VALUES
('Important: Annual General Meeting', 'The Annual General Meeting will be held on March 15th, 2024. All members are requested to attend.', '2024-02-20', 'high'),
('New Committee Members Announced', 'We are pleased to announce the new committee members for the academic year 2024-25.', '2024-02-18', 'medium'),
('Upcoming Events Schedule', 'Check out our exciting lineup of events for the upcoming semester including workshops, seminars, and competitions.', '2024-02-15', 'medium'),
('Registration Open for Tech Conference', 'Registration for the Annual Tech Conference 2024 is now open. Early bird discounts available until February 28th.', '2024-02-12', 'high'),
('Volunteer Opportunities', 'We are looking for volunteers for our upcoming events. This is a great opportunity to gain experience and contribute to the community.', '2024-02-10', 'low');

-- Insert dummy newsletters data
INSERT INTO newsletters (title, description, date, category, downloadUrl, views, image) VALUES
('IET Weekly Digest - June 2024', 'Latest updates from the committee, upcoming events, and member spotlights.', '2024-06-20', 'weekly', 'https://example.com/newsletter1.pdf', 245, 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop'),
('Tech Innovation Report - Q2 2024', 'Comprehensive overview of technological advancements and their impact on our field.', '2024-06-15', 'quarterly', 'https://example.com/newsletter2.pdf', 189, 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'),
('Special Edition: Annual Symposium', 'Complete coverage of our annual tech symposium with highlights and key takeaways.', '2024-06-10', 'special', 'https://example.com/newsletter3.pdf', 312, 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?w=400&h=300&fit=crop'),
('Student Achievements - May 2024', 'Celebrating outstanding achievements of our committee members and students.', '2024-05-30', 'monthly', 'https://example.com/newsletter4.pdf', 156, 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop');

-- Table for newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100),
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Demo user: user_id = testuser, password = password123 (plain text)
DELETE FROM users WHERE user_id = 'testuser';
INSERT INTO users (user_id, password, name, role) VALUES ('testuser', 'password123', 'Test User', 'member'); 
INSERT INTO users (user_id, password, name, role) VALUES ('testuser2', 'password123', 'Test User', 'member'); 
INSERT INTO users (user_id, password, name, role) VALUES ('testuser3', 'password123', 'Test User', 'member'); 