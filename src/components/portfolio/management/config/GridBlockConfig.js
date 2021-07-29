import React, { useState } from 'react';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactSortable } from 'react-sortablejs';

const GridBlockConfig = ({configForm,toggleContentsList,modifyBlock}) => {

    const [selectedContent,setSelectedContent] = useState(null);

    const changeContents = (name,value) => {
        const newForm = {
            ...configForm,
            [name] : value,
        }
        modifyBlock(newForm);
    }

    const selectContent = index => {
        if(selectedContent !== null && selectedContent.index === index){
            setSelectedContent(null);
        }else{
            setSelectedContent(configForm.contents.find(c => c.index === index));
        }
    }

    const sortContents = newList => {
        const newForm = {
            ...configForm,
            contents : newList
        }
        modifyBlock(newForm);
    }

    const removeContent = () => {
        if(selectedContent === null){
            alert("선택된 컨텐츠가 없습니다.");
            return false;
        }
        const newForm = {
            ...configForm,
            contents : configForm.contents.filter(c => c.index !== selectedContent.index)
        }
        modifyBlock(newForm);
    }

    return(
        <div className="gridBlock">
            <dl className="contentsGrid">
                <dt>컨텐츠 가로 개수</dt>
                <dd>
                    <span>{configForm !== null && configForm.grid}</span>
                    <input type="range" min="1" max="6" value={configForm !== null && configForm.grid} onChange={e => changeContents("grid",e.target.value)}/>
                </dd>
            </dl>
            <dl className="contentsList">
                <dt>컨텐츠 리스트 <button onClick={removeContent}><FontAwesomeIcon icon={faTrashAlt}/></button></dt>
                <dd>
                    <ReactSortable className="sortBox" list={configForm.contents} setList={list => sortContents(list)}>
                        {
                            configForm.contents.map(
                                content=>
                                    <div className={`content ${selectedContent !== null && selectedContent.index === content.index ? "on" : ""}`} onClick={() => selectContent(content.index)} key={content.index} style={{flex: `0 0 ${100/configForm.grid}%`}}>
                                        <div className="item">
                                            {content.index+1}
                                        </div>
                                    </div>
                            )
                        }
                    </ReactSortable>
                    <button onClick={() => toggleContentsList(configForm !== null ? configForm.category : "")}><FontAwesomeIcon icon={faPlus}/> 추가</button>
                </dd>
            </dl>
        </div>
    )
}

export default GridBlockConfig;