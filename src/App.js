import React from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './services/Firebase'
import Login from './views/Login'
import Home from './views/Home'
import Crimes from './views/Crimes'
import CrimeLista from './views/CrimeLista'
import Menu from './components/Menu'
import Footer from './components/Footer'
import Recados from './views/Recados'

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route
      {...rest}
      render={props => isAuthenticated() ? (
        <>
          <Menu />
          <Component {...props} />
        </>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
      }
    />
  }

  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact={true} component={Login} />
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/crimes" component={Crimes} />
        <PrivateRoute path="/crimeslista" component={CrimeLista} />
        <PrivateRoute path="/recados" component={Recados} />

        <Route path="*" component={Login} />
      </Switch>

      <Footer />

    </HashRouter>
  );
}

export default App;
