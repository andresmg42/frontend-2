import React, { Component } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import ApiURL from '../../../services/apirest'

export default class Profile extends Component {

    state = {
        user:{},
        userUpdate:{},
        IdUser_PK: '',
        Password: '',
        UserName: '',
        IdCompany_FK: '',
        UserLastName: '',
        UserEmail:'',
        avatar:'',
        Status:'',
        userPermission:'',
        IsEditing: false,
        isView: false,
        Title: 'Crear Usuario',
        Modal: '',
        msj: '',
        status: '',
        selectedFile: null,
        oldPswCorrect:false,
        pswConfirm:false,
        


    }

    LoadVariables = async (id) => {
        
        const config = {
            headers: { 'x-access-token': localStorage.getItem('TOKEN') },
        }
        const data ={ColumnName: "IdUser_PK", Value: id}
        
        const res  = await axios.post(ApiURL + 'user/getById', data, config)

        if (res.data.status === 200) {
            const initial =res.data.data[0].UserName.substring(0,1).toUpperCase()+res.data.data[0].UserLastName.substring(0,1).toUpperCase()
                  
                this.setState({
                    user:res.data.data[0],
                    Password: res.data.data[0].Password,
                    IdCompany_FK: res.data.data[0].IdCompany_FK,
                    UserEmail: res.data.data[0].UserEmail,
                    avatar:res.data.data[0].avatar,
                    initials: initial,
                    IdUser_PK: res.data.data[0].IdUser_PK,
                    UserName: res.data.data[0].UserName,
                    UserLastName: res.data.data[0].UserLastName,
                    userPermission:  res.data.data[0].userPermission,
                })
                console.log("la iniciales :", this.state.initials)
                localStorage.setItem("IdUser_PK", this.state.user.IdUser_PK)
                localStorage.setItem('UserName', this.state.user.UserName)
                localStorage.setItem('UserLastName', this.state.user.UserLastName)
                localStorage.setItem('userPermission', this.state.user.userPermission)
                localStorage.setItem('avatar', this.state.user.avatar)
                localStorage.setItem('initials', this.state.UserName.substring(0,1).toUpperCase()+this.state.UserLastName.substring(0,1).toUpperCase())
                
            } else {
            toast.error(data.msj)
        }
    }
    componentDidMount=()=>{
        
        this.LoadVariables(localStorage.getItem('IdUser_PK'))
    }



    onSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(this.state.list))
    }

    DeleteItem = itemId => {
        const DeleteItemX = this.state.list.filter(item => item.id !== itemId);
        this.setState({ list: DeleteItemX });
    };

    AddItem = (e) => {
        e.preventDefault();
        const { id, Text, Telefono, list } = this.state;

        this.setState({
            id: this.state.id + 1,
            list: [...list, { id, Text, Telefono }],
            Text: '',
            Telefono: ''
        })
    }
    OnChangeInput = (e) => {
        console.log(e)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    SaveEdit = (e) => {
        e.preventDefault();
        document.getElementById("UserName").setAttribute('readOnly', true)
        document.getElementById("UserLastName").setAttribute('readOnly', true)
        document.getElementById("UserEmail").setAttribute('readOnly', true)
        document.getElementById('CancelEdtBtn').setAttribute('hidden', true)
        document.getElementById('SaveEdtBtn').setAttribute('hidden', true)
        document.getElementById('EdtBtn').removeAttribute('hidden')
        document.getElementById('ChangePswBtn').removeAttribute('hidden')
  
    }

    OnEdit = (e) => {
        e.preventDefault();
       
        
        if(e.target.id ==='EdtBtn'){
            document.getElementById("UserName").removeAttribute('readOnly')
            document.getElementById("UserLastName").removeAttribute('readOnly')
            document.getElementById("UserEmail").removeAttribute('readOnly')
            document.getElementById('CancelEdtBtn').removeAttribute('hidden')
            document.getElementById('SaveEdtBtn').removeAttribute('hidden')
            document.getElementById('EdtBtn').setAttribute('hidden', true)
            document.getElementById('ChangePswBtn').setAttribute('hidden',true)
        }else{
            document.getElementById("UserName").setAttribute('readOnly', true)
            document.getElementById("UserLastName").setAttribute('readOnly', true)
            document.getElementById("UserEmail").setAttribute('readOnly', true)
            document.getElementById('CancelEdtBtn').setAttribute('hidden', true)
            document.getElementById('SaveEdtBtn').setAttribute('hidden', true)
            document.getElementById('EdtBtn').removeAttribute('hidden')
            document.getElementById('ChangePswBtn').removeAttribute('hidden')
            document.getElementById('UserName').value=this.state.user.UserName
            document.getElementById('UserLastName').value=this.state.user.UserLastName
            document.getElementById('UserEmail').value=this.state.user.UserEmail
        }
        
    }
    ChangePsw =(e)=>{
        switch(e.target.id){
            case "ChangePswBtn" : 
                document.getElementById('ActualPassword').value="";
                document.getElementById('NewPassword').value="";
                document.getElementById('ConfirmPassword').value="";
                this.setState({ oldPswCorrect:false, pswConfirm:false})
            break;
            case "ActualPassword" : 
                toast.error("vamos a cambiar")
                break;
            case "ConfirmPassword" :
                if(document.getElementById('NewPassword').value !==document.getElementById('NewPassword')) 
                toast.error("los nuevos password no coinciden")
                break;
            case "ChangePswbtnSave" : 
                if(this.state.oldPswCorrect && this.state.pswConfirm)
                    e.preventDefault()
                break;
            default: 
                toast.error("vamos a cambiar")

        }


    }
    render() {
        
        return (
            <div className="page-content py-3">
                <div className="card">
                   <div className="card-header py-3">
                        <h5>Mi Perfil</h5>   
                    </div>
                    <div className="card-body py-3">
                        <form method="GET" action="UserCtrl">
                            
                            <div className="row">
                                <div className="col-5  ">
                                 <center>
                                        
                                        <div className="avatar-xl  bg-primary bg-gradient" >{this.state.initials}</div>
                                    </center>
                                </div>    
                                <div className="col-7">
                                    <div className="row">
                                        <div className="py-1 col-md-6 col-sm-12" >
                                            <div className="form-floating ">
                                                <input type="text"
                                                    name="IdUser_PK"
                                                    id="IdUser_PK"
                                                    placeholder="Identificación"
                                                    className="form-control"
                                                    value={this.state.user.IdUser_PK}
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="IdUser_PK">Identificación</label>
                                            </div>
                                        </div>
                                        <div className="py-1 col-md-6 col-sm-12" >
                                            <div className="form-floating">
                                                <input type="text"
                                                    name="IdCompany_FK"
                                                    id="IdCompany_FK"
                                                    placeholder="Identificación"
                                                    className="form-control"
                                                    value={this.state.user.IdCompany_FK}
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="IdCompany_FK">Empresa</label>
                                            </div>
                                        </div>
                                        <div className="py-1 col-md-12 col-sm-12" >
                                        <div className="form-floating">
                                            <input type="text"
                                                name="UserName"
                                                id="UserName"
                                                placeholder="Nombres"
                                                className="form-control"
                                                onChange={this.OnChangeInput}
                                                defaultValue={this.state.user.UserName}
                                                required
                                                readOnly
                                                />
                                                <label htmlFor="UserName">Nombres</label>
                                            </div>
                                        </div>
                                        <div className="py-1 col-md-12 col-sm-12" >
                                            <div className="form-floating">
                                                <input type="text"
                                                    name="UserLastName"
                                                    id="UserLastName"
                                                    placeholder="Apellidos"
                                                    className="form-control"
                                                    onChange={this.OnChangeInput}
                                                    defaultValue={this.state.user.UserLastName}
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="UserLastName">Apellidos</label>
                                            </div>
                                        </div>
                                        <div className="py-1 col-md-12 col-sm-12" >
                                            <div className="form-floating">
                                                <input type="email"
                                                    name="UserEmail"
                                                    id="UserEmail"
                                                    placeholder="Correo Electrónico"
                                                    className="form-control"
                                                    onChange={this.OnChangeInput}
                                                    defaultValue={this.state.user.UserEmail}
                                                    required
                                                    readOnly
                                                />
                                                <label htmlFor="UserEmail">Correo Electrónico</label>
                                            </div>
                                        </div>  <center>
                                            
                                                <button  className="btn btn-success  m-2" id='EdtBtn'style={{width:"204px"}} onClick={this.OnEdit}><i className="bi bi-pen mx-2"></i>Editar</button>
                                                <button  hidden className="btn btn-danger  m-2" style={{maxWidth:"142px"}} id='CancelEdtBtn' onClick={this.OnEdit}><i className="bi bi-x-circle mx-2"></i>Cancelar</button>
                                                <button  hidden id='SaveEdtBtn' className="btn btn-success  m-2" style={{maxWidth:"142px"}} onClick={this.SaveEdit}><i className="bi bi-save mx-2"></i>Guardar</button>
                                            
                                            <br></br>
                                            <button type="button" id='ChangePswBtn' className="btn btn-primary m-2 my-1" style={{width:"204px"}} onClick={this.ChangePsw} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            
                                            <i className="bi bi-unlock mx-2"></i>Cambiar contraseña
                                            </button>
                                            
                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">Cambiar Contraseña</h5>
                                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="form-floating m-2">
                                                            <input type="password" className="form-control" id="ActualPassword" placeholder="Password Actual" onBlur={this.ChangePsw}/>
                                                            <label htmlFor="floatingPassword">Password actual</label>
                                                        </div>
                                                        <div className="form-floating m-2">
                                                            <input type="password" className="form-control" id="NewPassword" placeholder="Nuevo Password"/>
                                                            <label htmlFor="floatingPassword">Password Nuevo</label>
                                                        </div>
                                                        <div className="form-floating m-2">
                                                            <input type="password" className="form-control" id="ConfirmPassword" placeholder="Confirmar Password" onBlur={this.ChangePsw}/>
                                                            <label htmlFor="floatingPassword">Confirmar Password</label>
                                                        </div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-warning" style={{maxWidth:"100px"}}  data-bs-dismiss="modal">Salir</button>
                                                        <button type="button" className="btn btn-primary" id="ChangePswbtnSave" style={{maxWidth:"100px"}} onClick={this.ChangePsw} data-bs-dismiss="modal">Cambiar</button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </center>
                                    </div> 
                                </div>

                            </div>
                        </form>
                    </div>   
                </div>
            </div>

        )
    }
}