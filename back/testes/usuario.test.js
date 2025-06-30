const request = require("supertest");
const app = require("../app");
jest.mock("../db"); 

const db = require("../db");

describe("Testes de Cadastro (Mockado)", () => {
 
  test("Cadastro de novo usuário com sucesso", async () => {
        jest.clearAllMocks();
    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, []); 
    });


    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, { insertId: 1 });
    });

    const response = await request(app).post("/cadastro").send({
      nome: "Fulano Teste",
      usuario: "fulanoteste",
      email: "fulano@teste.com",
      telefone: "11912345678",
      senha: "senha123"
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Usuário cadastrado com sucesso");
  });

  test("Cadastro com usuário duplicado", async () => {
        jest.clearAllMocks();
    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, [{ nameUsuario: "fulanoteste", email: "fulano@teste.com", telefone: "11912345678" }]);
    });

    const response = await request(app).post("/cadastro").send({
      nome: "Fulano",
      usuario: "fulanoteste",
      email: "fulano@teste.com",
      telefone: "11912345678",
      senha: "senha123"
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toContain("Já cadastrado");
  });
});
