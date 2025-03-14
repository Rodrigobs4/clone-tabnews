test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status")
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  
  // Verifica se o campo updated_at existe e está em formato ISO válido
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdateAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdateAt);
  
  // Verifica se o objeto dependences.database existe
  expect(responseBody.dependences).toBeDefined();
  expect(responseBody.dependences.database).toBeDefined();
  
  // Verifica as informações do PostgreSQL
  expect(responseBody.dependences.database.postgres_version).toBeDefined();
  expect(responseBody.dependences.database.max_connections).toBeDefined();
  expect(responseBody.dependences.database.active_connections).toBeDefined();
  
  // Verifica se max_connections é um número
  expect(typeof responseBody.dependences.database.max_connections).toBe("number");
  
  // Verifica se active_connections é um número
  expect(typeof responseBody.dependences.database.active_connections).toBe("number");
  
  // Verifica se active_connections é menor ou igual a max_connections
  expect(responseBody.dependences.database.active_connections)
    .toBeLessThanOrEqual(responseBody.dependences.database.max_connections);
});