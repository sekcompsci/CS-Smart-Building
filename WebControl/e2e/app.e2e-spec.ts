import { WebControlPage } from './app.po';

describe('web-control App', () => {
  let page: WebControlPage;

  beforeEach(() => {
    page = new WebControlPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
