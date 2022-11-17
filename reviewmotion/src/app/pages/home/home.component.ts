import { Component, OnInit } from '@angular/core';

import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private LoginSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  onGetStartedClick(){
    
  }

}
