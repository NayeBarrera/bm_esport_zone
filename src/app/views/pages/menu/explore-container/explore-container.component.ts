import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss']
})
export class ExploreContainerComponent {

  @Output() ionInput = new EventEmitter<any>();
}
