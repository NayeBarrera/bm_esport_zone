import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private reloadProductsSubject = new Subject<void>();

  reloadProducts$ = this.reloadProductsSubject.asObservable();

  triggerProductsReload() {
    this.reloadProductsSubject.next();
  }
}
