/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('categories', function () {
  var allCats = _.pluck(Categories.find({}, {fields: {name: 1}}).fetch(), 'name'),
      popCats = _.filter(allCats, function(catId) {
        return Apps.findOne({category: catId});
      });
  return Categories.find({name: {$in: popCats}});
});

Meteor.publish('all categories', function () {
  return Categories.find({});
});

Meteor.publish('apps by genre', function (name) {
  var apps = Genres.findIn(name, {}, {}, this);
  return [
    apps,
    Meteor.users.find({_id: {$in: _.uniq(apps.map(function(app) {
      return app.author;
    }))}})
  ];
});

Meteor.publish('apps by id', function (ids) {
  return Array.isArray(ids) ?
    Apps.find({_id: {$in: ids}}) :
    Apps.find(ids);
});

Meteor.publish('apps by me', function () {
  return Genres.findIn('Apps By Me', {}, {}, this);
});


Meteor.publish('apps all', function() {
  return Apps.find();
});

Meteor.publish('saved app', function() {

  return Meteor.users.find(this.userId, {fields: {savedApp: 1}});

});
