# CodersCamp 2020 Project 4 
### Node.js backend app for CodersCamp participants data storage

## Goal

To build an application that will allow 
- CodersCamp organizers to store and manage the information about the attendees
- Mentors to manage their group (input results, check the progress)
- Attendees to check their test and project grades and see if they will receive the certificate (with calculated required future grades)

## Requirements

### UI functionalities

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
    - *OPTIONAL: course roadmap - something like process.st, so all the data about the course sections with description, links and functionality to show how much time is left to finish each section*
    - *OPTIONAL: posting the project results*
        - each team could post their results straight in the app and then other teams could easily check other team's project outcome (not sure if every team will like it but it might make the course more competitive and allow us to check other projects/solutions more easily). We could also add here a possibility to make project private?
    - *OPTIONAL: recruitment mode - user could apply for the course straight from the app*

- **Mentor functionalities**
    - account management
    - my group progress (checking the grades of each person) this could be a table-like view with possibility to edit the grades after opening the *edit* mode

- **Admin functionalities**
    - own account management
    - user account management
        - table-like view of all users with possibility to edit them (add, remove)
        - batch actions could be useful here
    - course creation/management
        - creating the course, adding users to the course, archiving the course...
    - user progress management
        - table-like view of all users with their results (with sorting for example? per course, per highest grade...)
    - *OPTIONAL: posting messages on the newsboard*
    - *OPTIONAL: selecting the project to be pinned on the login page, adding its description...*
    - *OPTIONAL: posting messages on the newsboard*
    - *OPTIONAL: recruitment management - selecting/rejecting candidates...*

### Authentication / authorization
The application should allow authenticating users and authorize them with three different permission levels
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
- 

### Additional functionalities
As it is required to use an external service in the project - let's use the mailing system as proposed by the CodersCamp organizers to handle password setup and informing users about the added grades or news from the organisers


## Project organization
- **Month 1**
- Week 1
    - finalising the 
