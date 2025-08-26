import React from "react";
import AddCard from "./AddCard";
import { cardService } from "../services/cardService";

Cypress.Commands.add("alertErrorHaveText", (expectedText) => {
  cy.contains(".alert-error", expectedText).should("be.visible");
});

describe("<AddCard />", () => {

  

  beforeEach(() => {
    cy.viewport(1440, 900);
  });

  it("exibe erros quando os campos não são informados", () => {
    cy.mount(<AddCard />);
    cy.contains("button", "Adicionar Cartão").click();

    const alerts = [
      "Número do cartão é obrigatório",
      "Nome do titular é obrigatório",
      "Data de expiração é obrigatória",
      "CVV é obrigatório",
      "Selecione um banco",
    ];

    alerts.forEach((alert) => {
      cy.alertErrorHaveText(alert);
    });
  });

  it("deve cadastrar um novo cartão de crédito", () => {
    // Mock dos serviços
    cy.stub(cardService, "getCards").resolves([]); // Nenhum cartão existente
    cy.stub(cardService, "addCard").resolves({ success: true }); // Cadastro sempre bem-sucedido

    cy.mount(<AddCard />);

    const myCard = {
      number: "4242424242424242",
      holderName: "Bruna Lacerda",
      expirationDate: "12/35",
      cvv: "546",
      bank: "inter",
    };

    // Preenche o formulário
    cy.get('[data-cy="number"]').type(myCard.number);
    cy.get('[data-cy="holderName"]').type(myCard.holderName);
    cy.get('[data-cy="expirationDate"]').type(myCard.expirationDate);
    cy.get('[data-cy="cvv"]').type(myCard.cvv);
    cy.get(`[data-cy="bank-${myCard.bank}"]`).click();

    // Envia
    cy.contains("button", "Adicionar Cartão").click();

    // Valida mensagem de sucesso
    cy.contains("Cartão cadastrado com sucesso!").should("be.visible");
  });

  it("valida nome do titular com menos de 2 caracteres", () => {
    // Mock dos serviços
    cy.stub(cardService, "getCards").resolves([]); // Nenhum cartão existente
    cy.stub(cardService, "addCard").resolves({ success: true }); // Cadastro sempre bem-sucedido

    cy.mount(<AddCard />);

    const myCard = {
      number: "4242424242424242",
      holderName: "B",
      expirationDate: "12/35",
      cvv: "546",
      bank: "inter",
    };

    // Preenche o formulário
    cy.get('[data-cy="number"]').type(myCard.number);
    cy.get('[data-cy="holderName"]').type(myCard.holderName);
    cy.get('[data-cy="expirationDate"]').type(myCard.expirationDate);
    cy.get('[data-cy="cvv"]').type(myCard.cvv);
    cy.get(`[data-cy="bank-${myCard.bank}"]`).click();

    // Envia
    cy.contains("button", "Adicionar Cartão").click();
    cy.alertErrorHaveText('Nome deve ter pelo menos 2 caracteres')



    // Valida mensagem de sucesso
    //cy.contains("Cartão cadastrado com sucesso!").should("be.visible");
  });

  it("valida data de expiração inválida", () => {
    // Mock dos serviços
    cy.stub(cardService, "getCards").resolves([]); // Nenhum cartão existente
    cy.stub(cardService, "addCard").resolves({ success: true }); // Cadastro sempre bem-sucedido

    cy.mount(<AddCard />);

    const myCard = {
      number: "4242424242424242",
      holderName: "Bruna Lacerda",
      expirationDate: "13/35",
      cvv: "546",
      bank: "inter",
    };

    // Preenche o formulário
    cy.get('[data-cy="number"]').type(myCard.number);
    cy.get('[data-cy="holderName"]').type(myCard.holderName);
    cy.get('[data-cy="expirationDate"]').type(myCard.expirationDate);
    cy.get('[data-cy="cvv"]').type(myCard.cvv);
    cy.get(`[data-cy="bank-${myCard.bank}"]`).click();

    // Envia
    cy.contains("button", "Adicionar Cartão").click();
    cy.alertErrorHaveText('Data de expiração inválida ou vencida')



    // Valida mensagem de sucesso
    //cy.contains("Cartão cadastrado com sucesso!").should("be.visible");
  });

  it("valida cvv com menos de 3 dígitos", () => {
    // Mock dos serviços
    cy.stub(cardService, "getCards").resolves([]); // Nenhum cartão existente
    cy.stub(cardService, "addCard").resolves({ success: true }); // Cadastro sempre bem-sucedido

    cy.mount(<AddCard />);

    const myCard = {
      number: "4242424242424242",
      holderName: "Bruna Lacerda",
      expirationDate: "12/35",
      cvv: "54",
      bank: "inter",
    };

    // Preenche o formulário
    cy.get('[data-cy="number"]').type(myCard.number);
    cy.get('[data-cy="holderName"]').type(myCard.holderName);
    cy.get('[data-cy="expirationDate"]').type(myCard.expirationDate);
    cy.get('[data-cy="cvv"]').type(myCard.cvv);
    cy.get(`[data-cy="bank-${myCard.bank}"]`).click();

    // Envia
    cy.contains("button", "Adicionar Cartão").click();
    cy.alertErrorHaveText('CVV deve ter 3 ou 4 dígitos')



    // Valida mensagem de sucesso
    //cy.contains("Cartão cadastrado com sucesso!").should("be.visible");
  });
});
