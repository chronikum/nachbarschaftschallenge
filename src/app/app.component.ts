import { DomSanitizer } from '@angular/platform-browser';
import { PDFAPIService } from './service/pdf-api.service';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'response.pdf';
  fileUrl;
  faShare = faShareAlt
  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  downloadOkay = false;

  constructor(fb: FormBuilder, private pdfApiService: PDFAPIService, private sanitizer: DomSanitizer) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

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
      .then(response => response.text()).then(text => this.saveAsBlob(text))
      .catch(error => console.log('error', error));

  }

  generate() {
    this.getPDF();
  }

  async saveAsBlob(response: string) {
    const data = response;
    const blob = new Blob([data], { type: 'application/pdf' });
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.downloadOkay = true;
  }
}
