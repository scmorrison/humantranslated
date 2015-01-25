HumanTranslated
===============

Japanese Content and Language Integrated Learning (CLIL) system.

Requirements
------------

* node.js
* npm
* bower
* mongodb
* mecab

Getting started
---------------

This is very basic at the moment. Currently it is a simple REST API with flimsy Oauth2 integration. 

To get started follow the steps below to install the npm modules and import the dummy data. To access the data from the browser open

1. Clone the repo:
------------------

```bash
git clone git@github.com:scmorrison/humantranslated.git
```

2. Install node modules:
------------------------
```bash
cd humantranslated
npm i
```

3. Install MeCab
----------------
```bash
sudo apt-get install mecab
````

**Note:** On Debian you might have to create a symlink for libmecab.so:

```bash
sudo ln -s /usr/lib/libmecab.so.2 /usr/lib/libmecab.so
```

5. Load dummy data (from a separate shell)
------------------------------------------
```bash
# This needs to be reworked to match new structure.
# npm run dummy
```

HTTP Methods
------------

TODO
----

* Build out task runner scripts for npm.
* API endpoints overhall.
* Implement Oauth2 examples.
* Implement Oauth2 signup / login for third-party Oauth2 providers (Facebook, Google, etc.).
* Implement a JS coding standard (possibly npm's).

License
-------

GPLv2

Author Information
------------------

Sam Morrison [@scmorrison](https://github.com/scmorrison)

Kevin O'Neil [@oneilkevin](https://github.com/oneilkevin)

Shinsuke Miyamoto [@jonasuke](https://github.com/jonasuke)
