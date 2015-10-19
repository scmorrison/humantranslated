/**
 * We declare the collection just like meteor default way
 * but changing Meteor.Collection to orion.collection.
 *
 * We can set options to that new collection, like which fields
 * we will show in the index of the collection in the admin
 */
Stories = new orion.collection('stories', {
  singularName: orion.helpers.getTranslation('stories.singularName'), // The name of one of this items
  pluralName: orion.helpers.getTranslation('stories.pluralName'), // The name of more than one of this items
  title: orion.helpers.getTranslation('stories.title'), // The title of the page
  link: {
    /**
     * The text that you want to show in the sidebar.
     * The default value is the name of the collection, so
     * in this case is not necesary
     */
    title: orion.helpers.getTranslation('stories.title')
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    columns: [
      { data: 'title', title: orion.helpers.getTranslation('stories.schema.title') },
      /**
       * If you want to show a custom orion attribute in
       * the index table you must call this function
       * orion.attributeColumn(attributeType, key, label)
       */
      orion.attributeColumn('image', 'image', orion.helpers.getTranslation('stories.schema.image')),
      orion.attributeColumn('summernote', 'body', orion.helpers.getTranslation('stories.schema.body')),
      orion.attributeColumn('createdBy', 'createdBy', orion.helpers.getTranslation('stories.schema.createdBy')),
      orion.attributeColumn('createdAt', 'createdAt', orion.helpers.getTranslation('stories.schema.createdAt'))
    ]
  }
});

/**
 * Now we will attach the schema for that collection.
 * Orion will automatically create the corresponding form.
 */
Stories.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: orion.helpers.getTranslation('stories.schema.title') // We use this function to make i18n work in autoform
  },
  /**
   * The image attribute is a custom orion attribute
   * This is where orion do the magic. Just set
   * the attribute type and it will automatically
   * create the form for the image.
   * WARNING: the url of the image will not be saved in
   * .image, it will be saved in .image.url.
   */
  image: orion.attribute('image', {
      label: orion.helpers.getTranslation('stories.schema.image'), // We use this function to make i18n work in autoform
      optional: true
  }),
  /**
   * Here its the same with image attribute.
   * summernote is a html editor.
   */
  body: orion.attribute('summernote', {
      label: orion.helpers.getTranslation('stories.schema.body') // We use this function to make i18n work in autoform
  }),
  /**
   * This attribute sets the user id of the user that created
   * this story automatically.
   */
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));


/**
 * Using dburles:collection-helpers we will add a helper to the stories
 * collection to easily get the user
 */

Stories.helpers({
  getCreator: function () {
    return Meteor.users.findOne({ _id: this.createdBy });
  }
});
