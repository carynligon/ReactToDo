import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Tasks`,
  getTasks: function() {
    this.fetch({
      "data": {
        "query": JSON.stringify({"priority" : 'high', "completed": false})
      },
      success: (data) => {
        data.models.forEach((model) => {
          this.add(model);
        });
      }
    });
  }
});
