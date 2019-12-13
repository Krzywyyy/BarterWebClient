import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Filter} from '../../model/domain/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  private filterSource = new BehaviorSubject<Filter>(new Filter());
  currentFilters = this.filterSource.asObservable();

  constructor() {
  }

  changeFilters(filter: Filter) {
    this.filterSource.next(filter);
  }
}
