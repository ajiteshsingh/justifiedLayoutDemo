import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as justifiedLayout from './justified-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'JustifiedLayoutDemo';

  images: Array<any> = [];
  dummyDataUrl = 'https://s3.ap-south-1.amazonaws.com/js-fiddle-data/document.json';
  geometry: Array<any> = [];

  ngOnInit() {

  }

  ngAfterViewInit() {
    const header = new Headers({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    });
    let sentData = {
      method: 'GET',
      mode: 'cors',
      header: header,
    };
    fetch(this.dummyDataUrl)
      .then((res) => {
        return res.json()
      }).then((data) => {
        this.images = data['images'];
        this.createNewGeometry();
      });
  }

  createNewGeometry() {

    for (let i = 0; i < this.images.length; i++) {
      this.geometry.push(this.images[i].width / this.images[i].height);
    }
    const containerWidth = document.getElementById('gallery-container').clientWidth;
    const config = {
      'containerWidth' : containerWidth,
      'targetRowHeight': 120
    };
    const geometry = justifiedLayout(this.geometry, config);
    const boxes = geometry['boxes'];
    for (let i = 0; i <  this.geometry.length; i++) {
      this.images[i]['boxConfig'] = boxes[i];
    }
  }
}
