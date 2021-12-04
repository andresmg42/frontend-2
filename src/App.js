import React from 'react'
import RouterApp from './routes/RouterApp';
import RouterAuth from './routes/RouterAuth';
import axios from 'axios'
import ApiURL from './services/apirest';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userSignIn: false,
      isReady: false,
      IdUser_PK: '',
      TOKEN: ''
    }
  }

  async componentDidMount() {   
    const headers = {
      headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const res = await axios.post(ApiURL + 'auth/isSignin',{} ,headers) //Hacer petición HTTP
    //console.log(res)
    if(res.data.status===200){
      this.setState({userSignIn: true})
    }
  }

  navigationSelect() {
    switch (this.state.userSignIn) {
      case true:
        return <RouterApp />
      case false:
        return <RouterAuth />
      default:
        return <RouterAuth />
    }
  }

  render() {
    return (
      <div>
        {this.navigationSelect()}
      </div>
    );
  }
}
