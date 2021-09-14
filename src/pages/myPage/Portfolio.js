import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Management from '../../containers/portfolio/management/Management';
import '../../resources/scss/portfolio/portfolio.scss';
import Config from '../../containers/portfolio/management/Config';

const Portfolio = () => {
    return (
        <div className="portfolio">
            <Switch>
                <Route path="/portfolio/management" component={Management}/>
                <Route path="/portfolio/Config" component={Config}/>
            </Switch>
        </div>
    )
}

export default Portfolio;