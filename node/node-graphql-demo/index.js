// [Reference](https://mp.weixin.qq.com/s/ZLZvPB6EHojVeqhFkQjQAA)
// [Souce](https://blog.jscrambler.com/build-a-graphql-api-with-node/)
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const graphql = require("graphql");
const ExpressGraphQL = require("express-graphql");

// 创建一个 Express 应用程序
const app = express();
// 创建名为 my.db 的 SQLite 3 数据库
const database = new sqlite3.Database("./my.db");

const createContactTable = () => {
    const query = `
      CREATE TABLE IF NOT EXISTS contacts (
      id integer PRIMARY KEY,
      firstName text,
      lastName text,
      email text UNIQUE)`;
    return database.run(query);
}
// 在数据库中创建 contacts 表并马上调用函数
createContactTable();

// 定义一个 GraphQL 类型
const ContactType = new graphql.GraphQLObjectType({
    name: "Contact",
    fields: {
        id: {
            type: graphql.GraphQLID
        },
        firstName: {
            type: graphql.GraphQLString
        },
        lastName: {
            type: graphql.GraphQLString
        },
        email: {
            type: graphql.GraphQLString,
        }
    }
});

// 定义查询类型
var queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        contacts: {
            type: graphql.GraphQLList(ContactType),
            resolve: (root, args, context, info) => {
                return new Promise((resolve, reject) => {
                    database.all("SELECT * FROM contacts;", function (err, rows) {
                        if (err) {
                            reject([]);
                        }
                        resolve(rows);
                    });
                });

            }
        },
        contact: {
            type: ContactType,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, {
                id
            }, context, info) => {
                return new Promise((resolve, reject) => {

                    database.all("SELECT * FROM contacts WHERE id = (?);", [id], function (err, rows) {
                        if (err) {
                            reject(err);
                        }
                        resolve(rows[0]);
                    });
                });
            }
        }
    }
});

// 创建一个 mutation 类型，用于创建、更新和删除操作
var mutationType = new graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createContact: {
            // type 说明返回数据的类型
            type: ContactType,
            // args 定义期望从客户端得到的参数
            args: {
                firstName: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                lastName: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                email: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            // resolve 则定义了在获取数据逻辑中实际使用的方法
            resolve: (root, {
                firstName,
                lastName,
                email
            }) => {
                return new Promise((resolve, reject) => {
                    database.run('INSERT INTO contacts (firstName, lastName, email) VALUES (?,?,?);', [firstName, lastName, email], (err) => {
                        if (err) {
                            reject(err);
                        }
                        database.get("SELECT last_insert_rowid() as id", (err, row) => {

                            resolve({
                                id: row["id"],
                                firstName: firstName,
                                lastName: lastName,
                                email: email
                            });
                        });
                    });
                })

            }
        },
        updateContact: {
            type: graphql.GraphQLString,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                },
                firstName: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                lastName: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                },
                email: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLString)
                }
            },
            resolve: (root, {
                id,
                firstName,
                lastName,
                email
            }) => {
                return new Promise((resolve, reject) => {
                    database.run('UPDATE contacts SET firstName = (?), lastName = (?), email = (?) WHERE id = (?);', [firstName, lastName, email, id], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(`Contact #${id} updated`);

                    });
                })
            }
        },
        deleteContact: {
            type: graphql.GraphQLString,
            args: {
                id: {
                    type: new graphql.GraphQLNonNull(graphql.GraphQLID)
                }
            },
            resolve: (root, {
                id
            }) => {
                return new Promise((resolve, reject) => {
                    database.run('DELETE from contacts WHERE id =(?);', [id], (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(`Contact #${id} deleted`);

                    });
                })

            }
        }
    }
});

// 创建 GraphQL schema
// GraphQL schema 是 GraphQL 的核心概念， 它定义了连接到服务器的客户端可用的功能。 
// 我们传递已定义的 query 和 mutation 类型到 schema
const schema = new graphql.GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

app.use("/graphql", ExpressGraphQL({
    schema: schema,
    graphiql: true
}));
app.listen(4000, () => {
    console.log("GraphQL server running at http://localhost:4000.");
});

/*
Usage:

mutation {  
    createContact(firstName: "Jon", lastName: "Snow", email: "jonsnow@thenightswatch.com") {
        id,
        firstName,
        lastName,
        email
    }
}

mutation {  
    updateContact(id: 1, firstName: "Aegon", lastName: "Targaryen", email: "aegontargaryen@ironthrone.com")
}

query {  
    contact(id: 1) {
        id
        firstName
        lastName
        email
    }
}
*/