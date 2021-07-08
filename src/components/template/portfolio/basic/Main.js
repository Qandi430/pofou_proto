import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import MainImage from '../../../../resources/images/template/portfolio/basic/basicMainImage.jpg';

const Main = ({designMode,data,toggleTitleConfigModal}) => {

    return (
        <div className="main" style={{backgroundImage : `url(${MainImage})`}}>
            <div className="titleWrap">
                <h2 
                    className={`title ${designMode ? "designMode" : ""}`} 
                >
                    <span style={{color : `${data.title.color}`,textAlign:`${data.title.textAlign}`}} dangerouslySetInnerHTML={{__html: data.title.text }}></span>
                    {
                        designMode &&
                        <button onClick={() => toggleTitleConfigModal("main")}>
                            <FontAwesomeIcon icon={faCog}/>
                        </button>
                    }
                </h2>
            </div>
        </div>
    )
}


export default Main;