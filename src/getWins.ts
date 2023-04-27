import { XMLHttpRequest } from 'xmlhttprequest-ts';

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost:3000/wins');
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  } else {
    console.log(xhr.statusText);
  }
};
xhr.send();