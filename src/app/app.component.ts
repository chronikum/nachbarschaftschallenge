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

  constructor(fb: FormBuilder, private pdfApiService: PDFAPIService, private sanitizer: DomSanitizer) {
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  callIt() {
    this.pdfApiService.getPDF();
    this.saveAsBlob();
  }
  async saveAsBlob() {
    const data = 'asdad ads asd';
    const blob = new Blob([data], { type: 'application/pdf' });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
