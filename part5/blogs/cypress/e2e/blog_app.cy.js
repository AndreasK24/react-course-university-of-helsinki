describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
    const user = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    const user2 = {
      name: "Superuser",
      username: "root",
      password: "sekret",
    };
    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user2);
    cy.visit("");
  });

  it("Login form is shown", function () {
    cy.contains("login").click();
  });
  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong credentials")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Matti Luukkainen logged in");
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "mluukkai", password: "salainen" });
    });

    it("A blog can be created", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Jurgen Wurgen");
      cy.get("#url").type("Jurgen Wurgen");
      cy.get("#create-button").click();
      cy.contains("a blog created by cypress");
    });
    it("Like can be added to blog", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Jurgen Wurgen");
      cy.get("#url").type("Jurgen Wurgen");
      cy.get("#create-button").click();
      cy.contains("a blog created by cypress")
        .parent()
        .parent()
        .contains("view")
        .click();
      cy.contains("Jurgen Wurgen")
        .parent()
        .find("#like-button")
        .as("theButton");
      cy.get("@theButton").click();
      cy.get("@theButton").parent().should("contain", "1");
    });
    it("Blog can be deleted", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Jurgen Wurgen");
      cy.get("#url").type("Jurgen Wurgen");
      cy.get("#create-button").click();

      cy.contains("Title: a blog created by cypress")
        .parent()
        .parent()
        .parent()
        .contains("delete")
        .click();
      cy.should("not.contain", "a blog created by cypress");
    });
    it("User can see delete button only if he created it", function () {
      cy.contains("New blog").click();
      cy.get("#title").type("a blog created by cypress");
      cy.get("#author").type("Jurgen Wurgen");
      cy.get("#url").type("Jurgen Wurgen");
      cy.get("#create-button").click();

      cy.contains("logout").click();

      cy.login({ username: "root", password: "sekret" });

      cy.contains("a blog created by cypress").parent().parent().parent();
      cy.should("not.contain", "delete");
    });

    describe("and a blog exists", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "The title with the second most likes",
          author: "Mc Büffelhüfte",
          url: "masters.com",
        });
        cy.createBlog({
          title: "The title with the most likes",
          author: "Mc Büffelhüfte",
          url: "masters.com",
        });
      });
      it("Blog with most likes is shown first", function () {
        cy.contains("The title with the second most likes")
          .parent()
          .parent()
          .contains("view")
          .click();
        cy.contains("The title with the second most likes")
          .parent()
          .find("#like-button")
          .as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").click();
        cy.get("@theButton").parent().should("contain", "2");
        cy.contains("The title with the most likes")
          .parent()
          .parent()
          .contains("view")
          .click();
        cy.contains("The title with the most likes")
          .parent()
          .find("#like-button")
          .as("theButton");
        cy.get("@theButton").click();
        cy.get("@theButton").click();
        cy.get("@theButton").click();
        cy.get("@theButton").parent().should("contain", "3");
        cy.get(".blog")
          .eq(0)
          .should("contain", "The title with the most likes");
        cy.get(".blog")
          .eq(1)
          .should("contain", "The title with the second most likes");
      });
    });
  });
});
