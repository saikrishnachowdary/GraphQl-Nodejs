const express = require('express')
const expressGraphQL = require('express-graphql')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
  } = require('graphql')

const app = express()


const AllPersonsList = [
    { 
      firstName: 'John',
      lastName: 'Brown',
      middleName : "crown"  ,   
      address: 'towers backside',
      zipcode : 12345,
      state : "abhudabhi",
      country : "Dubai",
      friends : "balu",
      hobbies : "playing"


    },
    {    
      firstName: 'Jim',
      lastName: 'Green',    
      middleName : "gas",
      address: 'Ny building',  
      zipcode : 12345,
      state : "NY",
      country : "USA",
      friends : "balu",
      hobbies : "DoingNOTHING"      
    },
    {
      firstName: 'Joe',
      lastName: 'Black',
      middleName:"hat",
      address: 'Sidney No. 1 Lake Park',
      zipcode : 12345,
      state : "Telanagana",
      country : "India",
      friends : "balu",
      hobbies : "playing cricket"    
    },
  ];

const ListOfCandiadtes = new GraphQLObjectType({
  name: 'CallList',
  description: 'This List of all persons',
  fields: () => ({
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    middleName: { type: GraphQLNonNull(GraphQLString) },
    address: { type: GraphQLNonNull(GraphQLString) },
    zipcode: { type: GraphQLNonNull(GraphQLInt) },
    state: { type: GraphQLNonNull(GraphQLString) },
    country: { type: GraphQLNonNull(GraphQLString) },
    friends: { type: GraphQLNonNull(GraphQLString) },
    hobbies: { type: GraphQLNonNull(GraphQLString) },
  })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query' ,
    description : 'Root Query',
    fields : () =>({
        PersonBasedonCountry :{
            type : ListOfCandiadtes,
            description: 'list based on age',
            args:{
                country:{type: GraphQLString}
            },
            resolve: (parent,args)=> AllPersonsList.find(PersonBasedonCountry => PersonBasedonCountry.country === args.country)
        },
        AllPersonsList :{
            type : new GraphQLList(ListOfCandiadtes),
            description: 'List of all persons in rootquery',
            resolve: ()=> AllPersonsList
        }
    })

})

const RootMutation =new GraphQLObjectType({
    name: 'Mutation',
    description:'this is a mutation root',
    fields : ()=>({
        addPerson : {
            type: ListOfCandiadtes ,
            description:'add person',
            args:{
                firstName: { type: GraphQLNonNull(GraphQLString) },
                lastName: { type: GraphQLNonNull(GraphQLString) },
                middleName: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
                zipcode: { type: GraphQLNonNull(GraphQLInt) },
                state: { type: GraphQLNonNull(GraphQLString) },
                country: { type: GraphQLNonNull(GraphQLString) },
                friends: { type: GraphQLNonNull(GraphQLString) },
                hobbies: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve:(parent,args)=>{
                const person = { 
                    firstName:args.firstName,
                    lastName: args.lastName,
                    middleName: args.middleName,
                    address: args.address,
                    zipcode: args.zipcode,
                    state: args.state,
                    country: args.country,
                    friends: args.friends,
                    hobbies: args.hobbies
                    }
                AllPersonsList.push(person)
                return person
            }
        }
    })
})

const schema = new GraphQLSchema({
    query : RootQueryType ,
    mutation : RootMutation
})

app.use('/graphql', expressGraphQL({
    schema:schema,
    graphiql:true 
}))

app.listen(5000,()=>console.log('Server Running at port 5000'))

