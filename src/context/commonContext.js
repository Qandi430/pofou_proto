import React, { createContext, Component } from 'react';

const Context  = createContext();

const {Provider,Consumer : CommonConsumer} = Context;

class CommonProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
        };
    }


    actions = {
        loginAction : (email,password) => this.loginAction(email,password),        
    };

    //login action
    loginAction = (email,password) => {
        
        console.log(email,password);
        this.setState({
            isLogin : true
        });
        console.log("loginAction true")
        window.history.back();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.history !== undefined) {
            if(prevState.history === undefined || nextProps.history.location.pathname !== prevState.history.location.pathname){
                return { history: nextProps.history };      
            }
        }
        return null; // null 을 리턴하면 따로 업데이트 할 것은 없다라는 의미

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

function createCommonConsumer(WrappedComponent){
    return function UseCommonConsumer(props){
        return(
            <CommonConsumer>
                {
                    ({state,actions}) => (
                        <WrappedComponent
                            history = {state.history}
                            isLogin = {state.isLogin}
                            loginAction = {actions.loginAction}
                            {...props}
                        />
                    )
                }
            </CommonConsumer>
        )
    }
}

export{
    CommonProvider,
    CommonConsumer,
    createCommonConsumer,
}