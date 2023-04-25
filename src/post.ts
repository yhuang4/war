import { XMLHttpRequest } from 'xmlhttprequest-ts';

const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:3000/game');
xhr.onload = () => {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  } 
};
xhr.send();