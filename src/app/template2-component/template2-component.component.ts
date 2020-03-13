import { PDFAPIService } from './../service/pdf-api.service';
import { DomSanitizer } from '@angular/platform-browser';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

interface Kontaktdaten {
  name: string;
  phone: string;
  address: string;
}


@Component({
  selector: 'app-template2-component',
  templateUrl: './template2-component.component.html',
  styleUrls: ['./template2-component.component.scss']
})
export class Template2ComponentComponent implements OnInit {

  name = 'response.pdf';
  fileUrl;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  downloadOkay = false;
  aushangForm: FormGroup;


  /**
   * Init hook. Also workaround for faConfig Bug
   * @param fb FormBilder
   * @param pdfApiService pdfApiService
   * @param sanitizer
   */
  constructor(fb: FormBuilder, private pdfApiService: PDFAPIService, private sanitizer: DomSanitizer) {
    this.aushangForm = fb.group({
      intro: [''],
      wirhelfen: [''],
      kontakt: [''],
      paragraph2: [''],
      ihrName: [''],
      address: [''],
    });
  }

  /**
   * Generiere eine PDF
   */
  generate() {
    // tslint:disable-next-line: max-line-length
    this.getPDF(this.aushangForm.get('intro').value, this.aushangForm.get('wirhelfen').value, this.aushangForm.get('paragraph2').value, this.aushangForm.get('ihrName').value, this.aushangForm.get('phone').value, this.aushangForm.get('address').value);
  }

  ngOnInit() {

  }

  /**
   * Generate and serve download for pdf with following parameters
   * @param intro Einleitung
   * @param wirhelfen Was ich übernehmen kann:
   * @param paragraph2 Wie man mich erreichen kann (Adresse und Co)
   * @param ihrName Name
   * @param phone Name
   * @param address Name
   */
  async getPDF(intro: string, wirhelfen: string, paragraph2: string, ihrName: string, phone: string, address: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
      template: {
        "type": "pdf",
        "documents": [
          {
            "width": 2480,
            "height": 3508,
            "type": "html",
            "src": "data/templates/corona2/doc.html",
            "alias": "Document"
          }
        ],
        "fonts": [],
        "fields": []
      },
      doc: 0,
      data: {
        "intro": `
          Liebe Nachbarschaft,
          <br>
          liebe Hausgemeinschaft,
          <br><br>
          sollten Sie zu einer der durch die derzeitige Pandemie (Coronavirus SARS CoV 2) betroffenen <strong>Risikogruppen</strong> gehören
          (hohes Alter, Immunschwäche oder bestimmte Grunderkrankungen) möchte ich/möchten wir Sie <u>unterstützen gesund zu bleiben.</u>
          <strong>Gemeinsam schaffen wir das!</strong>
        `,
        "box1": {
          "title": "WIR HELFEN MIT:",
          "items": [
            "Einkäufe und Besorgungen erledigen",
            "Mit dem Hund gehen",
            "Internetzugang bereitstellen",
            "... und Weiteres: Sprechen Sie mich gerne an"
          ]
        },
        "box2": {
          "title": "KONTAKT:",
          "items": [
            "Mein Name: Maurice Conrad",
            "Telefonnummer: +49 176 74932702",
            "Ich wohne im 2. Stock"
          ]
        },
        "paragraph1": `<strong>Rufen Sie an</strong> oder hinterlassen Sie einen <strong>Zettel im Briefkasten.</strong>`,
        "paragraph2": "Wir freuen uns, helfen zu können!<br>LG Maurice Conrad"
      },
      renderings: 1,
      delay: 250
    }

    const requestOptions: RequestInit = {
      method: 'post',
      // tslint:disable-next-line: object-literal-shorthand
      headers: headers,
      body: JSON.stringify(body),
      redirect: 'follow'
    };

    const response = await fetch('https://gegen-den-virus.de:8080/emulate/pdf', requestOptions)
      .then(response => response.blob()).then(blob => this.saveAsBlob(blob))
      .catch(error => console.log('error', error));
  }

  async saveAsBlob(response: Blob) {
    const blob = new Blob([response], { type: 'application/pdf' });
    saveAs(blob, 'download.pdf');
  }
}

