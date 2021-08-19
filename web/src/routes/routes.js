import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Register } from '../pages/Register';
import { Edit } from '../pages/Edit';

export default function RoutesAdm() {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/edit/:id" exact component={Edit} />
        </Switch>
    )
}