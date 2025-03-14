import database from "/infra/database.js"

async function status(request, response) {
   const updateAt = new Date().toISOString();

   // Consulta para versão do PostgreSQL
   const postgresVersionResult = await database.query("SHOW server_version;");
   const postgresVersion = postgresVersionResult.rows[0].server_version;

   // Consulta para conexões máximas
   const maxConnectionsResult = await database.query("SHOW max_connections;");
   const maxConnections = parseInt(maxConnectionsResult.rows[0].max_connections);
   
   // Consulta para conexões em uso
   const databaseName = "postgres"
   const activeConnectionsResult = await database.query(
    `SELECT count(*)::int AS active_connections FROM pg_stat_activity WHERE datname = '${databaseName}';`
);
   const activeConnections = activeConnectionsResult.rows[0].active_connections;

    response.status(200).json({
        updated_at: updateAt,
        dependences: {
            database:{
                postgres_version: postgresVersion,
                max_connections: parseInt(maxConnections),
                active_connections: activeConnections,
            }
        }
        
     });
        
}

export default status;