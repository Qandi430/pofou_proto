import React, { createContext, Component } from 'react';
import cookie from 'react-cookies';
import jwtDecode from 'jwt-decode';
import { getDataByName } from '../resources/data/portfolioData';
import { getResumeDetailByResumeNumber } from '../server/resume/ResumeServer';

const Context  = createContext();
const {Provider,Consumer : PortfolioConsumer} = Context;

class PortfolioProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginMember : null,
            representativeResume : null,
            portfolidForm : null,
            openResumeSelectModal : false,
            openSpinnerModal : false,
            resume : null,
        };
    }

    componentDidMount(){
        if(this.state.loginMember === null){
            const memberToken = cookie.load("memberToken");
            if(memberToken !== undefined){
                const loginMember = jwtDecode(memberToken);
                this.setState({
                    ...this.state,
                    loginMember : loginMember.member
                })
            }else{
                alert("로그인시 이용 가능합니다.");
                this.props.history.push("/");
            }
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(this.state.loginMember === null){
            const memberToken = cookie.load("memberToken");
            if(memberToken !== undefined){
                const loginMember = jwtDecode(memberToken);
                this.setState({
                    ...this.state,
                    loginMember : loginMember.member
                })
            }else{
                alert("로그인시 이용 가능합니다.");
                this.history.push("/");
            }
        }
        if(prevProps.loginMember !== this.props.loginMember){
            this.setState({
                ...this.state,
                loginMember : this.props.loginMember
            })
        }
        // const portfolioId = this.props.match.
    }

    actions = {
        getPortfolioData : id => this.getPortfolioData(id),
        toggleResumeSelectModal : portfolioName => this.toggleResumeSelectModal(portfolioName),
        toggleSpinnerModal : state => this.props.toggleSpinnerModal(state),
        openResumeDetailModal : resume => this.props.openResumeDetailModal(resume),
        closeResumeDetailModal : () => this.props.closeResumeDetailModal(),
    }

    getPortfolioData = async(id) => {
        if(isNaN(Number(id))){
            console.log("template");
            let data = getDataByName(id);
            console.log(data);
        }else{
            console.log("load");
        }
    }

    toggleResumeSelectModal = (portfolioName) => {
        console.log(portfolioName);
        let newPortfolio = null;
        if(portfolioName !== undefined || typeof portfolioName === "string"){
            newPortfolio =  getDataByName(portfolioName);
        }

        this.setState({
            openResumeSelectModal : !this.state.openResumeSelectModal,
            portfolidForm : newPortfolio,
        });
    }

    setResume = async (resumeNumber) => {
        const {data : resume} = await getResumeDetailByResumeNumber(resumeNumber);
        //db insert
        this.setState({
            ...this.state,
            resume : resume
        });
        this.props.history.push()
    }

    render(){
        const {state,actions} = this;
        const value = {state,actions};
        
        return(
            <Provider value={value}>
                {this.props.children}
            </Provider>
        )
    }
}

function createPortfolioConsumer(WrappedComponent){
    return function UsePortfolioConsumer(props){
        return(
            <PortfolioConsumer>
                {
                    ({state,actions}) => (
                        <WrappedComponent
                            loginMember={state.loginMember}
                            getPortfolioData = {actions.getPortfolioData}
                            openResumeSelectModal = {state.openResumeSelectModal}
                            toggleResumeSelectModal = {actions.toggleResumeSelectModal}
                            toggleSpinnerModal = {actions.toggleSpinnerModal}
                            openResumeDetailModal = {actions.openResumeDetailModal}
                            closeResumeDetailModal = {actions.closeResumeDetailModal}
                            {...props}
                        />
                    )
                }
            </PortfolioConsumer>
        )
    }
}

export{
    PortfolioProvider,
    PortfolioConsumer,
    createPortfolioConsumer,
}