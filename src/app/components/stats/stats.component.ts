import { Component, OnInit } from '@angular/core';
import { EventDriverService } from 'src/app/model/event.driver.service';
import { ActionEvent } from 'src/app/model/product.model';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
  count:number=0;
  constructor(private eventDriverService:EventDriverService) { }

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubject.subscribe((actionEvent:ActionEvent) => {
      this.count++;
    });
  }

}
