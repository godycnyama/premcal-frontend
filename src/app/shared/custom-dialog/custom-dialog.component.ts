import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-custom-dialog',
  templateUrl: './custom-dialog.component.html',
  styleUrls: ['./custom-dialog.component.css']
})
export class CustomDialogComponent implements OnInit {
  title: any;
  message: any;
  acceptButton: any;
  constructor(public dialogRef: MatDialogRef<CustomDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.message = data.message;
    this.acceptButton = data.acceptButton;
   }

  ngOnInit() {
  }

  cancel(){
    this.dialogRef.close(false);
  }

  accept(){
    this.dialogRef.close(true);
  }


}
