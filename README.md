***Welcome to the Dividend Calculator API***

This API handles the data from server to client for the [Dividend Calculator App](https://github.com/DrBretto/dividend-calculator-app)

## **Authentication**

Used to collect authentication token

- **URL**

  /login

- **Method:**

  `POST`

**AUTH required:**

NO

**Required:**

```javascript
{
"username":"[valid username]",
"password":"[password in plain text]"
}
```

**example**
```javascript
{
"username":"Demo",
"password":"Passw0rd!"
}
```
- **Success Response:**

  - **Code:** 200 <br />
    **Content:** `{ "Token":93144b288eb1fdccbe46d6fc0f241a51766ecd3d" }`

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Incorrect user_name or password" }`

