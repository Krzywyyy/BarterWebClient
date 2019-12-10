import {Component, OnInit, TemplateRef} from '@angular/core';
import {Offer} from '../model/domain/offer';
import {OfferService} from '../services/offer.service';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit {

  private userOffers: Array<Offer>;
  private offerId: number;

  constructor(private offerService: OfferService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.offerService.findAllUserOffers().subscribe(
      data => this.userOffers = data
    );
  }

  showDeleteConfirmation(confirmationDialog: TemplateRef<any>, offerId: number) {
    this.dialog.open(confirmationDialog);
    this.offerId = offerId;
  }

  deleteOffer() {
    this.offerService.delete(this.offerId).subscribe(
      () => {
        this.offerId = undefined;
        this.dialog.closeAll();
        this.ngOnInit();
      }
    );
  }

  clearOfferId() {
    this.offerId = undefined;
  }
}
