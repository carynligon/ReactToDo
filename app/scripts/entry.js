import $ from 'jquery';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';

import settings from './settings';
import store from './store';
import router from './router';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url.indexOf('spotify') === -1) {
    if (localStorage.getItem('authtoken')) {
      xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
    } else {
      xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
    }
  }
});

function login(username, password) {
  const promise = new Promise((resolve, reject) => {
    store.session.save({username:username, password:password});
  });
  return promise
}

login('caryn','1234').then(() => {
  console.log('logged in');
})

ReactDOM.render(router, document.getElementById('container'));
