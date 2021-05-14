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
  - _on the login panel maybe there could be some pinned 'top' project link created by the participants changing daily/weekly_
- Main Menu

  - the same view for all user types, different options available on the left hand side menu depending on the permission level

- **'Participant' functionalities**

  - account management (checking the basic data, password/email management)
  - course progress (displaying the results of each test and project and certificate forecast)
    - this could be a default view for participant
  - course plan (with dates for each stage start/finish) could be as a graph created by some external library (?)
  - _OPTIONAL: newsfeed - checking the information posted by the organisers_
  - _OPTIONAL: course content - something like process.st, so all the data about the course sections with description, links and functionality to show how much time is left to finish each section_
  - _OPTIONAL: posting the project results_
    - each team could post their results straight in the app and then everyone could easily check other team's project outcome. We could also add here a possibility to make project private (?)
  - _OPTIONAL: recruitment mode - user could apply for the course straight from the app_

- **Mentor functionalities**

  - own account management
  - my group progress (checking/editing the grades of each person) this could be a table-like view with possibility to edit the grades after entering the _edit_ mode

- **Admin functionalities**
  - own account management
  - user management
    - table-like view of all users with possibility to edit them (add, remove)
    - admin should be able to filter the users based on the provided search query (query can be directly used in the database request, we can assume admin knows how to build a correct query)
    - admin should be able to select all currently filtered users (e.g. to select all camp participants for 2019 to archive them)
    - admin should be able to batch edit all fields for currently selected users (mainly assigning to the course)
    - _OPTIONAL: admin should be able to send a batch email to all selected users_
    - _OPTIONAL: automated matching the users with mentors, so the app creates the groups by itself_
  - course creation/management
    - creating the course, adding users to the course, archiving the course...
  - _OPTIONAL: posting messages on the newsboard_
  - _OPTIONAL: selecting the project to be pinned on the login page, adding its description..._
  - _OPTIONAL: editing course roadmap - maybe it could be a simple text input with tag-based text formatting (maybe there are text-editor libraries to be used directly here?)_
  - _OPTIONAL: recruitment management - selecting/rejecting candidates..._

### UI Components

- Login page
- Application _main_ page (where the menu and currently selected component are injected)
- User account management
- Course overview - for user, with results and plan on the same page
- User management - shared for admins and mentors, mentor sees only his own group without filtering option
- Course management - admin only, table-like view of all courses with modal for course creation
- _OPTIONAL: Newsboard - shared for all, admins have a button to add/edit posts_
- _OPTIONAL: Course content - list of sections as on process.st_
- _OPTIONAL: Course content management - content editor for admins_
- _OPTIONAL: Login page management - for admins to pin the top projects_

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
- _OPTIONAL: have access to all the course materials_
- _OPTIONAL: be able to post my group's project_
- _OPTIONAL: check the course plan_
- _OPTIONAL: check the course news_

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
  - _add, modify the course plan_
- _OPTIONAL: to post the messages_
  - _I should be able to select who sees each message (so only 2020 attendees, only users who didn't pass the JS test...)_
- _OPTIONAL: post the pinned project on the login page_
- _OPTIONAL: manage the course content - add the links to the materials, format the descriptions..._
