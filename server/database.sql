-- Create database
CREATE DATABASE IF NOT EXISTS loopin_portal;
USE loopin_portal;
Show tables; 
-- Create team_members table with enhanced structure
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    position_hierarchy ENUM('Chairperson', 'Vice-chairperson', 'Secretary', 'Director', 'Head', 'Subhead', 'Member') DEFAULT 'Member',
    department ENUM('Technicals', 'Research', 'SMCW', 'Digital Creatives', 'Marketing', 'Public Relations', 'Logistics', 'Inhouse Creatives', 'Photography') DEFAULT NULL,
    member_type ENUM('super_core', 'core', 'member') DEFAULT 'member',
    image VARCHAR(255),
    linkedin VARCHAR(255),
    github VARCHAR(255),
    Instragram VARCHAR(255),
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
drop table team_members;
select * from team_members;
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

-- Insert enhanced team members data
INSERT INTO team_members (name, role, position_hierarchy, department, member_type, image, linkedin, github, twitter, email, bio) VALUES
-- Super Core Members
('Alex Johnson', 'Chairperson', 'Chairperson', NULL, 'super_core', '/team/alex-johnson.jpg', 'https://linkedin.com/in/alexjohnson', 'https://github.com/alexjohnson', 'https://twitter.com/alexjohnson', 'alex.johnson@iet.edu', 'Leading the committee with passion for technology and innovation. Computer Science major with 3 years of leadership experience.'),
('Sarah Chen', 'Vice-chairperson', 'Vice-chairperson', NULL, 'super_core', '/team/sarah-chen.jpg', 'https://linkedin.com/in/sarahchen', 'https://github.com/sarahchen', 'https://twitter.com/sarahchen', 'sarah.chen@iet.edu', 'Coordinating events and managing team operations. Electrical Engineering student with a love for renewable energy projects.'),
('Mike Rodriguez', 'Secretary', 'Secretary', NULL, 'super_core', '/team/mike-rodriguez.jpg', 'https://linkedin.com/in/mikerodriguez', 'https://github.com/mikerodriguez', 'https://twitter.com/mikerodriguez', 'mike.rodriguez@iet.edu', 'Managing communications and documentation. Business major with excellent organizational and communication skills.'),
('Emily Davis', 'Director', 'Director', NULL, 'super_core', '/team/emily-davis.jpg', 'https://linkedin.com/in/emilydavis', 'https://github.com/emilydavis', 'https://twitter.com/emilydavis', 'emily.davis@iet.edu', 'Overseeing all departmental operations and strategic planning. Experienced leader with a vision for innovation.'),

-- Core Members - Technicals Department
('David Kim', 'Head of Technicals', 'Head', 'Technicals', 'core', '/team/david-kim.jpg', 'https://linkedin.com/in/davidkim', 'https://github.com/davidkim', 'https://twitter.com/davidkim', 'david.kim@iet.edu', 'Leading technical initiatives and workshops. Full-stack developer with expertise in modern web technologies.'),
('Lisa Wang', 'Subhead of Technicals', 'Subhead', 'Technicals', 'core', '/team/lisa-wang.jpg', 'https://linkedin.com/in/lisawang', 'https://github.com/lisawang', 'https://twitter.com/lisawang', 'lisa.wang@iet.edu', 'Supporting technical projects and mentoring junior members. Passionate about coding and problem-solving.'),

-- Core Members - Research Department
('James Wilson', 'Head of Research', 'Head', 'Research', 'core', '/team/james-wilson.jpg', 'https://linkedin.com/in/jameswilson', 'https://github.com/jameswilson', 'https://twitter.com/jameswilson', 'james.wilson@iet.edu', 'Leading research initiatives and academic collaborations. PhD candidate in Computer Science.'),
('Maria Garcia', 'Subhead of Research', 'Subhead', 'Research', 'core', '/team/maria-garcia.jpg', 'https://linkedin.com/in/mariagarcia', 'https://github.com/mariagarcia', 'https://twitter.com/mariagarcia', 'maria.garcia@iet.edu', 'Coordinating research projects and publications. Expert in data science and machine learning.'),

-- Core Members - SMCW Department
('Tom Brown', 'Head of SMCW', 'Head', 'SMCW', 'core', '/team/tom-brown.jpg', 'https://linkedin.com/in/tombrown', 'https://github.com/tombrown', 'https://twitter.com/tombrown', 'tom.brown@iet.edu', 'Managing social media and content writing initiatives. Creative writer with digital marketing expertise.'),
('Anna Lee', 'Subhead of SMCW', 'Subhead', 'SMCW', 'core', '/team/anna-lee.jpg', 'https://linkedin.com/in/annalee', 'https://github.com/annalee', 'https://twitter.com/annalee', 'anna.lee@iet.edu', 'Creating engaging content and managing social media presence. Skilled in content strategy and community engagement.'),

