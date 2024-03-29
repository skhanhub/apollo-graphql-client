import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import ApolloClient from "apollo-boost";
import { gql } from "apollo-boost";
import { ApolloProvider } from "react-apollo-hooks";
import { InMemoryCache } from 'apollo-cache-inmemory';
import './App.css';
import RunTests from './components/runTests/RunTests'
import Navigation from "./navigation/Navigation"
import CreateTests from "./components/createTests/CreateTests"
import CreateTestSets from "./components/createTestSets/CreateTestSets"
import ModifyTests from "./components/modifyTests/ModifyTests"
import Manage from "./components/manage/Manage"
import SearchTestLogs from "./components/testLogs/SearchTestLogs"
import CustomResults from "./components/customResults/CustomResults"
import About from "./components/About"
import Contact from "./components/Contact"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Test from "./components/Test"
import setCallTestInputsMutation from "./graphql/reducers/setCallTestInputsMutation"
import setUmsTestInputsMutation from "./graphql/reducers/setUmsTestInputsMutation"
import setClientsTestInputsMutation from "./graphql/reducers/setClientsTestInputsMutation"
import setStageMutation from "./graphql/reducers/setStageMutationMutation"
import setRunTestStageMutation from "./graphql/reducers/setRunTestStageMutation"
import addRunningTestMutation from "./graphql/reducers/addRunningTest"
import removeRunningTestMutation from "./graphql/reducers/removeRunningTest"
import modifySearchMutation from "./graphql/reducers/modifySearch"
import GetRunningTestsQuery from "./graphql/reducers/GetRunningTests"

const cache = new InMemoryCache();
const initData = {
  search: '',
  runningTests: [],
  testName: null,
  selectedTestType: null,
  testDescription: null,
  stage: 'SelectTestType',
  modifyTestName: "",
  runTestStage: 'tests',
  testResultId: null,
  umsTest:{
    __typename: 'UmsTest',
    selectedDN: null,
    selectedUms: null,
    selectedCluster: null,
  },
  clientsTest:{
    __typename: 'ClientsTest',
    selectedDN: null,
    selectedDataCenter: null,
    selectedCluster: null,
    selectedProduct: null,
  },
  AParty:{
      __typename: 'Party',
      selectedDN: null,
      selectedSbc: null,
      selectedProduct: null,
      selectedRegion: null,
      selectedCluster: null,
  },
  BParty:{
      __typename: 'Party',
      selectedDN: null,
      selectedSbc: null,
      selectedProduct: null,
      selectedRegion: null,
      selectedCluster: null,
  },
};

const typeDefs = gql`
  type SelectedParty{
    cluster: String
    DN: String
    product: String
    region: String
    sbc: String
  }
  scalar JSON
  type RunningTest{
    id: ID
    name: String
    status: String
    passed: Boolean
  }
`;

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
  typeDefs,
  resolvers:{
    Mutation: {
      setCallTestInputs: setCallTestInputsMutation,
      setUmsTestInputs: setUmsTestInputsMutation,
      setClientsTestInputs: setClientsTestInputsMutation,
      setStage: setStageMutation,
      setRunTestStage: setRunTestStageMutation,
      removeRunningTest: removeRunningTestMutation,
      modifySearch: modifySearchMutation,
      addRunningTest: addRunningTestMutation,
    },
    Query:{
      getRunningTests: GetRunningTestsQuery
    }
  }
});

cache.writeData({ data: initData });

client.onResetStore(async () => cache.writeData({ data: initData }));
client.onClearStore(async () => cache.writeData({ data: initData }));
function App() {

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Navigation>
          <Switch>
            <Route 
              exact 
              path="/"
              component={RunTests}
            />
            <Route
              path="/createTests"
              component={CreateTests}
            />
            <Route
              path="/createTestSets"
              component={CreateTestSets}
            />
            <Route
              path="/modifyTests"
              component={ModifyTests}
            />
            <Route
              path="/about"
              component={About}
            />
            <Route
              path="/contact"
              component={Contact}
            />
            <Route
              path="/login"
              component={Login}
            />
            <Route
              path="/signUp"
              component={SignUp}
            />
            <Route
              path="/test"
              component={Test}
            />
            <Route
              path="/searchTestLogs"
              component={SearchTestLogs}
            />
            <Route
              path="/CustomResults"
              component={CustomResults}
            />
            <Route
              path="/manage"
              component={Manage}
            />
            <Route
              render={()=> <h1>Not Found</h1>}
            />
          </Switch>
        </Navigation>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
