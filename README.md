# Project-WeLoveMovies
Chegg Skills WeLoveMovies 2024


CHANGE LOG

- 4/2
    - All tests passing

- 3/28
    - Revised reviews controller and service files--all tests passing related to reviews routes. 

- 3/27
    - Revised tables (syntax error)--migrated all tables and seeded data successfully
    - Added logic to app.js--will need to uncomment routes for reviews and theaters otherwise error will prevent tests from running.
    - Movies tests PASS--No further editing required for movies directory 
    - Review files added--10 out of 12 tests passing--need to revisit to incorporate critic info for update function.

- 3/26 
    - Export functions for seeds files--revisit movies_theaters to determine if modifications are necessary with reduce.
    - All error files and functions added
    - Worked on movies controller, router, and service--no tests passing, need to revisit with support

- 3/24/2024
    - Migrations COMPLETE--dropped all tables then used migrate:up command in specific order with foreign id tables last.
    - Created folders and files for movies, theaters, reviews

- 3/20/2024 
    - Database successfully connected via connection.js and knex.js
    - Migrations created for all 5 tables
    - Created 3 out of 5 tables and successfully migrated to database
        - NEXT STEPS--connect last two tables that have foreign keys (reviews and movies_theaters)

- 3/20/2024 Initialized git repository, review requirements, testing commit and push commands. 