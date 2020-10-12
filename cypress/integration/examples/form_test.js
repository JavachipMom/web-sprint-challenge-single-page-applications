describe("Test Text Entering", function () {
  it("Visits a new site", function () {
    cy.visit("index.html");

    cy.visit("./pizza");
    cy.get(".name-field").type("Name");
  });
});
