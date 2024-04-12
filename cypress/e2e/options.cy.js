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
    // Click in options in side menu
    // cy.clickInFirst('a[href="/admin/product-options/"]');
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
  
  // tests to create new product
  it('create new product and salve', () => {
    
  });
  it('create new product with empty fileds', () => {
    
  });
  it('create new product and dont save, click on cancel', () => {
    
  });

  // test to filter
  it('filter products with existenting product', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('Dress height');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

     // Assert that has a product Dress height in list of products
    cy.get('*[class⁼"ui sortable stackable very basic celled table"]').should('contain', 'Dress height');
  });

  it('filter products with nonexistent product', () => {
    // Type in value input to search for specify option
    cy.get('[id="criteria_search_value"]').type('product nonexistent');
    // Click in filter blue button
    cy.get('*[class^="ui blue labeled icon button"]').click();

     // Assert that has a info with the message 'There are no results to display'
    cy.get('*[class^="ui icon info message"]').should('contain', 'There are no results to display');
  });

  it.only('clean the filters with a filter applied', () => {
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
    
  });
  it('delete product by selecting the checkbox and delete buttom head', () => {
    
  });
});
