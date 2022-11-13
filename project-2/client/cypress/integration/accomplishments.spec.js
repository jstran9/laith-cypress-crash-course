/// <reference type="cypress" />

describe("Accomplishments Dashboard", () => {
  beforeEach(() => {
    cy.visit("/accomplishments");
  });

  // the test below tests both client and server.
  it("should display inappropriate content error when text or accomplishment includes 'giraffe' (inappropriate word)", () => {
    // get field by placeholder text.
    cy.get("[placeholder='Title']").type("This is my accomplishment");
    // type into the textarea field.
    cy.get("[placeholder='My accomplishment...']").type("I pet a giraffe");
    // click on the checkbox.
    cy.get("[type='checkbox']").click();
    // click on the submit accomplishment button.
    cy.get("button").click();
    cy.contains("Your content is not appropriate").should("be.visible");
  });

  // we don't want our tests to be interacting with our server (modifying our database for example)
  // the test below tests both client and server.
  it("should display inappropriate content error when text or accomplishment includes 'giraffe' (inappropriate word) with a mock", () => {
    // make the mock
    // we don't need to use a fixture only but we can have a function (or arrow function)
    // we are mocking that the client (user) made a post request with an inappropriate word and that our server returns back the error message.
    cy.intercept("POST", "http://localhost:4000", (req) => {
      req.reply((res) => {
        res.send({
          msg: "Your content is not appropriate",
        });
      });
    });

    // get field by placeholder text.
    cy.get("[placeholder='Title']").type("This is my accomplishment");
    // type into the textarea field.
    cy.get("[placeholder='My accomplishment...']").type("I pet a giraffe");
    // click on the checkbox.
    cy.get("[type='checkbox']").click();
    // click on the submit accomplishment button.
    cy.get("button").click();
    cy.contains("Your content is not appropriate").should("be.visible");
  });
});
