import { Component } from '@angular/core';
import { Speech } from '@google-cloud/speech';

@Component({
  selector: 'app-speech',
  templateUrl: './speech.component.html',
  styleUrls: ['./speech.component.scss']
})
export class SpeechComponent {

    constructor() {
      var speech = Speech({
        projectId: 'grape-spaceship-123',
        keyFilename: '/path/to/keyfile.json'
      });
    }
}
