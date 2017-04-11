import { Injectable } from '@angular/core';
// import { SpeechAPI } from '@google-cloud/speech';

@Injectable()
export class SpeechService {

    // constructor() {
    //   const projectId = '545759848185';

    //   // Instantiates a client
    //   const speechClient = SpeechAPI({
    //     projectId: projectId
    //   });

    //   // The name of the audio file to transcribe
    //   const fileName = './resources/audio.raw';

    //   // The audio file's encoding and sample rate
    //   const options = {
    //     encoding: 'LINEAR16',
    //     sampleRate: 16000
    //   };

    //   // Detects speech in the audio file
    //   speechClient.recognize(fileName, options)
    //     .then((results) => {
    //       const transcription = results[0];
    //       console.log('Transcription: ${transcription}');
    //     });
    // }

}
