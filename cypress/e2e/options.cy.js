describe('options', () => {
  beforeEach(() => {
    cy.visit('/admin');
    cy.get('[id="_username"]').type('sylius');
    cy.get('[id="_password"]').type('sylius');
    cy.get('.primary').click();
    // Click in options in side menu
    cy.clickInFirst('a[href="/admin/product-options/"]');
  });

  // Remove .only and implement others test cases!
  it('edit size XL to GG in Portuguese (Portugal)', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('jeans_size');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain option
    cy.get('*[class^="ui labeled icon button "]').last().click();
    // Edit options values for XL size to GG
    cy.get('[id="sylius_product_option_values_3_translations_pt_PT_value"]').scrollIntoView().clear().type('GG');
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').scrollIntoView().click();

    // Assert that option has been updated
    cy.get('body').should('contain', 'Product option has been successfully updated.');
  });

  it('edit click add value and save with empty fields', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('dress_height');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in edit of the remain option
    cy.get('*[class^="ui labeled icon button "]').last().click();

    // Click on Add value button
    cy.get('[class^="ui labeled icon button"]').scrollIntoView().click()
    // Click on Save changes button
    cy.get('[id="sylius_save_changes_button"]').click();

    // Asser error message
    cy.get('body').should('contain', 'This form contains errors.')
    cy.get('body').should('contain', 'Please enter option value code.');
    cy.get('body').should('contain', 'Please enter option value.');
  });
  
  // tests to create a new product
  it('create new product and salve', () => {
    // Click on create in options page
    cy.get('*[class="ui labeled icon button  primary "]').click()
    // code novo_produto
    cy.get('[id="sylius_product_option_code"]').type('new_product')
    // name New Product Test - En
    cy.get('[id="sylius_product_option_translations_en_US_name"]').type('New Product for Test')
    // name Novo Produto Teste - Pt
    cy.get('[data-locale="pt_PT"]').scrollIntoView().click()
    cy.get('[id=sylius_product_option_translations_pt_PT_name]').type('Novo Produto Para Test')
    // Set values XL and GG
    cy.get('[class^="ui labeled icon button"]').click()
    cy.get('[id="sylius_product_option_values_0_code"]').type('new_product')
    cy.get('[id="sylius_product_option_values_0_translations_en_US_value"]').type('XL')
    cy.get('[id="sylius_product_option_values_0_translations_pt_PT_value"]').type('GG')
    // Click on create in new product page
    cy.get('*[class="ui labeled icon primary button"]').scrollIntoView().click()
    
    // Assert message 'Product option has been successfully created.'
    cy.get('body').should('contain', 'Product option has been successfully created.');

    // Back to the options page
    cy.clickInFirst('a[href="/admin/product-options/"]');
    // Type new_product in value input to search
    cy.get('[id="criteria_search_value"]').type('new_product');
    // Click on filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click on delete button to clean the create object
    cy.get('*[class^="ui red labeled icon button"]').last().click();
    cy.get('[id="confirmation-button"]').last().click();
  });
  
  it('create new product with empty fileds', () => {
    // Click on create in options page
    cy.get('*[class="ui labeled icon button  primary "]').click()
    // Click on create in new product page
    cy.get('*[class="ui labeled icon primary button"]').scrollIntoView().click()
    
    // Assert throw error 'This form contains errors.'
    cy.get('body').should('contain', 'This form contains errors.')
  });

  it('create new product and dont save, click on cancel', () => {
    // Click on create in options page
    cy.get('*[class="ui labeled icon button  primary "]').click()
    // code novo_produto
    cy.get('[id="sylius_product_option_code"]').type('new_product')
    // name New Product Test - En
    cy.get('[id="sylius_product_option_translations_en_US_name"]').type('New Product for Test')
    // Set values XL
    cy.get('[class^="ui labeled icon button"]').scrollIntoView().click()
    cy.get('[id="sylius_product_option_values_0_code"]').type('new_product')
    cy.get('[id="sylius_product_option_values_0_translations_en_US_value"]').type('XL')
    
    // Click on cancel in new product page
    cy.get('*[class="ui button"]').click()
    
    // Assert product don't exist in body
    cy.get('*[class^="ui sortable stackable very basic celled table"]').should('not.contain', 'new_product');
    
  });

  // test to filter
  it('filter products with existenting product', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('Dress height');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

     // Assert that has a product Dress height in list of products
    cy.get('*[class^="ui sortable stackable very basic celled table"]').should('contain', 'Dress height');
  });

  it('filter products with nonexistent product', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('product nonexistent');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

     // Assert that has a info with the message 'There are no results to display'
    cy.get('*[class^="ui icon info message"]').should('contain', 'There are no results to display');
  });

  it('clean the filters with a filter applied', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('product nonexistent');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();
    // Click in clear filter button
    cy.get('*[class^="ui labeled icon button"]').last().click();

    // Assert exist a table and the value field is empty
    cy.get('*[class^="ui sortable stackable very basic celled table"]').should('exist')
    cy.get('[id="criteria_search_value"]').should('be.empty')
  });

  // test to delete product
  it('delete product by delete buttom actions', () => {
    // Create a new product
    cy.get('*[class="ui labeled icon button  primary "]').click()
    cy.get('[id="sylius_product_option_code"]').type('new_product')
    cy.get('[id="sylius_product_option_translations_en_US_name"]').type('New Product for Test')
    cy.get('[class^="ui labeled icon button"]').click()
    cy.get('[id="sylius_product_option_values_0_code"]').type('new_product')
    cy.get('[id="sylius_product_option_values_0_translations_en_US_value"]').type('XL')
    cy.get('*[class="ui labeled icon primary button"]').click()
    
    // Back to the options page
    cy.clickInFirst('a[href="/admin/product-options/"]');
    // Search new product
    cy.get('[id="criteria_search_value"]').type('new_product');
    cy.get('*[class^="ui blue labeled icon button"]').click();
    
    // Click on delete button
    cy.get('*[class^="ui red labeled icon button"]').last().click();
    // Click on confirm delete button
    cy.get('[id="confirmation-button"]').last().click();

    // Assert check if new_product has be deleted
    cy.get('body').should('contain', 'Product option has been successfully deleted.')
    cy.get('*[class^="ui icon info message"]').should('contain', 'There are no results to display');
  });

  it('delete product by selecting the checkbox and delete buttom head', () => {
    // Create a new product
    cy.get('*[class="ui labeled icon button  primary "]').click()
    cy.get('[id="sylius_product_option_code"]').type('new_product')
    cy.get('[id="sylius_product_option_translations_en_US_name"]').type('New Product for Test')
    cy.get('[class^="ui labeled icon button"]').click()
    cy.get('[id="sylius_product_option_values_0_code"]').type('new_product')
    cy.get('[id="sylius_product_option_values_0_translations_en_US_value"]').type('XL')
    cy.get('*[class="ui labeled icon primary button"]').click()
    
    // Back to the options page
    cy.clickInFirst('a[href="/admin/product-options/"]');
    // Search new product
    cy.get('[id="criteria_search_value"]').type('new_product');
    cy.get('*[class^="ui blue labeled icon button"]').click();

    // Marck the New Product checkbox
    cy.get('*[class^="bulk-select-checkbox"]').last().click()
    // Click on delete button in a head
    cy.get('*[class^="sylius-grid-nav"]').find('*[class^="ui red labeled icon button"]').last().click()

    // Click on confirm delete button
    cy.get('[id="confirmation-button"]').last().click();

    // Assert check if new_product has be deleted
    cy.get('body').should('contain', 'Product_options have been successfully deleted.')
  });
});
