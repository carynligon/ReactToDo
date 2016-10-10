import Backbone from 'backbone';

import settings from '../settings';

export default Backbone.Collection.extend({
  url: `https://baas.kinvey.com/appdata/${settings.appKey}/Tasks`,
  getTasks: function() {
    console.log('sdfsd');
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd
    }
    if(mm<10) {
        mm='0'+mm
    }
    today = yyyy+'-'+mm+'-'+dd;
    this.fetch({
      "data": {
        "query": JSON.stringify({"due" : today})
      },
      success: (data) => {
        data.models.forEach((model) => {
          this.add(model);
        });
      }
    });
  }
});
