import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class HandlingLoadingService {
  activeRequestNum = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  showLoader() {
    this.activeRequestNum++;
    this.spinnerService.show(undefined, {
      type: 'ball-fall',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333',
    });
  }

  hideLoader() {
    this.activeRequestNum--;
    if (this.activeRequestNum <= 0) {
      this.activeRequestNum = 0;
      this.spinnerService.hide();
    }
  }
}
