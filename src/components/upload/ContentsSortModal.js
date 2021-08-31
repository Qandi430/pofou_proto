import { faBars, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';

const ContentsSortModal = ({isOpen,toggle,contentsList,saveList}) => {

    const [sortList,setSortList] = useState([]);
    
    useEffect(() => {
        if(isOpen){
            setSortList(JSON.parse(JSON.stringify(contentsList)));
        }else{
            setSortList([]);
        }
    },[isOpen,contentsList]);

    const changeList = (newList) => {
        setSortList(newList)
    }

    const submitContentsSort = (e) => {
        e.preventDefault();
        saveList(sortList);
        toggle()
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} id="contentsSortModal" centered size="md">
            <ModalHeader>
                콘텐츠 재정렬
            </ModalHeader>
            <ModalBody>
                <ReactSortable 
                    list={sortList} 
                    setList={newList => changeList(newList)} 
                    className="sortList" 
                    
                >
                    {
                        sortList.map(
                            sort => {
                                return(
                                    <div className={`listItem `} key={sort.order} style={{display:`${sort.type === "dummy" ? "none" : "flex"}`}}>
                                        <div className="grip">
                                            <FontAwesomeIcon icon={faBars}/>
                                        </div>
                                        {/* {
                                            sort.type === "video" ?
                                            <div className={`itemContent ${sort.type}`}>
                                                {
                                                    sort.contents.indexOf("vimeo") > -1? <FontAwesomeIcon icon={faVimeo}/> : <FontAwesomeIcon icon={faVideo}/>

                                                }
                                            </div>
                                            : <div className={`itemContent ${sort.type}`} dangerouslySetInnerHTML={{__html: sort.contents }}/>        
                                        } */}
                                        <div className={`itemContent ${sort.type}`} dangerouslySetInnerHTML={{__html: sort.type === "video" ? JSON.parse(sort.contents).thumbnail:sort.contents }}/>
                                        <div className="itemType">
                                            {
                                                (() => {
                                                    switch(sort.type){
                                                        case "image":
                                                            return "이미지";
                                                        case "text":
                                                            return "텍스트";
                                                        case "video":
                                                            return "동영상";
                                                        case "grid":
                                                            return "이미지 그리드";
                                                        default:
                                                            return sort.type;
                                                    }
                                                })()
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        )
                    }
                </ReactSortable>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={toggle}>취소</Button>
                <Button color="info" onClick={submitContentsSort}>저장</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ContentsSortModal;