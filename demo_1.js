const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
  }
  type Query {
    hello: String
    accountName: String
    age: Int
    account: Account
  }
`);

const root = {
  hello: () => {
    return 'hello world';
  },
  accountName: () => {
    return 'John';
  },
  age: () => {
    return 18;
  },
  account: () => {
    return {
      name: 'Tim',
      age: 18,
      sex: 'male',
      department: 'viterbi'
    }
  }
}

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
  console.log('server started');
});
