import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PDFAPIService {

  name = 'response.pdf';
  fileUrl;

  constructor(private sanitizer: DomSanitizer) { }

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
      .then(response => this.saveAsBlob(response))
      .catch(error => console.log('error', error));
  }

  async saveAsBlob(responseData: Response) {
    const data = 'some text';
    const blob = new Blob([data], { type: 'application/octet-stream' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}


