import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });

  describe('Q001', () => {
    it('should display hello world', () => {
      page.navigateTo();
      expect(page.getConsoleText()).toEqual('');
      page.execQuestion('Q001');
      expect(page.getConsoleText()).toEqual('"Q001"を開始します。\nHello World.\n"Q001"が終了しました。');
    })
  })
});