-- Core Members - Digital Creatives Department
('Chris Taylor', 'Head of Digital Creatives', 'Head', 'Digital Creatives', 'core', '/team/chris-taylor.jpg', 'https://linkedin.com/in/christaylor', 'https://github.com/christaylor', 'https://twitter.com/christaylor', 'chris.taylor@iet.edu', 'Leading digital design and creative projects. Expert in UI/UX design and digital media production.'),
('Sophie Martin', 'Subhead of Digital Creatives', 'Subhead', 'Digital Creatives', 'core', '/team/sophie-martin.jpg', 'https://linkedin.com/in/sophiemartin', 'https://github.com/sophiemartin', 'https://twitter.com/sophiemartin', 'sophie.martin@iet.edu', 'Creating stunning visual content and digital assets. Talented graphic designer and multimedia artist.'),

-- Core Members - Marketing Department
('Ryan Clark', 'Head of Marketing', 'Head', 'Marketing', 'core', '/team/ryan-clark.jpg', 'https://linkedin.com/in/ryanclark', 'https://github.com/ryanclark', 'https://twitter.com/ryanclark', 'ryan.clark@iet.edu', 'Developing marketing strategies and brand awareness. Marketing specialist with event promotion expertise.'),
('Jessica White', 'Subhead of Marketing', 'Subhead', 'Marketing', 'core', '/team/jessica-white.jpg', 'https://linkedin.com/in/jessicawhite', 'https://github.com/jessicawhite', 'https://twitter.com/jessicawhite', 'jessica.white@iet.edu', 'Executing marketing campaigns and audience engagement. Creative marketer with strong analytical skills.'),

-- Core Members - Public Relations Department
('Daniel Miller', 'Head of Public Relations', 'Head', 'Public Relations', 'core', '/team/daniel-miller.jpg', 'https://linkedin.com/in/danielmiller', 'https://github.com/danielmiller', 'https://twitter.com/danielmiller', 'daniel.miller@iet.edu', 'Managing external communications and stakeholder relationships. PR expert with strong networking skills.'),
('Rachel Green', 'Subhead of Public Relations', 'Subhead', 'Public Relations', 'core', '/team/rachel-green.jpg', 'https://linkedin.com/in/rachelgreen', 'https://github.com/rachelgreen', 'https://twitter.com/rachelgreen', 'rachel.green@iet.edu', 'Building partnerships and managing media relations. Skilled communicator with event coordination experience.'),

-- Core Members - Logistics Department
('Kevin Anderson', 'Head of Logistics', 'Head', 'Logistics', 'core', '/team/kevin-anderson.jpg', 'https://linkedin.com/in/kevinanderson', 'https://github.com/kevinanderson', 'https://twitter.com/kevinanderson', 'kevin.anderson@iet.edu', 'Coordinating event logistics and resource management. Operations specialist with project management expertise.'),
('Amanda Hall', 'Subhead of Logistics', 'Subhead', 'Logistics', 'core', '/team/amanda-hall.jpg', 'https://linkedin.com/in/amandahall', 'https://github.com/amandahall', 'https://twitter.com/amandahall', 'amanda.hall@iet.edu', 'Managing venue arrangements and technical requirements. Detail-oriented organizer with strong planning skills.'),

-- Core Members - Inhouse Creatives Department
('Mark Thompson', 'Head of Inhouse Creatives', 'Head', 'Inhouse Creatives', 'core', '/team/mark-thompson.jpg', 'https://linkedin.com/in/markthompson', 'https://github.com/markthompson', 'https://twitter.com/markthompson', 'mark.thompson@iet.edu', 'Leading in-house creative projects and branding initiatives. Creative director with multimedia production expertise.'),
('Laura Adams', 'Subhead of Inhouse Creatives', 'Subhead', 'Inhouse Creatives', 'core', '/team/laura-adams.jpg', 'https://linkedin.com/in/lauraadams', 'https://github.com/lauraadams', 'https://twitter.com/lauraadams', 'laura.adams@iet.edu', 'Creating compelling visual content and brand materials. Talented artist with strong creative vision.'),

-- core member - Photography
('John Smith', 'Head of Photography', 'Head', 'Photography', 'member', '/team/john-smith.jpg', 'https://linkedin.com/in/johnsmith', 'https://github.com/johnsmith', 'https://twitter.com/johnsmith', 'john.smith@iet.edu', 'Contributing to technical projects and learning new technologies. Enthusiastic developer with a passion for innovation.'),
('Emma Wilson', 'Subhead of Photogrsphy', 'Subhead', 'Photography', 'member', '/team/emma-wilson.jpg', 'https://linkedin.com/in/emmawilson', 'https://github.com/emmawilson', 'https://twitter.com/emmawilson', 'emma.wilson@iet.edu', 'Supporting research initiatives and data analysis. Dedicated researcher with strong analytical skills.');

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