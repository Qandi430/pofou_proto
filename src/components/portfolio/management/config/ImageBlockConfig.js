import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen, faAlignCenter, faAlignLeft, faAlignRight } from '@fortawesome/free-solid-svg-icons';

const ImageBlockConfig = ({configForm,modifyBlock}) => {
    return(
        <div className="imageBlock">
            <dl className="image">
                <dt>이미지</dt>
                <dd>
                    {
                        configForm.contents[0].media !== null ?
                        <div className="imageThumbnail">
                            <img src={configForm.contents[0].media} alt="" />
                        </div>
                        :
                        <Fragment>
                            <label htmlFor="bgImage">
                                <FontAwesomeIcon icon={faFolderOpen}/>
                            </label>
                            <input type="file" id="bgImage" />
                        </Fragment>
                    }
                </dd>
            </dl>
        </div>
    )
}

export default ImageBlockConfig;