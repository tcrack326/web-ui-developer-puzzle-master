import { $, $$, browser, ExpectedConditions } from 'protractor';
import { expect } from 'chai';

xdescribe('When: I use the reading list feature', () => {
  it('Then: I should see my reading list', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    await readingListToggle.click();

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(
        $('[data-testing="reading-list-container"]'),
        'My Reading List'
      )
    );
  });
});

describe('When: I undo an add/remove to my list feature', () => {
  let searchItems;
  let readingListItems;
  let readingListToggle;
  beforeEach(async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    readingListToggle = await $('[data-testing="toggle-reading-list"]');

    readingListItems = await $$('.reading-list-item');
    searchItems = await $$('[data-testing="book-item"] button');
    searchItems[0].click();
  });
  xit('should show a snackbar after adding to reading list', async () => {
    const snackbarButtons =  await $$('.mat-simple-snackbar-action .mat-button-wrapper');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(snackbarButtons[0], 'Undo')
    );
    snackbarButtons[0].click();
 });
  xit('should show a snackbar with undo action to the reading list', async () => {
     const snackbarButton =  await $$('.mat-simple-snackbar-action .mat-button-wrapper');
     snackbarButton[0].click();
    expect(readingListItems.length).to.equal(0);
  });
  it('should show a snackbar after removing from my reading list', async() => {
    readingListToggle.click();
    const readingListItemButton = await $$('.remove-button');
    await browser.wait(ExpectedConditions.visibilityOf(readingListItemButton[0]));
    readingListItemButton[0].click();
    const snackbarButtons =  await $$('.mat-simple-snackbar-action .mat-button-wrapper');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(snackbarButtons[0], 'Undo')
    );
    snackbarButtons[0].click();
    readingListItems = await $$('.reading-list-item');
    expect(readingListItems.length).to.equal(1);
  });
});
