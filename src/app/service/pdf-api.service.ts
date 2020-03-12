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

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: headers,
      redirect: 'follow'
    };

    fetch("https://gegen-den-virus.de:8080/emulate/pdf", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
}
