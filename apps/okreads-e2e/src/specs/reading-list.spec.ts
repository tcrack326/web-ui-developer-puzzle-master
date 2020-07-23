import { $, $$, browser, ExpectedConditions } from 'protractor';

describe('When: I use the reading list feature', () => {
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

describe('When: I mark a book as finished feature', () => {
  it('should mark a book as completed and show the completion date', async () => {
    await browser.get('/');
    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('tmo-root'), 'okreads')
    );

    const form = await $('form');
    const input = await $('input[type="search"]');
    await input.sendKeys('javascript');
    await form.submit();

    const readingListToggle = await $('[data-testing="toggle-reading-list"]');
    const readingListItems = await $$('.reading-list-item');
    const searchItems = await $$('[data-testing="book-item"] button');

    searchItems[0].click();
    await readingListToggle.click();

    const finishButton = await $('[data-testing="finish-button"]');
    await finishButton.click();

    const finishText = await $('[data-testing="finish-date"]');

    await browser.wait(
      ExpectedConditions.textToBePresentInElement(finishText, 'Finished: ' + new Intl.DateTimeFormat('en-US').format(new Date()))
    );

    await browser.wait(
      ExpectedConditions.textToBePresentInElement($('[data-testing="add-button"]'), 'Finished')
    );
  });
});
