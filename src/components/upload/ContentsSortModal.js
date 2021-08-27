import { faBars, faVideo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Modal, ModalBody, ModalFooter, ModalHeader,Button } from 'reactstrap';
import axios from 'axios';
import { faVimeo } from '@fortawesome/free-brands-svg-icons';

const ContentsSortModal = ({isOpen,toggle,contentsList}) => {

    const [sortList,setSortList] = useState([]);
    
    useEffect(() => {
        if(isOpen){
            // if(contentsList !== null && contentsList !== undefined){
            //     console.log("initialize contentsList")
            //     initSortList(contentsList);
            // }
            setSortList(JSON.parse(JSON.stringify(contentsList)));
        }else{
            setSortList([]);
        }
    },[isOpen,contentsList]);

    const getThumbnail = async(contents) => {   
        let id = contents.split('src="')[1];
        id = id.split('"')[0];
        id = id.split("/")[4];
        let thumbnail;
        if(contents.indexOf("vimeo") > -1){
            await axios.get(`http://vimeo.com/api/v2/video/${id}.json`).then(
                res=>{
                    console.log(res.data[0].thumbnail_large);
                    thumbnail =  `<img src="${res.data[0].thumbnail_large}" alt=""/>`;
                }
            )
        }else{
            thumbnail =  `<img src="https://img.youtube.com/vi/${id}/maxresdefault.jpg" alt=""/>`;
        }
        
        return thumbnail;
    }

    const initSortList = async (contentsList) => {
        let newList = [];
        contentsList.forEach(
            contents => {
                if(contents.type === "video"){
                    getThumbnail(contents.contents).then(data => contents["tumbnail"] = data);
                }
                newList.push(JSON.parse(JSON.stringify(contents)));
            }
        )
        setSortList(newList)
    }

    const changeList = (newList) => {
        console.log(newList)
        setSortList(newList)
    }

    return(
        <Modal isOpen={isOpen} toggle={toggle} id="contentsSortModal" centered size="md">
            <ModalHeader>
                콘텐츠 재정렬
            </ModalHeader>
            <ModalBody>
                <ReactSortable list={sortList} setList={newList => changeList(newList)} className="sortList">
                    {
                        sortList.map(
                            sort => {
                                return(
                                    <div className={`listItem `} key={sort.order}>
                                        <div className="grip">
                                            <FontAwesomeIcon icon={faBars}/>
                                            {sort.order}
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
                                        {/* <div className={`itemContent ${sort.type}`} dangerouslySetInnerHTML={{__html: sort.contents }}/> */}
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
                <Button color="info">저장</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ContentsSortModal;