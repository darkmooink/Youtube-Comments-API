# Youtube-Comments-API


# Project Setup Instructions

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

- Run `npm start` to run in a development enviroment
- Run `npm test` to run the unit tests
- Run `npm run live` to run the live enviroment.
