const request = require("supertest");
const app = require("../app");
jest.mock("../db"); 
const bcrypt = require("bcrypt");
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
     nameUsuario: "A",
      nome: "A",
      email: "A@A.com",
      telefone: "4798888998",
      senha: "123456"
    });
    console.log(response.body);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Usuário cadastrado com sucesso");
  });

  test("Cadastro com usuário duplicado", async () => {
        jest.clearAllMocks();
    db.query.mockImplementationOnce((sql, values, callback) => {
      callback(null, [{    nameUsuario: "A",     email: "A@A.com",   telefone: "4798888998" }]);
    });

    const response = await request(app).post("/cadastro").send({
    nameUsuario: "A",
      nome: "A",
      email: "A@A.com",
      telefone: "4798888998",
      senha: "123456"
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.error).toContain("Já cadastrado");
  });

  test("Login com sucesso", async () => {
  const senhaEmTexto = "123456";
  const senhaHash = await bcrypt.hash(senhaEmTexto, 10);
  console.log(senhaHash);

  db.query.mockImplementationOnce((sql, values, callback) => {
    callback(null, [{
      idUsuario: 1,
      nameUsuario: "A",
      nome: "A",
      email: "A@A.com",
      telefone: "4798888998",
      senha: senhaHash,
      fotoPerfil: "foto.jpg"
    }]);
  });

  const response = await request(app).post("/login").send({
    usuario: "fulanoteste",
    senha: senhaEmTexto
  });

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("token");
  expect(response.body.user).toMatchObject({
   nameUsuario: "A",
      nome: "A",
      email: "A@A.com",
  });
});
test("Login com senha incorreta", async () => {
  const senhaErrada = "654321";
  const senhaHash = await bcrypt.hash("123456", 10);
console.log(senhaHash);
  db.query.mockImplementationOnce((sql, values, callback) => {
    callback(null, [{
      idUsuario: 2,
      nameUsuario: "A",
      nome: "A",
      email: "A@A.com",
      telefone: "4798888998",
      senha: senhaHash,
      fotoPerfil: "foto.jpg"
    }]);
  });

  const response = await request(app).post("/login").send({
    usuario: "A",
    senha: senhaErrada
  });
  console.log(response.body);
  console.log(response.statusCode);
  expect(response.statusCode).toBe(401);
  expect(response.body.error).toBe("Senha incorreta.");
});

test("Login com usuário inexistente", async () => {
  db.query.mockImplementationOnce((sql, values, callback) => {
    callback(null, []); 
  });

  const response = await request(app).post("/login").send({
    usuario: "naoexiste",
    senha: "123456"
  });

  expect(response.statusCode).toBe(401);
  expect(response.body.error).toBe("Usuário não encontrado.");
});

});

