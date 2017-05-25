import { CcAdminPage } from './app.po';

describe('cc-admin App', () => {
  let page: CcAdminPage;

  beforeEach(() => {
    page = new CcAdminPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
