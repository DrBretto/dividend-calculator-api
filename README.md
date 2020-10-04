## **_Dividend Calculator API documentation_**

This API is the backend for the [Dividend Calculator App](https://github.com/DrBretto/dividend-calculator-app)

Client: Live - https://dividend-calculator-app.vercel.app/
Github - https://github.com/DrBretto/dividend-calculator-app

Api: Live - https://dashboard.heroku.com/apps/agile-peak-39361
Github - https://github.com/DrBretto/dividend-calculator-api

## _API Endpoints_

\* - Requires Authentication

- _`/api/auth`_

  - POST `/login` Verifies passed login credentials. Returns JWT object if successful login.

- _`/api/users`_

  - POST `/` Register new user after verifying passed user data. Returns new user id and user data if successful.
  - GET `/:user_id` Returns username of requested user_id. Returns string.

- _`/api/strategy`_

  - \*GET `/` Returns list of all strategies for user. Returns array of objects.
  - \*POST `/` Adds new strategy to db. Returns 201 and strategy object on success.
  - \*GET `/:id` Returns strategy with matching ID.
  - \*DELETE `/:id` Deletes strategy with matching ID and all related stocks. Returns empty object.

- _`/api/stock`_

  - \*GET `/` Returns list of all stocks for user. Returns array of objects.
  - \*POST `/` Adds new stock to db. Returns stock.
  - \*GET `/:id` Returns stock with matching ID.
  - \*DELETE `/:id` Deletes stock with matching ID. Returns empty object.

- _`/api`_
  - GET `/` Returns 'Hello, world!'

## _Technologies Used_

- Node.js
- bcryptjs
- cors
- dotenv
- express
- helmet
- jsonwebtoken
- knex
- morgan
- pg
- postgrator-cli
- xss
- PostgreSQL
