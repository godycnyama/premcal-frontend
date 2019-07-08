import { Component,Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title: any;
  message: any;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,@Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.message = data.message;
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
