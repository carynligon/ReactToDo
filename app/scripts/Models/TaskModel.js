import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Model.extend({
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appKey}/Tasks`,
  idAttribute: '_id',
  defaults: {
    timestamp: new Date()
  }
});
