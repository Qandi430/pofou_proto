import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Management from '../../containers/portfolio/management/Management';
import Design from '../../containers/portfolio/management/Design';
import '../../resources/scss/portfolio/portfolio.scss';

const Portfolio = () => {
    return (
        <div className="portfolio">
            <Switch>
                <Route path="/portfolio/management" component={Management}/>
                <Route path="/portfolio/design" component={Design}/>
            </Switch>
        </div>
    )
}

export default Portfolio;