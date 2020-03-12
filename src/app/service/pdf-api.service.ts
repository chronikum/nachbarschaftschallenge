import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PDFAPIService {

  constructor() { }

  /**
   * Get PDF
   */
  async getPDF() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // tslint:disable: object-literal-key-quotes
    const body = {
      'template': {
        'type': 'pdf',
        'documents': [
          {
            'width': 2480,
            'height': 3508,
            'type': 'html',
            'src': 'data/templates/corona/doc.html',
            'alias': 'Document'
          }
        ],
        'fonts': [],
        'fields': [
          {
            'type': 'Line',
            'description': 'Name',
            'key': 'name',
            'default': 'Hallo Welt',
            'properties': {}
          }
        ],
        'renderings': 1,
        'delay': 250
      },
      'doc': 0,
      'data': {
        'intro': 'Hallo',
        'paragraph1': '',
        'explanation': '',
        'paragraph2': '',
        'name': '',
      },
    }
    const requestOptions: RequestInit = {
      method: 'post',
      // tslint:disable-next-line: object-literal-shorthand
      headers: headers,
      mode: 'cors',
      body: JSON.stringify(body),
      redirect: 'follow'
    };

    const response = await fetch('https://gegen-den-virus.de:8080/emulate/pdf', requestOptions)
      .then(response => response.text())
      .then(result => this.downloadFile(result))
      .catch(error => console.log('error', error));


  }

  /**
   * File should be offered to download here
   */
  downloadFile(data: any) {

  }
}


