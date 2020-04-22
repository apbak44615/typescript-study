import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  execQuestion(value: string) {
    element.all(by.css('app-root option')).then(items => {
      items.find(async item => {await item.getAttribute('value') === value}).click();
    });
    element(by.css('app-root button')).click();
  }

  getConsoleText() {
    return element(by.css('app-test-console')).getText();
  }
}
