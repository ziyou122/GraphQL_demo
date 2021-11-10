const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    getClassMates(classNo: Int!): [String]
  }
`);

const root = {
  getClassMates({classNo}) {
    const obj = {
      31: ['a', 'b', 'c'],
      61: ['A', 'B', 'C']
    }
    return obj[classNo];
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
