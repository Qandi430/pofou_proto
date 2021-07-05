import React from 'react';
import DesignHeader from '../../../components/portfolio/management/design/DesignHeader';
const Basic = React.lazy(() => import('../../../containers/template/portfolio/Basic'));

const Design = () => {
    return (
        <div className="design">
            <DesignHeader/>
            <div className="designBody">
                <Basic design/>
            </div>
        </div>
    )
}

export default Design;