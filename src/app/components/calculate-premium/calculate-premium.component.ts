import { Component, OnInit, HostBinding, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { CustomDialogService } from '../../shared/shared.module';
import { BusyDialogService } from '../../shared/shared.module';
import { CalculationService } from '../../services/calculation-service/calculation.service';
import { slideInLeftAnimation } from '../../shared/animations/animations';

@Component({
  selector: 'app-calculate-premium',
  templateUrl: './calculate-premium.component.html',
  styleUrls: ['./calculate-premium.component.css'],
  animations: [slideInLeftAnimation],
})
export class CalculatePremiumComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  @HostBinding('@routeAnimation') routeAnimation: boolean = true;
  // tslint:disable-next-line:no-inferrable-types
  @HostBinding('class.td-route-animation') classAnimation: boolean = true;
  premiumGroup: FormGroup;
  calculation = {
    memberType: null,
    insuredValue: null,
    fee: null,
    premium: null,
    total: null,
  };
  memberTypeOptions: string[] = ['Main Member', 'Dependent'];
  insuredValueMainMemberOptions: any[] = [10000, 15000, 18000, 20000, 30000];
  insuredValueDependentOptions: any[] = [5000, 12000, 18000, 22000, 25000];




  data = {
    memberName: '',
    memberID: '',
    memberType: '',
    insuredValue: ''
  };
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private fb: FormBuilder,
    private calculationService: CalculationService,
    private customDialogService: CustomDialogService,
    private busyDialogService: BusyDialogService) { }

  ngOnInit() {
    this.premiumGroup = this.fb.group({
      memberName: ['', [Validators.required, Validators.maxLength(150)]],
      memberID: ['', [Validators.required, Validators.maxLength(13)]],
      memberType: ['Main Member', [Validators.required]],
      insuredValueMainMember: [10000],
      insuredValueDependent: [5000],
    });

  }

  calculatePremium(): void {
    if (this.premiumGroup.controls.memberType.value === 'Main Member') {
      this.data.memberName = this.premiumGroup.controls.memberName.value;
      this.data.memberID = this.premiumGroup.controls.memberID.value;
      this.data.memberType = this.premiumGroup.controls.memberType.value;
      this.data.insuredValue = this.premiumGroup.controls.insuredValueMainMember.value;
    }

    if (this.premiumGroup.controls.memberType.value === 'Dependent') {
      this.data.memberName = this.premiumGroup.controls.memberName.value;
      this.data.memberID = this.premiumGroup.controls.memberID.value;
      this.data.memberType = this.premiumGroup.controls.memberType.value;
      this.data.insuredValue = this.premiumGroup.controls.insuredValueDependent.value;
    }
    const dialog = this.busyDialogService.open();
    this.calculationService.calculatePremium(this.data).subscribe((response: any) => {
    dialog.close(true);
    this.calculation = response;
    // tslint:disable-next-line:max-line-length
    const message = `Member Type: ${response.memberType} | Insured Value: R${response.insuredValue} | Fee: R${response.fee} | Premium: R${response.premium} | Total: R${response.total}`;
    this.customDialogService.openDialog('Success', message, true, 'Ok');
     }, (response: any ) => {
      dialog.close(true);
      this.customDialogService.openDialog('Error', response.error.message, true, 'Ok');
     });
  }

  navigateToViewHistory() {
    this.ngZone.run(() => this.router.navigate(['/view-history']));
  }

}
