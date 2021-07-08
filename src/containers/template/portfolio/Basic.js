import React,{useState,useEffect} from 'react';
import Main from '../../../components/template/portfolio/basic/Main';
import About from '../../../components/template/portfolio/basic/About';
import WorkGrid from '../../../components/template/portfolio/basic/WorkGrid';
import Contact from '../../../components/template/portfolio/basic/Contact';
import '../../../resources/scss/template/portfolio/basic/basic.scss';
import WorkDetailModal from '../../../components/template/portfolio/basic/WorkdDetailModal';
import detail1 from '../../../resources/images/main/detail01.jpeg';
import detail2 from '../../../resources/images/main/detail02.jpeg';
import detail3 from '../../../resources/images/main/detail03.jpeg';
import profile from '../../../resources/images/main/profile.jpeg';


const Basic = ({design,data,setTitleForm,toggleTitleConfigModal,toggleSkillConfigModal,togglePrivacyConfigModal}) => {  
    const [openWorkDeatilModal, setOpenWorkDeatilModal] = useState(false);
    const [designMode, setDesignMode] = useState(false);
    
    

    const selectedItem = {
        title : "꿈을꿔봐요",
        registrationDate : '6일전',
        member : {
            name : "5unday",
            profile : profile,
        },
        categoryList : [
            '그래픽 디자인',
            '일러스트레이션'
        ],
        viewCnt : 312,
        like : 17,
        commentList : [

        ],
        contentList : [
            {
                content : `<img src='${detail1}'/>`,
            },
            {
                content : `<img src='${detail2}'/>`,
            },
            {
                content : `<img src='${detail3}'/>`,
            },
        ],
        hashtagList : [
            "어린이",
            "리플렛",
            "디자인",
            "일러스트",
            "그래픽",
            "꿈",
            "도형",
        ],
    };

    useEffect(() => {
        setDesignMode(design);
    }, [design]);

    const toggleWorkDetailModal = () => {
        setOpenWorkDeatilModal(!openWorkDeatilModal);
    }

    

    return (
        <div className="template portfolio basic">
            <Main designMode={designMode} data={data.main} setTitleForm={setTitleForm} toggleTitleConfigModal={toggleTitleConfigModal}/>
            <About designMode={designMode} data={data.about} toggleTitleConfigModal={toggleTitleConfigModal} toggleSkillConfigModal={toggleSkillConfigModal} togglePrivacyConfigModal={togglePrivacyConfigModal}/>
            <WorkGrid designMode={designMode} data={data.work} toggleTitleConfigModal={toggleTitleConfigModal} toggleWorkDetailModal={toggleWorkDetailModal}/>
            <Contact designMode={designMode} data={data.contact} toggleTitleConfigModal={toggleTitleConfigModal}/>
            <WorkDetailModal isOpen={openWorkDeatilModal} toggle={toggleWorkDetailModal} item={selectedItem}/>
            
        </div>
    )
}

export default Basic;