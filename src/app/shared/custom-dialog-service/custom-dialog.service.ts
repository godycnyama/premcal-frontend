import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material';
import { TdDialogService } from '@covalent/core/dialogs';
import { CustomDialogComponent } from '../custom-dialog/custom-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class CustomDialogService {

  constructor(private tdDialogService: TdDialogService) { }

  openDialog(title: string, message: string, disableClose: boolean, acceptButton: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.disableClose = disableClose;
    dialogConfig.autoFocus = true;
    dialogConfig.closeOnNavigation = false;
    dialogConfig.data = {
      // tslint:disable-next-line:object-literal-shorthand
      title: title,
      // tslint:disable-next-line:object-literal-shorthand
      message: message,
      // tslint:disable-next-line:object-literal-shorthand
      acceptButton: acceptButton
    };
    this.tdDialogService.open(CustomDialogComponent, dialogConfig);
  }

}
