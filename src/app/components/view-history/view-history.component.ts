import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';
import { TdDialogService } from '@covalent/core/dialogs';
import { MatDialogConfig } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/shared.module';
import { CustomDialogService } from '../../shared/shared.module';
import { BusyDialogService } from '../../shared/shared.module';
import { CalculationService } from '../../services/calculation-service/calculation.service';
import { slideInLeftAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-view-history',
  templateUrl: './view-history.component.html',
  styleUrls: ['./view-history.component.css'],
  animations: [slideInLeftAnimation],
})
export class ViewHistoryComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;

  formGroup: FormGroup;
  calculations: any[] = [];
  query: any;
  columns: ITdDataTableColumn[] = [
    { name: '_id',  label: 'Calculation ID' },
    { name: 'memberName', label: 'Member Name' },
    { name: 'memberID', label: 'Member ID Number' },
    { name: 'memberType', label: 'Member Type' },
  ];

  pageSizeOptions: number[] = [5, 10, 20 ];
  searchByOptions: string[] = ['All', 'Main Member', 'Dependent'];
  currentPage: number;
  total: number;
  searchQuery = {
    searchBy: null,
    perPage: null,
    pageNo: null
  };
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private calculationService: CalculationService,
    private dialogService: TdDialogService,
    private fb: FormBuilder,
    private customDialogService: CustomDialogService,
    private busyDialogService: BusyDialogService) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      searchBy: ['All', [Validators.required]],
      pageSize: [''],
    });
    this.query = this.calculationService.getQuery();
    this.formGroup.patchValue({
      searchBy: this.query.searchBy,
      pageSize: this.query.perPage
    });
    this.currentPage = this.query.pageNo;
    this.calculations = this.calculationService.getItems();
    this.total = this.query.total;
  }



  deleteCalculation(calculation: any): void {
    const calculationID = calculation._id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Confirm',
      message: 'Are you sure you want to delete this calculation record?'
    };
    this.dialogService.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        const dialog = this.busyDialogService.open();
        this.calculationService.deleteCalculation(calculationID).subscribe((response: any) => {
        dialog.close(true);
        this.calculationService.deleteItemFromArray(calculation);
        this.calculations = this.calculationService.getItems();
        this.customDialogService.openDialog('Success', response.message, true, 'Ok');
         }, (response: any ) => {
          dialog.close(true);
          this.customDialogService.openDialog('Error', response.error.message, true, 'Ok');
         });
      } else {
          return;
      }
    });
  }

  search(): void {
    this.searchQuery.searchBy = this.formGroup.controls.searchBy.value;
    this.searchQuery.perPage = this.formGroup.controls.pageSize.value;
    this.searchQuery.pageNo = this.currentPage;
    const dialog = this.busyDialogService.open();
    this.calculationService.getCalculationsBy(this.searchQuery).subscribe((response: any) => {
      dialog.close(true);
      if (response.total === 0) {
        this.customDialogService.openDialog('Search', 'No calculations found matching your search criteria', true, 'Ok');
        return;
      }
      this.calculations = response.data;
      this.total = response.total;
      const data = {
        searchBy: this.formGroup.controls.searchBy.value,
        pageNo: this.currentPage,
        perPage: this.formGroup.controls.pageSize.value,
        total : response.total
      };
      this.calculationService.setQuery(data);
      this.calculationService.setItems(response.data);
    }, (response: any) => {
      dialog.close(true);
      this.customDialogService.openDialog('Error', response.error.message, true, 'Ok');
    });

  }

  page(pagingEvent: IPageChangeEvent): void {
    this.currentPage = pagingEvent.page;
    this.search();
  }

  navigateToCalculatePremium() {
    this.ngZone.run(() => this.router.navigate(['/']));
  }
}
