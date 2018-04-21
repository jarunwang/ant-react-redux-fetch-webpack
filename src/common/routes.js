import React from 'react'
import { Route, Redirect, Switch } from 'react-router'
import Container from 'container'
import Login from 'pages/login'
import createHistory from 'history/createBrowserHistory'

const history = createHistory()
const location = history.location

const routes = (
   <Switch>
     <Route exec path="/login" component={Login} />
     {location.hash === '#/' ? <Redirect to='/login' /> : ''}
     <Route exec path="/" component={Container} />
    
   </Switch>
)

export default routes
