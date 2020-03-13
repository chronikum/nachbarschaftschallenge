import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

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
  async getPDF(intro: string, paragraph1: string, paragraph2: string, name: string) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = {
      "template": {
        "type": "pdf",
        "documents": [{
          "width": 2480,
          "height": 3508,
          "type": "html",
          "src": "data/templates/corona/doc.html",
          "alias": "Document"
        }],
        "fonts": [],
        "fields": [{
          "type": "Line",
          "description": "Intro",
          "key": "intro",
          "default": "nicht alle von euch kennen wir: manche flüchtig aus Treppenhausbegegnungen, andere durch kurze Gespräche zwischen Tür und Angel. So nehmen einige von euch öfter unsere Pakete an, sorgen dafür, dass es im Treppenhaus jetzt besser riecht oder ersetzen alte Leuchten durch LEDs. Alles praktische Nachbarschaftshilfe, für die wir sehr dankbar sind und nicht immer im Alltag unseren Dank zum Ausdruck bringen! Vielleicht haben wir uns auch schon mal über einander aufgeregt, weil ihr auf unserem Parkplatz standet oder umgekehrt – Zusammenleben in einem Mietshaus bringt sicher auch das mit sich.",
          "properties": {}
        },
        {
          "type": "Line",
          "description": "Paragraph 1",
          "key": "paragraph1",
          "default": "In dieser aktuell merkwürdigen und dichten Zeit mit einem neuartigen Virus, der auf vielen verschiedenen Ebenen Chaos verursacht, setzen wir auf SOLIDARITÄT und haben uns überlegt, was das für uns praktisch bedeutet:",
          "properties": {}
        },
        {
          "type": "Line",
          "description": "Explanation",
          "key": "explanation",
          "default": "Wir gehören nicht zur Risikogruppe von Corona und sind aktuell nicht erkrankt. Wir bieten deshalb gerne unsere tatkräftige Hilfe und Unterstützung an. Wir könnten z.B.einen Einkauf für euch erledigen, eine Fahrt übernehmen oder euch/Ihnen mit einem technischen Problem helfen, unsere Fahrräder ausleihen, wenn jemand aktuell auf die Öffentlichen verzichten möchte oder haben einfach ein Ohr, wenn ihr etwas Belastendes zu erzählen habt.",
          "properties": {}
        },
        {
          "type": "Line",
          "description": "Paragraph 2",
          "key": "paragraph2",
          "default": "Ich wohne im 3. Stock und arbeite tagsüber. Meistens bin ich ab 16 Uhr zu Hause. Gerne einfach klingen oder mich anrufen: <strong>0176 749 32702</strong>",
          "properties": {}
        },
        {
          "type": "Line",
          "description": "Name",
          "key": "name",
          "default": "Familie Yilmaz",
          "properties": {}
        }
        ]
      },
      "doc": 0,
      "data": {
        "intro": intro,
        "paragraph1": paragraph1,
        "paragraph2": paragraph2,
        "name": name
      },
      "renderings": 1,
      "delay": 250
    };

    const requestOptions: RequestInit = {
      method: 'post',
      // tslint:disable-next-line: object-literal-shorthand
      headers: headers,
      body: JSON.stringify(body),
      redirect: 'follow'
    };
  }


}


