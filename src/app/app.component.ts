import { ChangeDetectorRef, Component, OnDestroy , NgZone} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Premium Calculator';
  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 960px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  navigateToCalculatePremium() {
    this.ngZone.run(() => this.router.navigate(['/']));
  }

  navigateToViewHistory() {
    this.ngZone.run(() => this.router.navigate(['/view-history']));
  }
}
