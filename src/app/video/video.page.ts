import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  playVideo(){
    let mainVideo = <HTMLMediaElement>document.getElementById('mainVideo');
    mainVideo.src = "file.mp4";
    mainVideo.play();
 }
}
