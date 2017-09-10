module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    kovan: {
      host: "localhost",
      port: 8545,
      network_id: 42,
      gasPrice: 10000000000
    },
    live: {
      host: "localhost",
      port: 8545,
      network_id: 1,
      gasPrice: 4000000000
    }
  }
};
