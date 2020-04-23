import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  async execQuestion(value: string) {
    await element.all(by.css('app-root option')).filter(async function(el, index) {
      return el.getAttribute('value').then(function(str) {
        return str === value;
      });
    }).first().click();
    await element(by.css('app-root button')).click();
  }

 async getConsoleText(): Promise<string> {
    return element(by.css('app-test-console')).getText();
  }
}
