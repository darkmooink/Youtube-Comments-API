# Youtube-Comments-API

INTRODUCTION

The YOUTUBE COMMENTS API is an application that allows the users to do the following

1. Pull comment associated to a Youtube video by providing the Youtube video id
2. Analyse each comment and gives it a sentiment category of any number between -1 and 1. -1 been the most negative and 1 been most positive

# Project Management

The project was managed through and Agile method using Trello - https://trello.com/b/zp19Rh6r/team-x-project-youtube

Swagger Endpoint is at - http://localhost:3000/youtubecomments/api/v1/api-docs/

# Technology Stack Used

1. Typescript backend
2. PostgreSql database
3. Sequelise for Object Relational Mapper
4. Test Driven Development Approach implemented using Jest

# Project Setup Instructions

1. clone repo from https://github.com/darkmooink/Youtube-Comments-API.git
2. create a database using PostgreSQL
3. update .env file with your database credentials - database name and login details.
4. run npm install at the root of the project folder to install application dependencies
5. use http://localhost:3000/youtubecomments/api/v1/ to view landing page
6. use POSTMAN / browser to view categorisation of comments -
   GET - http://localhost:<APPLICATION-PORT>/youtubecomments/api/v1/comments/<VIDEO-ID>/<NUMBER-OF-COMMENTS-TO-BE-RETURNED>?API_KEY=<YOUR-YOUTUBE-API-KEY>
    - sample API key is 9723667a-1fbe-4998-ae25-a832e1f9aae2

# Challenges

1. Defining the scope of the project
2.

# Achievements

1. Successfully pulled Youtube comments associated to given valid video id
2. Successfully analysed and categorised each comment pulled
3. Successfully provided a full coverage testing for the application apis
4. Successfully managed our project using Trello

# TO DO

1. Provide an interesting frontend for the application
2. Improve our analysis such that comments can be categorised in to SPAM, ABUSIVE, CHILD-INAPPROPRIATE
3. Allow user to specify categories of analysis the would like to see

## Step 1: Install Dependencies

Run the following command in the root of your project directory:

```bash
npm i
```

This installs all the packages required for the project as defined in the `package.json` file.

## Step 2: Configure Environment Variables

Create three `.env` files based on the `.env.template`:

1. **Development Environment**:

    - Copy `.env.template` to `.env.development`.
    - Configure with values for the development environment.

2. **Test Environment**:

    - Copy `.env.template` to `.env.test`.
    - Set variables for the testing environment.

3. **Live Environment**:

    - Copy `.env.template` to `.env.live`.
    - Fill in variables for the live environment.

These files are crucial for configuring the project in different environments.

## Getting Started

-   Run `npm start` to run in a development enviroment
-   Run `npm test` to run the unit tests
-   Run `npm run live` to run the live enviroment.
