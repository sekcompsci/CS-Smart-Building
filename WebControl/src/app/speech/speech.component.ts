import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from '../shared/speech.service';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent implements OnInit, OnDestroy {
  showSearchButton: boolean;
  speechData: string;

  constructor(private speechRecognitionService: SpeechService) {
    this.showSearchButton = true;
    this.speechData = "";
  }

  ngOnInit() {
    console.log("hello")
  }

  ngOnDestroy() {
    this.speechRecognitionService.DestroySpeechObject();
  }

  activateSpeechSearchMovie(): void {
    this.showSearchButton = false;

    this.speechRecognitionService.record()
      .subscribe(
      //listener
      (value) => {
        this.speechData = value;
        console.log(value);
      },
      //errror
      (err) => {
        console.log(err);
        if (err.error == "no-speech") {
          console.log("--restatring service--");
          this.activateSpeechSearchMovie();
        }
      },
      //completion
      () => {
        this.showSearchButton = true;
        console.log("--complete--");
        this.activateSpeechSearchMovie();
      });
  }
}
