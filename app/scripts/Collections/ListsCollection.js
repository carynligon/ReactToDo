import Backbone from 'backbone';

import settings from '../settings';
import List from '../Models/ListModel';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Lists`,
  model: List,
  newList: function(listName) {
    this.create({
      name: listName
    }, {
      success: (data) => {
        console.log(data);
      }
    });
  }
});
