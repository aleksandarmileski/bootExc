import { RefVarPage } from './app.po';

describe('ref-var App', () => {
  let page: RefVarPage;

  beforeEach(() => {
    page = new RefVarPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
