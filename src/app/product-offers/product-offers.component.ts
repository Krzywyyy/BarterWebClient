import {Component, OnInit, TemplateRef} from '@angular/core';
import {Offer} from '../model/domain/offer';
import {OfferService} from '../services/api/offer.service';
import {MatDialog} from '@angular/material';
import {ProductOffersService} from '../services/componentDataSharing/product-offers.service';

@Component({
  selector: 'app-product-offers',
  templateUrl: './product-offers.component.html',
  styleUrls: ['./product-offers.component.css']
})
export class ProductOffersComponent implements OnInit {

  offers: Array<Offer>;
  productId: number;
  accepted: boolean;
  infoMessage: string;

  constructor(private offerService: OfferService,
              private dialog: MatDialog,
              private productOffersService: ProductOffersService) {
  }

  ngOnInit() {
    this.productOffersService.currentProductId.subscribe(productId => {
      if (productId > 0) {
        this.productId = productId;
        this.offerService.findAllByProduct(this.productId).subscribe(
          data => this.offers = data
        );
      }
    });
  }

  showConfirmationDialog(template: TemplateRef<any>, accepted: boolean) {
    this.accepted = accepted;
    this.dialog.open(template);
  }

  alreadyConsidered(offer: Offer): boolean {
    return offer.confirmDate !== null;
  }

  getOfferStatus(offer: Offer): string {
    if (this.offerAccepted(offer)) {
      return 'Zaakceptowana';
    } else {
      return 'Odrzucona';
    }
  }

  offerAccepted(offer: Offer): boolean {
    return offer.confirmDate === new Date();
  }

  consider(offerId: number, template: TemplateRef<any>) {
    this.offerService.consider(offerId, this.accepted).subscribe(
      () => this.showCosideredInfo(true, template),
      () => this.showCosideredInfo(false, template)
    );
  }

  showCosideredInfo(succeeded: boolean, template: TemplateRef<any>) {
    this.dialog.closeAll();
    this.setInfoMessage(succeeded);

    this.dialog.open(template);
  }

  private setInfoMessage(succeeded: boolean) {
    if (this.accepted && succeeded) {
      this.infoMessage = 'Zaakceptowałeś ofertę';
    }
    if (this.accepted && !succeeded) {
      this.infoMessage = 'Wystąpił nieoczekiwany błąd i nie udało się zaakceptować oferty';
    }
    if (!this.accepted && succeeded) {
      this.infoMessage = 'Odrzuciłeś ofertę';
    }
    if (!this.accepted && !succeeded) {
      this.infoMessage = 'Wystąpił nieoczekiwany błąd i nie udało się odrzucić oferty';
    }
  }
}
