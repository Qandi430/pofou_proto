import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Management from '../../containers/portfolio/management/Management';
import '../../resources/scss/portfolio/portfolio.scss';

const Portfolio = () => {
    return (
        <div className="portfolio">
            <Switch>
                <Route path="/portfolio/management" component={Management}/>
            </Switch>
        </div>
    )
}

export default Portfolio;