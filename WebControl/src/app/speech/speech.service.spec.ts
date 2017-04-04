import { TestBed, inject } from '@angular/core/testing';
import { SpeechRecognitionService } from './speech.service';

describe('SpeechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpeechRecognitionService]
    });
  });

  it('should ...', inject([SpeechRecognitionService], (service: SpeechRecognitionService) => {
    expect(service).toBeTruthy();
  }));
});
