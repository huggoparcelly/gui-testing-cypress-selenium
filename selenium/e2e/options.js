const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('options', () => {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async () => {
    await driver.quit();
  });

  beforeEach(async () => {
    driver.manage().deleteAllCookies();
    await driver.get('http://localhost:9990/admin');
    // await driver.get('http://150.165.75.99:9990/admin');
    await driver.findElement(By.id('_username')).sendKeys('sylius');
    await driver.findElement(By.id('_password')).sendKeys('sylius');
    await driver.findElement(By.css('.primary')).click();
    // await driver.sleep(1000);
});

  // CT - Editar tamanho de um produto
  it('edit size XL to GG in Portuguese (Portugal)', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Type in value input to search for specify option
    await driver.findElement(By.id('criteria_search_value')).sendKeys('jeans_size');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in edit of the remain option
    const buttons = await driver.findElements(By.css('*[class^="ui labeled icon button "]'));
    await buttons[1].click();

    // Edit options values for XL size to GG
    const inputName = await driver.findElement(By.id('sylius_product_option_values_3_translations_pt_PT_value'));
    inputName.click();
    inputName.clear();
    inputName.sendKeys('GG');

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that option has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product option has been successfully updated.'));
  });

  // CT - Editar e salvar com campos vazios
  it('edit click add value and save with empty fields', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Type in value input to search for specify option
    await driver.findElement(By.id('criteria_search_value')).sendKeys('jeans_size');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    
    // Click in edit of the remain option
    await driver.findElement(By.linkText("Edit")).click();
  
    // Click on Add value button
    await driver.findElement(By.linkText("Add value")).click();

    // Click on Save changes button
    await driver.findElement(By.id('sylius_save_changes_button')).click();

    // Assert that option has been updated
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
    assert(bodyText.includes('Please enter option value code.'));
    assert(bodyText.includes('Please enter option value.'));

  });

  // CT - Cria novo produto 
  it('create new product and save', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Click at Create button
    await driver.findElement(By.linkText('Create')).click();

    // Insert code of product
    await driver.findElement(By.id('sylius_product_option_code')).sendKeys('new_product');

    // name New Product Test - En
    await driver.findElement(By.id('sylius_product_option_translations_en_US_name')).sendKeys('New Product for Test');

    // name Novo Produto Teste - Pt
    await driver.findElement(By.css('[data-locale="pt_PT"]')).click();
    await driver.findElement(By.id('sylius_product_option_translations_pt_PT_name')).sendKeys('Novo Produto Para Test');

    // Set values XL and GG
    await driver.findElement(By.linkText('Add value')).click();
    await driver.findElement(By.id('sylius_product_option_values_0_code')).sendKeys('new_product');
    await driver.findElement(By.id('sylius_product_option_values_0_translations_en_US_value')).sendKeys('XL');
    await driver.findElement(By.id('sylius_product_option_values_0_translations_pt_PT_value')).sendKeys('GG');

    // Click on create in new product page
    await driver.findElement(By.css('.primary')).click();
    
    // Assert message 'Product option has been successfully created.'
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product option has been successfully created.'));

    // Back to the options page
    await driver.findElement(By.linkText('Options')).click();

    // Type new_product in value input to search
    await driver.findElement(By.id('criteria_search_value')).sendKeys('new_product');

    // Click on filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    
    // Click on delete button to clean the create object
    await driver.findElement(By.css('form:nth-child(2) > .ui')).click();
    await driver.findElement(By.id('confirmation-button')).click();

  });
  
  // CT - Create new product with empty fields
  it('create new product with empty fields', async () => {
    // Click on create in options page
    await driver.findElement(By.linkText('Options')).click();

    await driver.findElement(By.linkText('Create')).click();

    // Click on create in new product page
    await driver.findElement(By.css('.primary')).click();
    
    // Assert throw error 'This form contains errors.'
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('This form contains errors.'));
  });

  // CT - Create new product without saving it, click on cancel button
  it('create new product without saving it, click on cancel button', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Click at Create button
    await driver.findElement(By.linkText('Create')).click();

    // Insert code of product
    await driver.findElement(By.id('sylius_product_option_code')).sendKeys('product_new');

    // name New Product Test - En
    await driver.findElement(By.id('sylius_product_option_translations_en_US_name')).sendKeys('Test Product');

    // name Novo Produto Teste - Pt
    await driver.findElement(By.css('[data-locale="pt_PT"]')).click();
    await driver.findElement(By.id('sylius_product_option_translations_pt_PT_name')).sendKeys('Produto Test');

    // Set values L and G
    await driver.findElement(By.linkText('Add value')).click();
    await driver.findElement(By.id('sylius_product_option_values_0_code')).sendKeys('new_product');
    await driver.findElement(By.id('sylius_product_option_values_0_translations_en_US_value')).sendKeys('L');
    await driver.findElement(By.id('sylius_product_option_values_0_translations_pt_PT_value')).sendKeys('G');

    await driver.findElement(By.linkText('Cancel')).click();

  });

  // CT - Filter products - valid entry
  it('filter products - valid entry', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Type in value input to search for specify option
    await driver.findElement(By.id('criteria_search_value')).sendKeys('Dress height');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Assert that has a product Dress height in list of products
    const text = await driver.findElement(By.xpath("//td[contains(.,'dress_height')]")).getText();
    assert(text.includes('dress_height'));

  });

  // CT - Filter products - invalid entry
  it('filter products - invalid entry', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Type in value input to search for specify option
    await driver.findElement(By.id('criteria_search_value')).sendKeys('product nonexistent');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Assert that has a product Dress height in list of products
    const text = await driver.findElement(By.xpath("//p[contains(.,'There are no results to display')]")).getText();
    assert(text.includes('There are no results to display'));
  });

  // CT - Clean the filters with a filter applied
  it('clean the filters with a filter applied', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Type in value input to search for specify option
    await driver.findElement(By.id('criteria_search_value')).sendKeys('product nonexistent');

    // Click in filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

    // Click in clear filter button
    await driver.findElement(By.linkText('Clear filters')).click();

    // Assert that has a product Dress height in list of products
    const table = await driver.findElement(By.css(".sylius-grid-wrapper"));
 
  });

  // CT - Delete product by delete button actions
  it('delete product by delete button actions', async () => {
    // Click in options in side menu
    await driver.findElement(By.linkText('Options')).click();

    // Click at Create button
    await driver.findElement(By.linkText('Create')).click();

    // Insert code of product
    await driver.findElement(By.id('sylius_product_option_code')).sendKeys('product_delete');

    // name New Product Test - En
    await driver.findElement(By.id('sylius_product_option_translations_en_US_name')).sendKeys('New Product for Test');

    // name Novo Produto Teste - Pt
    await driver.findElement(By.css('[data-locale="pt_PT"]')).click();
    await driver.findElement(By.id('sylius_product_option_translations_pt_PT_name')).sendKeys('Novo Produto Para Test');

    // Set values XL and GG
    await driver.findElement(By.linkText('Add value')).click();
    await driver.findElement(By.id('sylius_product_option_values_0_code')).sendKeys('product_delete');
    await driver.findElement(By.id('sylius_product_option_values_0_translations_en_US_value')).sendKeys('XL');
    await driver.findElement(By.id('sylius_product_option_values_0_translations_pt_PT_value')).sendKeys('GG');

    // Click on create in new product page
    await driver.findElement(By.css('.primary')).click();
    
    // Assert message 'Product option has been successfully created.'
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    assert(bodyText.includes('Product option has been successfully created.'));

    // Back to the options page
    await driver.findElement(By.linkText('Options')).click();

    // Type new_product in value input to search
    await driver.findElement(By.id('criteria_search_value')).sendKeys('product_delete');

    // Click on filter blue button
    await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();
    
    // Click on delete button to clean the create object
    await driver.findElement(By.css('form:nth-child(2) > .ui')).click();
    await driver.findElement(By.id('confirmation-button')).click();


  });

  // CT - Delete product by selecting the checkbox and delete button 
  it('delete product by selecting the checkbox and delete button', async () => {
   // Click in options in side menu
   await driver.findElement(By.linkText('Options')).click();

   // Click at Create button
   await driver.findElement(By.linkText('Create')).click();

   // Insert code of product
   await driver.findElement(By.id('sylius_product_option_code')).sendKeys('product');

   // name New Product Test - En
   await driver.findElement(By.id('sylius_product_option_translations_en_US_name')).sendKeys('New Product for Test');

   // name Novo Produto Teste - Pt
   await driver.findElement(By.css('[data-locale="pt_PT"]')).click();
   await driver.findElement(By.id('sylius_product_option_translations_pt_PT_name')).sendKeys('Novo Produto Para Test');

   // Set values XL and GG
   await driver.findElement(By.linkText('Add value')).click();
   await driver.findElement(By.id('sylius_product_option_values_0_code')).sendKeys('product');
   await driver.findElement(By.id('sylius_product_option_values_0_translations_en_US_value')).sendKeys('XL');
   await driver.findElement(By.id('sylius_product_option_values_0_translations_pt_PT_value')).sendKeys('GG');

   // Click on create in new product page
   await driver.findElement(By.css('.primary')).click();
   
   // Assert message 'Product option has been successfully created.'
   const bodyText = await driver.findElement(By.tagName('body')).getText();
   assert(bodyText.includes('Product option has been successfully created.'));

   // Back to the options page
   await driver.findElement(By.linkText('Options')).click();

   // Type new_product in value input to search
   await driver.findElement(By.id('criteria_search_value')).sendKeys('product');

   // Click on filter blue button
   await driver.findElement(By.css('*[class^="ui blue labeled icon button"]')).click();

   // Check box of the product
   await driver.findElement(By.css(".item:nth-child(1) .bulk-select-checkbox")).click();

   // Click at the Delete button above
   await driver.findElement(By.css("form:nth-child(1) > .red")).click();

  // Select confirmation button
  await driver.findElement(By.id("confirmation-button")).click();

  const text = await driver.findElement(By.css("p:nth-child(2)")).getText();
  assert(text.includes('Product_options have been successfully deleted.'));
  });
});
