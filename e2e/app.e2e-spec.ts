import { LansePage } from './app.po';

describe('lanse App', function() {
  let page: LansePage;

  beforeEach(() => {
    page = new LansePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
