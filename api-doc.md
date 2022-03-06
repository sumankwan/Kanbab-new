<h1>Register User</h1>

**URL**

`/register` 

**Method**

`POST`

**Data Params**

```json
    {
        "email": "abc@mail.com",
        "password": "123456"
    }
```

**Success Response:**

**Code:** 201
**Content:**

```json
{
    "user": {
        "id": "1",
        "email": "abc@mail.com",
        "password": "$2a$10$eP6kWJFrxXjg8cpXnv/toesDnONmRXkX.4MCEaH.YeHxWB928e5D2",
        "organization": "Hacktiv8",
        "updatedAt": "2020-08-04T15:06:48.658Z",
        "createdAt": "2020-08-04T15:06:48.658Z"
    }
}
```

**Error Response**

**Code:** 400
**Content:**
`
{
    "errors": [
        "email must be unique"
    ]
}
`

OR

**Code:** 400
**Content:**
`
{
    "errors": [
        "invalid email format"
    ]
}
`

OR

**Code:** 500

************

<h1>Login User</h1>

**URL**

`/login` 

**Method**

`POST`

**Data Params**

```json
    {
        "email": "abc@mail.com",
        "password": "123456"
    }
```

**Success Response:**

**Code:** 200
**Content:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ0BnbWFpbC5jb20iLCJpYXQiOjE1OTY1NTM3Njh9.Xj_Ow4Rel67mldzhNuf-h0iNoo_-37LExdUPGAcL0UU"
}
```

**Error Response**

**Code:** 400
**Content:**
`
{
    "errors": [
        "invalid email or password"
    ]
}
`

OR

**Code:** 500

************

<h1>Create Task</h1>

**URL**

`/` 

**Method**

`POST`

**Headers Request**

`token=[string]`

**Data Params**

```json
    {
        "title": "3rd party API",
        "category": "backlog"
    }
```

**Success Response:**

**Code:** 201
**Content:**

```json
    {
        "task": {
            "id": 1,
            "title": "3rd party API",
            "category": "backlog",
            "UserId": 1,
            "updatedAt": "2020-08-03T13:43:51.462Z",
            "createdAt": "2020-08-03T13:43:51.462Z"
        }
    }
```

**Error Response**

**Code:** 401
**Content:**
`
{
    "errors": [
        "authentication failed"
    ]
}
`

OR

**Code:** 401
**Content:**
`
{
    "errors": [
        "you are not authorized to do this"
    ]
}
`

OR

**Code:** 400
**Content:**
`
{
    "errors": [
        "title cannot be empty"
    ]
}
`

OR

**Code:** 400
**Content:**
`
{
    "errors": [
        "category cannot be empty"
    ]
}
`

OR

**Code:** 500

*************

<h1>Show Tasks</h1>

**URL**

`/tasks` 

**Method**

`GET`

**Success Response:**

**Code:** 201
**Content:**

```json
    {
    "task": [
        {
            "id": 1,
            "title": "3rd party API",
            "category": "production",
            "UserId": 1,
            "updatedAt": "2020-08-03T13:43:51.462Z",
            "createdAt": "2020-08-03T13:43:51.462Z"
        },
        {
            "id": 1,
            "title": "fixing bug",
            "category": "backlog",
            "UserId": 1,
            "updatedAt": "2020-08-03T13:43:51.462Z",
            "createdAt": "2020-08-03T13:43:51.462Z"
        }
    ]
}
```

**Error Response**

**Code:** 401
**Content:**
`
{
    "errors": [
        "authentication failed"
    ]
}
`

OR

**Code:** 500

*************

<h1>Update Task</h1>

**URL**

`/tasks/update/:id` 

**Method**

`PUT`

**URL Params**
**Required:**

`id=[integer]`

**Headers Request**

`token=[string]`

**Data Params**

```json
    {
        "title": "3rd party API",
        "category": "production"
    }
```

**Success Response:**

**Code:** 201
**Content:**

```json
    {
        "task": {
            "id": 1,
            "title": "3rd party API",
            "category": "production",
            "updatedAt": "2020-08-03T13:43:51.462Z",
            "createdAt": "2020-08-03T13:43:51.462Z"
        }
    }
```

**Error Response**

**Code:** 401
**Content:**
`
{
    "errors": [
        "authentication failed"
    ]
}
`

OR

**Code:** 404
**Content:**
`
{
    "errors": [
        "Task not found"
    ]
}
`

OR

**Code:** 401
**Content:**
`
{
    "errors": [
        "you are not authorized to do this"
    ]
}
`

OR

**Code:** 400
**Content:**
`
{
    "errors": [
        "title cannot be empty"
    ]
}
`

OR

**Code:** 400
**Content:**
`
{
    "errors": [
        "category cannot be empty"
    ]
}
`

OR

**Code:** 500

*************

<h1>Delete Task</h1>

**URL**

`/tasks/delete/:id` 

**Method**

`DELETE`

**URL Params**
**Required:**

`id=[integer]`

**Headers Request**

`token=[string]`

**Success Response:**

**Code:** 201
**Content:**

```json
    {
        "msg": "successfully deleted"
    }
```

**Error Response**

**Code:** 401
**Content:**
`
{
    "errors": [
        "authentication failed"
    ]
}
`

OR

**Code:** 401
**Content:**
`
{
    "errors": [
        "you are not authorized to do this"
    ]
}
`

OR

*Code:** 404
**Content:**
`
{
    "errors": [
        "Task not found"
    ]
}
`

OR

**Code:** 401
**Content:**
`
{
    "errors": [
        "you are not authorized to do this"
    ]
}
`

OR

**Code:** 500

************

<h1>Google Sign-In</h1>

**URL**

`/GoogleSignIn` 

**Method**

`POST`

**Data Params**

```json
    {
        "idToken": "ya30.a0AfH6SMCdIS9P2u2-t-qZYP0fysSQw7DBbk2RzcwXD1HPAGG_Eq-2xLZsXEZXp0xNCsa8yapA7RJLFzrvBbAlaQZHxkz3VaHEUyyvskUmPWLnvWZWTWb_7QGXDGN6C-XF5voy5ak6OfwTx-cnITGOhHNXPAaJr9wZHT3o",
    }
```

**Success Response:**

**Code:** 200
**Content:**

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ3VuZ0BnbWFpbC5jb20iLCJpYXQiOjE1OTY1NTM3Njh9.Xj_Ow4Rel67mldzhNuf-h0iNoo_-37LExdUPGAcL0UU"
}
```

**Error Response**

**Code:** 400
**Content:**
`
{
    "errors": [
        "invalid email or password"
    ]
}
`

OR

**Code:** 500