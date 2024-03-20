# Youtube-Comments-API

## Introduction
----------
The *YouTube Comments API* is an application that allows the users to do the following:

1. Pull comment associated to a Youtube video by providing the Youtube video id
2. Analyse each comment and gives it a sentiment category of any number between -1 and 1. -1 been the most negative and 1 been most positive

# Project Management

The project was managed through and Agile method using a Trello board - [to view the associated Trello click here](https://trello.com/b/zp19Rh6r/team-x-project-youtube)

[View the API Swagger Documentation for this API here](http://localhost:3000/youtubecomments/api/v1/api-docs/)
This project relies on the YouTube Data API: [view the YouTube API docs here](https://developers.google.com/youtube/v3/docs/?apix=true#CommentThreads)

### Technology Stack Used
1. Typescript backend
2. PostgreSql database
3. Sequelise for Object Relational Mapper
4. Test Driven Development Approach implemented using Jest

### Challenges
1. Defining the scope of the project
2. Integrating with the YouTube Data API

### Achievements
+ [x] Successfully pulled Youtube comments associated to given valid video id
+ [x] Successfully analysed and categorised each comment pulled
+ [x] Successfully provided a full coverage testing for the application apis
+ [x] Successfully managed our project using Trello

### Future Development
+ [ ] Provide an interesting frontend for the application
+ [ ] Improve our analysis such that comments can be categorised in to SPAM, ABUSIVE, CHILD-INAPPROPRIATE
+ [ ] Allow user to specify categories of analysis the would like to see
+ [ ] Get all comments for all videos for a particular channel
+ [ ] Add OAuth to allow users to login and use results to change their own YouTube channel settings
+ [ ] Allow a user to update the 'blocked words' on their YouTube automated filter settings
+ [ ] Enable users to delete comments or mark them as spam on their own YouTube content based on the API’s analysis.
+ [ ] Allow users to be able to provide a list of words/phrases to be used to analyze the video comments
+ [ ] Enable users to be able to view the top contributor for the video URL provided so that they can monitor their community

### Project Setup

#### Prerequisites
* Node version 19.18.2
* NPM version 9.8.1

#### Instructions
1. Clone repo from https://github.com/darkmooink/Youtube-Comments-API.git
2. Create a database using PostgreSQL
3. Update the `.env` file with your database credentials - database name and login details.
4. Run the following command at the root of the project folder to install application dependencies:
``````
npm i
``````
  - This installs all the packages required for the project as defined in the `package.json` file.
5. Configure Environment Variables
  - Create three `.env` files based on the `.env.template`:
  
    1. **Development Environment**:

      - Copy `.env.template` to `.env.development`.
      - Configure with values for the development environment.

    2. **Test Environment**:

      - Copy `.env.template` to `.env.test`.
      - Set variables for the testing environment.

    3. **Live Environment**:

      - Copy `.env.template` to `.env.live`.
      - Fill in variables for the live environment.

**Please Note:** These files are crucial for configuring the project in different environments.

#### Getting Started

-   Run `npm start` to run in a development enviroment
-   Run `npm test` to run the unit tests
-   Run `npm run test-w` to run the unit tests in jest watch mode
-   Run `npm run live` to run the live enviroment.
-   View the landing page here: http://localhost:3000/youtubecomments/api/v1/ to 
-   Use POSTMAN / browser to view categorisation of comments -
``````
      GET - http://localhost:<APPLICATION-PORT>/youtubecomments/api/v1/comments/<VIDEO-ID>/<NUMBER-OF-COMMENTS-TO-BE-RETURNED>?API_KEY=<YOUR-YOUTUBE-API-KEY>
        - sample API key is 9723667a-1fbe-4998-ae25-a832e1f9aae2
``````