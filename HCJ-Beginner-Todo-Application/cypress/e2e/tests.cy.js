import "cypress-localstorage-commands";

import data from "../../submissionData.json";
// let data = [{ submission_link: "http://localhost:8080", id: 67890 }];

/// <reference types="cypress" />

let mockTodos = [
  { title: "learn DOM.", priority: "low", status: "Pending🔃" },
  { title: "learn CSS.", priority: "medium", status: "Pending🔃" },
  { title: "learn JavaScript.", priority: "high", status: "Completed✅" },
];

data.map(({ submission_link: url, id }) => {
  describe("Test Beginner todo app", () => {
    let acc_score = 1;

    beforeEach(() => {
      cy.restoreLocalStorage();

      Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    });

    afterEach(() => {
      cy.saveLocalStorage();
    });



    it("should able to add a todo and update localStorage", () => {
      cy.visit(url);
      cy.get("input").clear().type("learn Backend.");
      cy.get("select").select("medium");

      cy.get("#addBtn").should("exist").click();
      cy.wait(500);
      cy.window()
        .its("localStorage")
        .invoke("getItem", "todos")
        .then((todos) => {
          const parsedTodos = JSON.parse(todos) || [];
          //  [{title: "example", priority: "low", status: "Pending🔃"}]
          expect(parsedTodos).to.have.lengthOf(1);
          expect(parsedTodos[0].status).to.equal("Pending🔃");
          expect(parsedTodos[0].title).to.equal("learn Backend.");
          expect(parsedTodos[0].priority).to.equal("medium");
        });

      cy.clearLocalStorage();

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("should show error for empty todo text", () => {
      cy.visit(url);
      cy.get("input").clear();
      cy.get("select").select("low");

      cy.on("window:alert", cy.stub().as("windowAlert"));
      cy.get("#addBtn").should("exist").click();

      cy.get("@windowAlert").should(
        "have.been.calledOnceWithExactly",
        "Todo cannot be empty!"
      );

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should show all the todos in the table with archive and toggle status button", () => {
      cy.clearLocalStorage();
      cy.visit(url);

      mockTodos.forEach((e) => {
        cy.get("input").clear().type(e.title);
        cy.get("select").select(e.priority);
        cy.get("#addBtn").should("exist").click();
        cy.wait(500);
      });

      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.get("tr").should("have.length", 4);

      mockTodos.forEach((e, i) => {
        cy.get("tr")
          .eq(i + 1)
          .should("contain", e.title);
        cy.get("tr")
          .eq(i + 1)
          .should("contain", e.priority);
        cy.get("tr")
          .eq(i + 1)
          .should("contain", "Pending🔃");
        cy.get("tr").within(() => {
          cy.get(".toggle").should("exist");
          cy.get(".archiveBtn").should("exist");
        });
      });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should able to toggle status of a todo", () => {
      cy.clearLocalStorage();
      cy.visit(url);
      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });
      cy.get("input").clear().type("learn Backend.");
      cy.get("select").select("medium");

      cy.get("#addBtn").should("exist").click();
      cy.wait(500);
      cy.window()
        .its("localStorage")
        .invoke("getItem", "todos")
        .then((todos) => {
          const parsedTodos = JSON.parse(todos) || [];
          //  [{title: "example", priority: "low", status: "Pending🔃"}]
          expect(parsedTodos).to.have.lengthOf(1);
          expect(parsedTodos[0].status).to.equal("Pending🔃");
          expect(parsedTodos[0].title).to.equal("learn Backend.");
          expect(parsedTodos[0].priority).to.equal("medium");
        });
      cy.get(".toggle").eq(0).contains("Pending🔃");
      cy.get(".toggle").eq(0).should("exist").click();

      cy.wait(500).then(() => {
        cy.get(".toggle").eq(0).contains("Completed✅");

        cy.window()
          .its("localStorage")
          .invoke("getItem", "todos")
          .then((todos) => {
            const parsedTodos = JSON.parse(todos) || [];
            expect(parsedTodos).to.have.lengthOf(1);
            expect(parsedTodos[0].status).to.equal("Completed✅");
          });
      });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should able to add a todo in archive", () => {
      cy.clearLocalStorage();
      cy.visit(url);
      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.get("input").clear().type("learn Backend.");
      cy.get("select").select("medium");
      cy.get("#addBtn").should("exist").click();
      cy.wait(500);

      cy.window()
        .its("localStorage")
        .invoke("getItem", "todos")
        .then((todos) => {
          const parsedTodos = JSON.parse(todos) || [];
          //  [{title: "example", priority: "low", status: "Pending🔃"}]
          expect(parsedTodos).to.have.lengthOf(1);
          expect(parsedTodos[0].status).to.equal("Pending🔃");
          expect(parsedTodos[0].title).to.equal("learn Backend.");
          expect(parsedTodos[0].priority).to.equal("medium");
        });
      cy.window()
        .its("localStorage")
        .invoke("getItem", "archive")
        .then((archiveTodos) => {
          const parsedTodos = JSON.parse(archiveTodos) || [];
          expect(parsedTodos).to.have.lengthOf(0);
        });
      cy.get("tr").should("have.length", 2);
      cy.get(".archiveBtn").eq(0).should("exist").click();

      cy.wait(500).then(() => {
        cy.get("tr").should("have.length", 1);

        cy.window()
          .its("localStorage")
          .invoke("getItem", "archive")
          .then((todos) => {
            const parsedTodos = JSON.parse(todos) || [];
            //  [{title: "example", priority: "low", status: "Pending🔃"}]
            expect(parsedTodos).to.have.lengthOf(1);
            expect(parsedTodos[0].status).to.equal("Pending🔃");
            expect(parsedTodos[0].title).to.equal("learn Backend.");
            expect(parsedTodos[0].priority).to.equal("medium");
          });
        cy.window()
          .its("localStorage")
          .invoke("getItem", "todos")
          .then((archiveTodos) => {
            const parsedTodos = JSON.parse(archiveTodos) || [];
            expect(parsedTodos).to.have.lengthOf(0);
          });
      });

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("should show different background color to different priority", () => {
      cy.clearLocalStorage();
      cy.visit(url);

      mockTodos.forEach((e) => {
        cy.get("input").clear().type(e.title);
        cy.get("select").select(e.priority);
        cy.get("#addBtn").should("exist").click();
        cy.wait(500);
      });

      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.get("tr").should("have.length", 4);

      mockTodos.forEach((e, i) => {
        cy.get("tr")
          .eq(i + 1)
          .within(() => {
            cy.get("td")
              .eq(1)
              .should(
                "have.css",
                "background-color",
                e.priority === "medium"
                  ? "rgb(255, 255, 0)"
                  : e.priority === "high"
                  ? "rgb(255, 0, 0)"
                  : "rgba(0, 0, 0, 0)"
              );
          });
      });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should able to show all the archive todos with restore and delete button", () => {
      cy.clearLocalStorage();

      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.window()
        .its("localStorage")
        .invoke("setItem", "archive", JSON.stringify(mockTodos));

      cy.window()
        .its("localStorage")
        .invoke("getItem", "archive")
        .then((archiveTodos) => {
          const parsedTodos = JSON.parse(archiveTodos) || [];
          expect(parsedTodos).to.have.lengthOf(3);
        });
      cy.visit(url + "/archive.html");
      cy.get("tr").should("have.length", 4);

      mockTodos.forEach((e, i) => {
        cy.get("tr")
          .eq(i + 1)
          .should("contain", e.title);
        cy.get("tr")
          .eq(i + 1)
          .should("contain", e.priority);
        cy.get("tr")
          .eq(i + 1)
          .should("contain", e.status);
        cy.get("tr").within(() => {
          cy.get(".restoreBtn").should("exist");
          cy.get(".deleteBtn").should("exist");
        });
      });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should able to restore a archive todo", () => {
      cy.clearLocalStorage();

      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.window()
        .its("localStorage")
        .invoke("setItem", "archive", JSON.stringify(mockTodos));

      cy.window()
        .its("localStorage")
        .invoke("getItem", "archive")
        .then((archiveTodos) => {
          const parsedTodos = JSON.parse(archiveTodos) || [];
          expect(parsedTodos).to.have.lengthOf(3);
        });
      cy.visit(url + "/archive.html");
      cy.get("tr").should("have.length", 4);
      cy.get(".restoreBtn").eq(0).should("exist").click();

      cy.wait(500).then(() => {
        cy.get("tr").should("have.length", 3);

        cy.window()
          .its("localStorage")
          .invoke("getItem", "archive")
          .then((todos) => {
            const parsedTodos = JSON.parse(todos) || [];
            //  [{title: "example", priority: "low", status: "Pending🔃"}]
            expect(parsedTodos).to.have.lengthOf(2);
            expect(parsedTodos[0].status).to.equal(mockTodos[1].status);
            expect(parsedTodos[0].title).to.equal(mockTodos[1].title);
            expect(parsedTodos[0].priority).to.equal(mockTodos[1].priority);
            expect(parsedTodos[1].status).to.equal(mockTodos[2].status);
            expect(parsedTodos[1].title).to.equal(mockTodos[2].title);
            expect(parsedTodos[1].priority).to.equal(mockTodos[2].priority);
          });
        cy.window()
          .its("localStorage")
          .invoke("getItem", "todos")
          .then((archiveTodos) => {
            const parsedTodos = JSON.parse(archiveTodos) || [];
            expect(parsedTodos).to.have.lengthOf(1);
            expect(parsedTodos[0].status).to.equal(mockTodos[0].status);
            expect(parsedTodos[0].title).to.equal(mockTodos[0].title);
            expect(parsedTodos[0].priority).to.equal(mockTodos[0].priority);
          });
      });

      cy.then(() => {
        acc_score += 2;
      });
    });

    it("should able to delete a archive todo", () => {
      cy.clearLocalStorage();

      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.window()
        .its("localStorage")
        .invoke("setItem", "archive", JSON.stringify(mockTodos));

      cy.window()
        .its("localStorage")
        .invoke("getItem", "archive")
        .then((archiveTodos) => {
          const parsedTodos = JSON.parse(archiveTodos) || [];
          expect(parsedTodos).to.have.lengthOf(3);
        });
      cy.visit(url + "/archive.html");
      cy.get("tr").should("have.length", 4);
      cy.get(".deleteBtn").eq(0).should("exist").click();

      cy.wait(500).then(() => {
        cy.get("tr").should("have.length", 3);

        cy.window()
          .its("localStorage")
          .invoke("getItem", "archive")
          .then((todos) => {
            const parsedTodos = JSON.parse(todos) || [];
            //  [{title: "example", priority: "low", status: "Pending🔃"}]
            expect(parsedTodos).to.have.lengthOf(2);
            expect(parsedTodos[0].status).to.equal(mockTodos[1].status);
            expect(parsedTodos[0].title).to.equal(mockTodos[1].title);
            expect(parsedTodos[0].priority).to.equal(mockTodos[1].priority);
            expect(parsedTodos[1].status).to.equal(mockTodos[2].status);
            expect(parsedTodos[1].title).to.equal(mockTodos[2].title);
            expect(parsedTodos[1].priority).to.equal(mockTodos[2].priority);
          });
        cy.window()
          .its("localStorage")
          .invoke("getItem", "todos")
          .then((archiveTodos) => {
            const parsedTodos = JSON.parse(archiveTodos) || [];
            expect(parsedTodos).to.have.lengthOf(0);
          });
      });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should able to filter archive todos by Priority", () => {
      cy.clearLocalStorage();

      cy.window().then((win) => {
        cy.stub(win, "localStorage").as("localStorage");
      });

      cy.window()
        .its("localStorage")
        .invoke("setItem", "archive", JSON.stringify(mockTodos));

      cy.window()
        .its("localStorage")
        .invoke("getItem", "archive")
        .then((archiveTodos) => {
          const parsedTodos = JSON.parse(archiveTodos) || [];
          expect(parsedTodos).to.have.lengthOf(3);
        });
      cy.visit(url + "/archive.html");
      cy.get("tr").should("have.length", 4);
      cy.get("#prioritySelect").select("low");

      cy.wait(500).then(() => {
        cy.get("tr").should("have.length", 2);
        cy.get("tr").eq(1).should("contain", mockTodos[0].title);
        cy.get("tr").eq(1).should("contain", mockTodos[0].priority);
        cy.get("tr").eq(1).should("contain", mockTodos[0].status);
      });
      cy.get("#prioritySelect").select("medium");

      cy.wait(500).then(() => {
        cy.get("tr").should("have.length", 2);
        cy.get("tr").eq(1).should("contain", mockTodos[1].title);
        cy.get("tr").eq(1).should("contain", mockTodos[1].priority);
        cy.get("tr").eq(1).should("contain", mockTodos[1].status);
      });
      cy.get("#prioritySelect").select("high");

      cy.wait(500).then(() => {
        cy.get("tr").should("have.length", 2);
        cy.get("tr").eq(1).should("contain", mockTodos[2].title);
        cy.get("tr").eq(1).should("contain", mockTodos[2].priority);
        cy.get("tr").eq(1).should("contain", mockTodos[2].status);
      });

      cy.then(() => {
        acc_score += 1;
      });
    });

    it("should able to filter archive todos by status", () => {
      cy.then(() => {
        cy.clearLocalStorage();

        cy.window().then((win) => {
          cy.stub(win, "localStorage").as("localStorage");
        });

        cy.window()
          .its("localStorage")
          .invoke("setItem", "archive", JSON.stringify(mockTodos));

        cy.window()
          .its("localStorage")
          .invoke("getItem", "archive")
          .then((archiveTodos) => {
            const parsedTodos = JSON.parse(archiveTodos) || [];
            expect(parsedTodos).to.have.lengthOf(3);
          });
        cy.visit(url + "/archive.html");
        cy.get("tr").should("have.length", 4);
        cy.get("#statusSelect").select("Pending🔃");

        cy.wait(500).then(() => {
          cy.get("tr").should("have.length", 3);

          cy.get("tr").eq(1).should("contain", mockTodos[0].title);
          cy.get("tr").eq(1).should("contain", mockTodos[0].priority);
          cy.get("tr").eq(1).should("contain", mockTodos[0].status);

          cy.get("tr").eq(2).should("contain", mockTodos[1].title);
          cy.get("tr").eq(2).should("contain", mockTodos[1].priority);
          cy.get("tr").eq(2).should("contain", mockTodos[1].status);
        });
        cy.get("#statusSelect").select("Completed✅");

        cy.wait(500).then(() => {
          cy.get("tr").should("have.length", 2);
          cy.get("tr").eq(1).should("contain", mockTodos[2].title);
          cy.get("tr").eq(1).should("contain", mockTodos[2].priority);
          cy.get("tr").eq(1).should("contain", mockTodos[2].status);
        });

        acc_score += 1;
      });
    });

    after(`generate score`, () => {
      console.log(acc_score);
      let result = {
        id,
        marks: Math.floor(acc_score),
      };
      result = JSON.stringify(result);
      cy.writeFile("results.json", `\n${result},`, { flag: "a+" }, (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  });
});
