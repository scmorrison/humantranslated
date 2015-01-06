HumanTranslated
===============

Japanese Content and Language Integrated Learning (CLIL) system.

Requirements
------------

* node.js
* npm
* mongodb

Getting started
---------------

This is very basic at the moment. Currently it is a simple REST API with flimsy Oauth2 integration. 

To get started follow the steps below to install the npm modules and import the dummy data. To access the data from the browser open

## 1. Clone the repo:

```bash
git clone git@github.com:scmorrison/humantranslated.git
```

## 2. Install node modules:
```bash
cd humantranslated
npm i
```

## 3. Start server
```bash
npm start
```

## 4. Load dummy data (from a separate shell)
```bash
npm run dummy
```

HTTP Methods
------------

| API Endpoint                 | Method  | Description                      |
|------------------------------|---------|----------------------------------|
| /api/users                   | POST    | Create a new user.               |
| /api/users                   | GET     | Return all users.                |
| /api/stories                 | POST    | Create a new story.              |
| /api/stories                 | GET     | Return all stories.              |
| /api/stories/:story_id       | GET     | Return single story.             |
| /api/stories/:story_id       | PUT     | Modify single story.             |
| /api/stories/:story_id       | DELETE  | Delete single story.             |
| /api/clients                 | POST    | Create an Oauth2 client.         |
| /api/clients                 | GET     | Return all Oauth2 clients.       |
| /api/oauth2/authorize        | GET     | Render authentication dialog.    |
| /api/oauth2/authorize        | POST    | Submit new auth transaction.     |
| /api/oauth2/token            | POST    | Request new authorization token. |

TODO
----

* Build out task runner scripts for npm.
* API endpoints overhall.
* Implement Oauth2 examples.
* Implement Oauth2 signup / login for third-party Oauth2 providers (Facebook, Google, etc.)

License
-------

GPLv2

Author Information
------------------

Sam Morrison [@scmorrison](https://github.com/scmorrison)

Kevin O'Neil [@oneilkevin](https://github.com/oneilkevin)

Shinsuke Miyamoto [@jonasuke](https://github.com/jonasuke)
