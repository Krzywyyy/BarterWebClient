import {Component, OnInit} from '@angular/core';
import {Offer} from '../model/domain/offer';
import {OfferService} from '../services/offer.service';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrls: ['./user-offers.component.css']
})
export class UserOffersComponent implements OnInit {

  private userOffers: Array<Offer>;

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.offerService.findAllUserOffers().subscribe(
      data => this.userOffers = data
    );
  }

  deleteOffer(offerId: number) {
    this.offerService.delete(offerId).subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
}
