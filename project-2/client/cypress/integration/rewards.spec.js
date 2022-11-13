/// <reference type="cypress" />

describe("Rewards Dashboard", () => {
  beforeEach(() => {
    cy.visit("/rewards");
  });

  it("should display a list of rewards", () => {
    // get the list containing our rewards.
    cy.get("ul")
      .should(
        "contain",
        "500 points for drinking 8 cups of water for 7 straight days"
      )
      .and("contain", "850 points for fasting for 5 days straight");
  });

  /**
   * it is possible our server will render dynamic content and cause our tests to fail.
   * we may not want to make requests to a server as it may make changes to our database.
   * making requests to a server can be costly
   * due to the above reasons we will want to create mocks.
   */
  it("should display a list of rewards with mocks", () => {
    /*
     * 1. we must intercept the http request (http://localhost:4000) which retrieves the rewards list.
     */
    // first parmeter is the http verbs (get, post, patch, delete, put, head, etc.).
    // second parameter is the URL we want to intercept.
    // third parameter is the data we want to send back
    cy.intercept("get", "http://localhost:4000/rewards", {
      // fixture refers to the "fixtures" directory which holds files that mock JSON data.
      fixture: "rewards.json",
    });
  });
});
