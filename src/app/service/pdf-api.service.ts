import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PDFAPIService {

  constructor() { }

  async getPDF() {
    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = {
      "template": {
        "type": "pdf",
        "documents": [
          {
            "width": 2480,
            "height": 3508,
            "type": "html",
            "src": "data/templates/corona/doc.html",
            "alias": "Document"
          }
        ],
        "fonts": [],
        "fields": [
          {
            "type": "Line",
            "description": "Name",
            "key": "name",
            "default": "Hallo Welt",
            "properties": {}
          }
        ],
        "doc": 0,
        "data": {
          "intro": "Hallo",
        },
        "renderings": 1,
        "delay": 250
      }
    }
    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body),
      redirect: 'follow'
    };

    fetch("https://gegen-den-virus.de:8080/emulate/pdf", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}


