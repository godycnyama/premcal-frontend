import { Injectable } from '@angular/core';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatDialogConfig } from '@angular/material';
import { BusyDialogComponent } from '../busy-dialog/busy-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BusyDialogService {

  constructor(private dialogService: TdDialogService) { }

  open() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '200px';
    dialogConfig.disableClose = true;
    dialogConfig.closeOnNavigation = false;
    const dialog = this.dialogService.open(BusyDialogComponent, dialogConfig);
    return dialog;
  }

}
