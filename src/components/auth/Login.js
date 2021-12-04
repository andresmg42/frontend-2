import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import ApiURL from '../../services/apirest.js'
import Image from '../../assets/img/Logo_w.png'

export default class Login extends Component {

    state = {
        IdUser_PK: '',
        Password: '',
        UserName: '',
        UserLastName: '',
        userPermission:'',
        msj: '',
        TOKEN: '',
        status: '',
        isSignin: false,
        maxroll: 0
    }

    OnHover = (e) => {
        e.target.style.background = 'white';
        e.target.style.color = 'black';
    }

    OnOut = (e) => {
        e.target.style.background = 'black';
        e.target.style.color = 'white';
    }

    OnChangeInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async e => {
        e.preventDefault();

        const Array = {
            IdUser_PK: this.state.IdUser_PK,
            Password: this.state.Password
        }

        const { data } = await axios.post(ApiURL + 'auth/signin', Array)

        if (data.status === 200) {
            this.setState({
                msj: data.msj,
                TOKEN: data.data.TOKEN,
                status: data.status,
                IdUser_PK: data.data.IdUser_PK,
                UserName: data.data.UserName,
                UserLastName: data.data.UserLastName,
                userPermission:  data.data.userPermission,
                isSignin: true,
                maxroll: data.data.maxRoll
            })
            localStorage.setItem("TOKEN", this.state.TOKEN)    
            localStorage.setItem("IdUser_PK", this.state.IdUser_PK)
            localStorage.setItem('UserName', this.state.UserName)
            localStorage.setItem('UserLastName', this.state.UserLastName)
            localStorage.setItem('userPermission', this.state.userPermission)
            localStorage.setItem('initials', this.state.UserName.substring(0,1).toUpperCase()+this.state.UserLastName.substring(0,1).toUpperCase())
            localStorage.setItem('maxRoll', this.state.maxroll)
        
            window.location.reload()            
        } else {
            this.setState({
                msj: data.msj,
                IdUser_PK: '',
                Password: ''
            })
            toast.error(this.state.msj)
        }
    }

    render() {
        return (
            <div style={styles.main}>
                <div style={styles.container}>
                    <center>
                        <div style={styles.middle} className="d-md-flex d-sm-block">
                            <div id="login" style={styles.login} className="border-end" >                            

                                <form onSubmit={this.onSubmit} style={styles.form}>

                                <fieldset className="clearfix">

                                    <div className="input-group py-2">
                                        <span className="input-group-text bg-white" id="usertext"><i className="fs-3 bi bi-person-fill"></i></span>
                                        <input aria-describedby="usertext" className="form-control p-3" type="text"
                                            placeholder="Usuario"
                                            onChange={this.OnChangeInput}
                                            name="IdUser_PK"
                                            value={this.state.IdUser_PK}
                                            required
                                        />
                                    </div>

                                    <div className="input-group py-2">
                                        <span className="input-group-text bg-white" id="passtext"><i className="fs-3 bi bi-lock-fill"></i></span>
                                        <input aria-describedby="passtext" className="form-control p-3" type="password"
                                            placeholder="Contraseña"
                                            name="Password"
                                            onChange={this.OnChangeInput}
                                            value={this.state.Password}
                                            required
                                        />
                                    </div>

                                    <div className="py-2 row align-items-center">
                                        <span style={{ width: '50%', textAlign: 'left', display: 'inline-block' }}><Link className="text-white" to="/recoverypsw">Recuperar Contraseña</Link></span>
                                        <span style={{ width: '50%', textAlign: 'right', display: 'inline-block' }}><input style={styles.input} type="submit" value="Ingresar" onMouseOver={this.OnHover} onMouseLeave={this.OnOut} /></span>
                                    </div>

                                    </fieldset>
                                    <div className="clearfix"></div>

                                </form>

                                <div className="clearfix"></div>

                            </div>
                            <div className="logo d-none d-lg-block" style={styles.logo}>
                                <img className="img_logo" src={Image} style={styles.img_logo} alt="Logo RMS" />
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        )

    }
}

const styles = {
    main: {
        '--color-1': '#61CE70',
        '--color-2': '#008032',
        background: `
      radial-gradient(
        ellipse at center,
        var(--color-1) 1%,
        var(--color-2) 100%
      )`
        ,
        height: '100vh',
        width: '100%'
    },

    container: {
        left: '50%',
        position: 'fixed',
        top: '50%',
        transform: `translate(-50%, -50%)`,
    },

    middle: {        
        width: '600px',
    },

    logo: {
        color: '#fff',
        fontSize: '50px',
        lineHeight: '125px',
        display: 'inline-block',
        width: '40%',
    },

    login: {        
        padding: '0px 22px',
        width: '59%',
    },

    form: {
        width: '250px',
    },

    input: {
        borderRadius: '3px',
        backgroundColor: '#000000',
        color: '#eee',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        padding: '5px 10px',
        lineHeight: '1.5em',

        '&:hover': {
            backgroundColor: '#fff',
            color: '#000',
        }
    },

    inputs: {
        backgroundColor: '#fff',
        borderRadius: '0px 3px 3px 0px',
        color: '#000',
        marginBottom: '1em',
        padding: '0 16px',
        width: '200px',
        height: '50px',
        lineHeight: '1.5em',
    },

    img_logo: {
        color: '#000',
        width: '190px',
        height: '190px',
    },

};
