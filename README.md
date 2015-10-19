HumanTranslated
===============

[![Join the chat at https://gitter.im/scmorrison/humantranslated](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/scmorrison/humantranslated?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) [![Build Status](https://travis-ci.org/scmorrison/humantranslated.svg)](https://travis-ci.org/scmorrison/humantranslated)

Content and Language Integrated Learning (CLIL) system.

Requirements
------------

* meteor
* mongodb
* mecab

Getting started
---------------

This is very basic at the moment. Currently it is a simple REST API with flimsy Oauth2 integration. 

To get started follow the steps below to install the npm modules and import the dummy data. To access the data from the browser open

1. Clone the repo:
------------------

```bash
git clone git@github.com:scmorrison/humantranslated-meteor.git
```

2. Install node modules:
------------------------
```bash
cd humantranslated-meteor
meteor
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

Installing Mecab on OSX
------

###Installing Homebrew

The first step is to make sure that you have Homebrew installed. Open the Terminal.app application and copy and paste the following:

    brew -v

If you have not installed Homebrew yet, all you need to do is run the following command:
  
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

###Installing Mecab

Next, let's install Mecab with our new package manager.

    brew install mecab

We must also install another package mecab-ipadic:
    
    brew install mecab-ipadic

##Installing Mecab-ipadic via source

If the steps above do not work, you will have to install Mecab from
source. You can create a directory in your $HOME directory by using the 
mkdir command:

    mkdir src/

Then CD into the folder and use 

    wget https://mecab.googlecode.com/files/mecab-ipadic-2.7.0-20070801.tar.gz

Note: If you don't have wget installed, then you will need to use the following command:

    brew install wget

Use the tar command to decompress the folder:

    tar xzvf  mecab-ipadic-2.7.0-20070801.tar.gz

A new folder will appear. The last step is to cd back into the Humantranslated direcory and
copy the script into your $PATH. 

    cp scripts/mecab-config /usr/bin/local

You should now be able to use the mecab command:

    mecab


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

Sugiyama-san [@sugiyama-v](https://github.com/sugiyama-v)

