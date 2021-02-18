# CodersCamp 2020 Project 4 
### Node.js backend app for CodersCamp participants

## Goal

To build an application that will allow 
- CodersCamp organizers to store and manage the information about the attendees
- Mentors to manage their group (input results, check the progress)
- Attendees to check their test and project grades and see if they will receive the certificate (with the forecast it they will get certified)

## Requirements

### UI Functionalities per user type

- Login panel (authorization with email and password, option to reset the password)
    - *on the login panel maybe there could be some pinned 'top' project link created by the participants changing daily/weekly*
- Main Menu
    - the same view for all user types, different options available on the left hand side menu depending on the permission level

- **'Participant' functionalities**
    - account management (checking the basic data, password/email management)
    - course progress (displaying the results of each test and project and certificate forecast)
        - this could be a default view for participant
    - course plan (with dates for each stage start/finish) could be as a graph created by some external library (?)
    - *OPTIONAL: newsfeed - checking the information posted by the organisers*
    - *OPTIONAL: course content - something like process.st, so all the data about the course sections with description, links and functionality to show how much time is left to finish each section*
    - *OPTIONAL: posting the project results*
        - each team could post their results straight in the app and then everyone could easily check other team's project outcome. We could also add here a possibility to make project private (?)
    - *OPTIONAL: recruitment mode - user could apply for the course straight from the app*

- **Mentor functionalities**
    - own account management
    - my group progress (checking/editing the grades of each person) this could be a table-like view with possibility to edit the grades after entering the *edit* mode

- **Admin functionalities**
    - own account management
    - user management
        - table-like view of all users with possibility to edit them (add, remove)
        - admin should be able to filter the users based on the provided search query (query can be directly used in the database request, we can assume admin knows how to build a correct query)
        - admin should be able to select all currently filtered users (e.g. to select all camp participants for 2019 to archive them)
        - admin should be able to batch edit all fields for currently selected users (mainly assigning to the course)
        - *OPTIONAL: admin should be able to send a batch email to all selected users*
        - *OPTIONAL: automated matching the users with mentors, so the app creates the groups by itself*
    - course creation/management
        - creating the course, adding users to the course, archiving the course...
    - *OPTIONAL: posting messages on the newsboard*
    - *OPTIONAL: selecting the project to be pinned on the login page, adding its description...*
    - *OPTIONAL: editing course roadmap - maybe it could be a simple text input with tag-based text formatting (maybe there are text-editor libraries to be used directly here?)*
    - *OPTIONAL: recruitment management - selecting/rejecting candidates...*

### UI Components

- Login page
- Application *main* page (where the menu and currently selected component are injected)
- User account management
- Course overview - for user, with results and plan on the same page
- User management - shared for admins and mentors, mentor sees only his own group without filtering option
- Course management - admin only, table-like view of all courses with modal for course creation
- *OPTIONAL: Newsboard - shared for all, admins have a button to add/edit posts*
- *OPTIONAL: Course content - list of sections as on process.st*
- *OPTIONAL: Course content management - content editor for admins*
- *OPTIONAL: Login page management - for admins to pin the top projects*

### Authentication / authorization
The application should allow to authenticate andauthorize users with three different permission levels
- admin (CodersCamp organizer)
- mentor (group lead)
- student/participant (a person attending the CodersCamp)

### Data storage
There should be a database prepared, that will allow the application to store the below-mentioned information:
- course information
    - stationary (boolean)
    - start date (date)
    - finish date (date)
    - description (text)
    - sections (e.g JS, TS, React ... - stored in array/object)?
- user information
   - user type (admin/mentor/participant)
   - user first name
   - user last name
   - user email
   - user grades (array/object)?
   - user final grade (do we need it?)
   - certificate (boolean?)
   - user birth date (do we need it?)
   - user course
- other stuff to be added....

NOTE: no user should be able to remove any documents (users, courses...) from the db - instead the documents should be marked as 'hidden' or 'removed' but still stored - to avoid the situation that someone removed a user by mistake

### Additional functionalities
As it is required to use an external service in the project - let's use the mailing system as proposed by the CodersCamp organizers to handle password setup and informing users about the added grades or news from the organisers

## User stories
### Participant
As a participant I want to 
- be able to create an account in the app.
- check my grades and what is the forecast for my cerfitication
- *OPTIONAL: have access to all the course materials*
- *OPTIONAL: be able to post my group's project*
- *OPTIONAL: check the course plan*
- *OPTIONAL: check the course news*

### Mentor
As a mentor I want to:
- be able to check my group's progress
- send over my group's grades

### Admin
As an admin I want to:
- manage the participants 
    - link them with mentors
    - check their progress
    - filter participants based on my needs (by course, by results)
    - batch edit the participants (assign multiple users to a course, remove)
- manage the courses
    - add, modify the courses
    - *add, modify the course plan*
- *OPTIONAL: to post the messages*
    - *I should be able to select who sees each message (so only 2020 attendees, only users who didn't pass the JS test...)*
- *OPTIONAL: post the pinned project on the login page*
- *OPTIONAL: manage the course content - add the links to the materials, format the descriptions...*

## Project plan
Let's describe it at the beginning of the project to have a high-level overview of what's to be done for each week in order to meet the final deadline easier :) Example below, let's fill it later once we will select the functionalities we need.

- **Month 1** - backend application
- Week 1
    - finalising the requirements
    - defining the data structure
    - setting up the database
    - tech setup of the project
    - setting up the db connection within the app
    - RESULT: project ready to be started
- Week 2
    - goal
    - RESULT: e.g. we can push and pull the user data from the db by sending the crafted requests
- Week 3
    - goal 
    - RESULT: e.g. we can handle the course data from the db by sending the crafted requests AND authentication service works
- Week 4
    - goal
    - RESULT: e.g. mailing service sends the emails with login info, we can handle all the data with crafted requests ...

- **Month 2** - frontend application
- Week 1
    - goal  
    - RESULT:  
- Week 2
    - goal
    - RESULT:
- Week 3
    - goal
    - RESULT:
- Week 4
    - goal
    - RESULT:
