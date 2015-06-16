HumanTranslated CLI client
==========================

The CLI client is the first client to test and integrate new API features. 

# Usage

```bash
#
# Account / registration
#

# oauth2 configuration
humantranslated config

# register for a new account
humantranslated register

#
# Stories
#

# list stories
humantranslated story list

# display story
humantranslated story view STORYID

# add story
humantranslated story new STORY.json

# modify story
humantranslated story modify STORY.json

# delete story
humantranslated story delete STORYID

#
# Categories
# 

# list categories
humantranslated category list

# display category
humantranslated category view CATEGORYNAME

# add category
humantranslated category new CATEGORYNAME.json

# modify category
humantranslated category modify CATEGORYNAME.json

# delete category
humantranslated category delete CATEGORYNAME
```
