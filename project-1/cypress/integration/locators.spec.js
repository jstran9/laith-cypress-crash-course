/// <reference types="cypress" />

describe("Locators", () => {
  beforeEach(() => {
    cy.visit("/elements");
  });

  it("locating elements with get command", () => {
    // get all elements by tag name.
    cy.get("button");

    // get all elements by className
    cy.get(".btn-with-class");

    // get all elements with specific class.
    // square brackets allow us to use specific attributes.
    cy.get("[class='Elements-btn btn-with-class more-btn-classes']");
    cy.get("[class='Elements-btn btn-with-class']");

    // get all elements by id.
    cy.get("[id='btn-with-id']");
    cy.get("#btn-with-id");

    // get all elements by specific attribute.
    cy.get("[type='submit']");

    // get elements with multiple attributes.
    // get all buttons with a specific class.
    // get all elements by tag name ANND class.
    cy.get("button.Elements-btn");

    // get all elements by tag name AND class AND id
    cy.get("button.Elements-btn#btn-with-id");

    // get all elements by tag name AND class AND type attribute.
    cy.get("button.Elements-btn[type='submit']");

    // get all elements with specific data test id
    cy.get("[data-cy='btn-id-1']");
    cy.getByTestId("btn-id-1");
  });

  it("locating elements with contains", () => {
    // get element by text.
    cy.contains("Unique Text");

    // get element by text (not unique)
    cy.contains("Not Unique Text");

    // with selector
    cy.contains("[type='submit']", "Not Unique Text");
    // get the form element and find the input element that contains "not unique text" inside of the form.
    cy.contains("form", "Not Unique Text");

    cy.get("[type='submit']").contains("Not Unique Text");
  });

  it("locating elements with find", () => {
    // must chain a command to use find.
    cy.get("#form-1").find(".btn-1");
    cy.get("#form-1").find(".btn-2");
  });
});
