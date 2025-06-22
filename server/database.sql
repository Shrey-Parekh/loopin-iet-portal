-- Create database
CREATE DATABASE IF NOT EXISTS loopin_portal;
USE loopin_portal;

-- Create team_members table
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    image VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    twitter VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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
    status ENUM('upcoming', 'ongoing', 'completed') DEFAULT 'upcoming',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create announcements table
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    date DATE NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert dummy team members data
INSERT INTO team_members (name, role, image, linkedin, github, twitter) VALUES
('John Doe', 'President', '/team/john-doe.jpg', 'https://linkedin.com/in/johndoe', 'https://github.com/johndoe', 'https://twitter.com/johndoe'),
('Jane Smith', 'Vice President', '/team/jane-smith.jpg', 'https://linkedin.com/in/janesmith', 'https://github.com/janesmith', 'https://twitter.com/janesmith'),
('Mike Johnson', 'Secretary', '/team/mike-johnson.jpg', 'https://linkedin.com/in/mikejohnson', 'https://github.com/mikejohnson', 'https://twitter.com/mikejohnson'),
('Sarah Wilson', 'Treasurer', '/team/sarah-wilson.jpg', 'https://linkedin.com/in/sarahwilson', 'https://github.com/sarahwilson', 'https://twitter.com/sarahwilson'),
('David Brown', 'Technical Lead', '/team/david-brown.jpg', 'https://linkedin.com/in/davidbrown', 'https://github.com/davidbrown', 'https://twitter.com/davidbrown'),
('Emily Davis', 'Marketing Lead', '/team/emily-davis.jpg', 'https://linkedin.com/in/emilydavis', 'https://github.com/emilydavis', 'https://twitter.com/emilydavis');

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