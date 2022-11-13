/// <reference types="cypress" />

describe("Accomplishment Dashboard", () => {
  beforeEach(() => {
    // visit the accomplishments page before each test.
    cy.visit("/accomplishments");
  });

  it("should show error if information is missing.", () => {
    // get by test id (data-cy)
    cy.get("[data-cy='accomplishment-title-input']").type(
      "My Basketball Accomplishment"
    );
    cy.get("[data-cy='accomplishment-input']").type(
      "I made 10 threes in a row."
    );
    cy.contains("Submit Accomplishment").click();
    cy.contains("Complete the items above to continue").should("be.visible");
  });

  it("should display validation component if all information is input", () => {
    cy.get("[data-cy='accomplishment-title-input']").type(
      "My Basketball Accomplishment"
    );
    cy.get("[data-cy='accomplishment-input']").type(
      "I made 10 threes in a row."
    );
    // get by type='chekcbox' but note this may not be an optiomal solution if page gets more complicated (has more than one input checkbox).
    cy.get("[type='checkbox']").click();
    cy.contains("Submit Accomplishment").click();
    cy.contains("This Accomplisment was Successfully Submitted").should(
      "be.visible"
    );
  });

  it("should return back to accomplishment dashboard with empty input wheen 'Go Back' button is clicked ", () => {
    cy.get("[data-cy='accomplishment-title-input']").type(
      "My Basketball Accomplishment"
    );
    cy.get("[data-cy='accomplishment-input']").type(
      "I made 10 threes in a row."
    );
    // get by type='chekcbox' but note this may not be an optiomal solution if page gets more complicated (has more than one input checkbox).
    cy.get("[type='checkbox']").click();
    cy.contains("Submit Accomplishment").click();
    // cy.contains("This Accomplisment was Successfully Submitted").should(
    //   "be.visible"
    // );
    cy.contains("Go Back").click();
    cy.contains("h2", "Accomplishment").should("be.visible");

    // // make sure content is empty.
    cy.get("[data-cy='accomplishment-title-input']").should("have.value", "");
    cy.get("[data-cy='accomplishment-input']").should("have.value", "");

    // // make sure the element is checked.
    cy.get("[type='checkbox']").should("not.be.checked");
  });
});
