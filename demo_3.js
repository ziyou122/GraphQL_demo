const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Account {
    name: String
    age: Int
    sex: String
    department: String
    salary(city: String): Int
  }
  type Query {
    getClassMates(classNo: Int!): [String]
    account(username: String): Account
  }
`);

const root = {
  getClassMates({classNo}) {
    const obj = {
      31: ['a', 'b', 'c'],
      61: ['A', 'B', 'C']
    }
    return obj[classNo];
  },
  account({username}) {
    const name = username;
    const sex = 'male'
    const age = 19
    const department = 'viterbi'
    const salary = ({city}) => {
      if (city === 'LA') {
        return 10000
      }
      return 8000
    }
    return {
      name,
      sex,
      age,
      department,
      salary
    }
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
