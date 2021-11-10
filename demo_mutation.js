const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  input AccountInput {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Mutation {
    createAccount(input: AccountInput): Account
    updateAccount(id: ID!, input: AccountInput): Account
  }
  type Query {
    accounts: [Account]
  }
`);

const db = {}

const root = {
  accounts() {
    return Object.values(db)
  },
  createAccount({ input }) {
    db[input.name] = input;
    return db[input.name];
  },
  updateAccount({ id, input }) {
    const updatedAccount = Object.assign({}, db[id], input);
    db[id] = updatedAccount;
    return updatedAccount;
  }
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(3001, () => {
  console.log("server started");
});
