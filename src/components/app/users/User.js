import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { deleteUserByIdF, EditingUserF, getCompaniesF, getUserByIdF, getUsersF, setPermissionF, CreateUserF } from '../lib/request'
import { sessionActive, decodeUserPermission, encodeUserPermission } from '../lib/functions'
import { Col, Row, Card, Button, Form, Modal, FloatingLabel, Table } from 'react-bootstrap'

export default function User() {

    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [IsEditing, setIsEditing] = useState(false);
    const [isView, setIsView] = useState(false);
    const [Title, setTitle] = useState();
    const [put, setPut] = useState(false);
    const [_delete, set_delete] = useState(false);
    const [post, setPost] = useState(false);
    const [idDelete, setIdDelete] = useState();
    const [search, setSearch] = useState();
    const [filterindItems, setFilterindItems] = useState([]);
    const [ModalUser, setModalUser] = useState(false);
    const [ModalRole, setModalRole] = useState(false);
    const [ModalDelete, setModalDelete] = useState(false);
    const [IdUser_PK, setIdUser_PK] = useState('')
    const [UserName, setUserName] = useState('')
    const [UserLastName, setUserLastName] = useState('')
    const [IdCompany_FK, setIdCompany_FK] = useState('')
    const [UserEmail, setUserEmail] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        sessionActive();
        getUsers();
        getCompanies();
        Permissions();
    }, [])

    const getUsers = async () => {
        //Obtener lista de usuarios
        const resUsers = await getUsersF();
        if (resUsers.data.status === 200) {
            setUsers(resUsers.data.data)
            setFilterindItems(resUsers.data.data)
        } else {
            toast.error(resUsers.data.msj)
        }
    }

    const getCompanies = async () => {
        //Obtener lista de Empresas
        const resCompanies = await getCompaniesF()
        if (resCompanies.data.status === 200) {
            setCompanies(resCompanies.data.data)
            setIdCompany_FK(resCompanies.data.data[0].IdEmpresa_PK)
        } else {
            toast.error(resCompanies.data.msj)
        }
    }

    const Permissions = () => {
        //Obtener Permisos de Usuario
        const resPermission = decodeUserPermission(localStorage.getItem("userPermission"), localStorage.getItem("IdUser_PK"))

        if ( resPermission.superAdmin.access) {
            setPut(true); set_delete(true); setPost(true);
        } else {
            setPut(resPermission.user.PUT);
            set_delete(resPermission.user.DELETE);
            setPost(resPermission.user.POST);
        }
    }

    const CreateUser = () => {
        setIdUser_PK('')
        setIdCompany_FK(companies[0].IdEmpresa_PK)
        setUserName('')
        setUserLastName('')
        setUserEmail('')
        setAvatar('')
        setIsEditing(false)
        setIsView(false)
        setTitle('Crear Nuevo Usuario')
    }

    const InactiveUser = async () => {
        const resUser = await getUserByIdF('IdUser_PK', idDelete)
        const MyRollDecryp = decodeUserPermission(localStorage.getItem('maxRoll'), localStorage.getItem('IdUser_PK')).value
        const RollUserDecryp = decodeUserPermission(resUser.data.data[0].maxRoll, idDelete).value

        if (MyRollDecryp > RollUserDecryp) {
            const resDelele = await deleteUserByIdF(idDelete)
            if (resDelele.data.status === 200) {
                toast.success(resDelele.data.msj)
            } else {
                toast.error(resDelele.data.msj)
            }
            getUsers()
        } else {
            toast.error('No tiene autorización para esta acción')
        }
    }

    const UpdateUser = async (id) => {
        const resUser = await getUserByIdF('IdUser_PK', id)
        if (resUser.data.status === 200) {
            setIdUser_PK(resUser.data.data[0].IdUser_PK)
            setUserName(resUser.data.data[0].UserName)
            setUserLastName(resUser.data.data[0].UserLastName)
            setIdCompany_FK(resUser.data.data[0].IdCompany_FK)
            setUserEmail(resUser.data.data[0].UserEmail)
            setAvatar(resUser.data.data[0].avatar)
            setIsView(false)
            setIsEditing(true)
            setTitle('Editar Usuario')
        } else {
            toast.error(resUser.data.msj)
        }
    }

    const ShowUser = async (id) => {
        const resUser = await getUserByIdF('IdUser_PK', id)
        if (resUser.data.status === 200) {
            setIdUser_PK(resUser.data.data[0].IdUser_PK)
            setUserName(resUser.data.data[0].UserName)
            setUserLastName(resUser.data.data[0].UserLastName)
            setIdCompany_FK(resUser.data.data[0].IdCompany_FK)
            setUserEmail(resUser.data.data[0].UserEmail)
            setAvatar(resUser.data.data[0].avatar)
            setIsView(true)
            setIsEditing(false)
            setTitle('Visualizar Usuario')
        } else {
            toast.error(resUser.data.msj)
        }
    }

    const OnSubmitUser = async (e) => {
        e.preventDefault();
        if (IsEditing) {
            const resUser = await getUserByIdF('IdUser_PK', IdUser_PK)
            const MyRollDecryp = decodeUserPermission(localStorage.getItem('maxRoll'), localStorage.getItem('IdUser_PK')).value
            const RollUserDecryp = decodeUserPermission(resUser.data.data[0].maxRoll, IdUser_PK).value
            if (MyRollDecryp > RollUserDecryp) {
                const resEditing = await EditingUserF(IdUser_PK,
                    UserName,
                    UserLastName,
                    IdCompany_FK,
                    UserEmail,
                    avatar)
                if (resEditing.data.status === 200) {
                    toast.success(resEditing.data.msj)
                    setModalUser(false)
                } else {
                    toast.error(resEditing.data.msj)
                    setModalUser(false)
                }
            }else{
                toast.error('No tiene permiso para esta acción')
                setModalUser(false)
            }
        }else{
            const resCreate = await CreateUserF(IdUser_PK,
                UserName,
                UserLastName,
                IdCompany_FK,
                UserEmail,
                avatar)
            if (resCreate.data.status === 200) {
                toast.success(resCreate.data.msj)
                setModalUser(false)
            } else {
                toast.error(resCreate.data.msj)
                setModalUser(false)
            }
        }
        getUsers()
    }

    const UserPermissions = async (id) => {
        //Establece todos los check a false
        defaultuserPermission()

        //Asingar Roles según id del usuario
        setIdUser_PK(id)
        const resUser = await getUserByIdF('IdUser_PK', id)
        const decryp = decodeUserPermission(resUser.data.data[0].userPermission, id)
        const objArray = Object.entries(decryp)
        let i=-30
        const MyRollDecryp = decodeUserPermission(localStorage.getItem('maxRoll'), localStorage.getItem('IdUser_PK')).value
        objArray.forEach(([key, value]) => {
            if (value.access) document.getElementById(key).checked = true
            if (value.POST) document.getElementById(key + 'post').checked = true
            if (value.PUT) document.getElementById(key + 'put').checked = true
            if (value.DELETE) document.getElementById(key + 'delete').checked = true
            if(MyRollDecryp<=i){
                document.getElementById(key).setAttribute("type", 'hidden')
                document.getElementById(key + 'post').setAttribute("type", 'hidden')
                document.getElementById(key + 'put').setAttribute("type", 'hidden')
                document.getElementById(key + 'delete').setAttribute("type", 'hidden')
            }
            // se encrementa para recorrer roles Rol 70 no existe
            i===60? i+=20:i+=10;
            console.log(i)
        })

        //Asigna estados de los check
        document.querySelectorAll(".form-switch input").forEach(i => {
            EnabledCheck(i)
        });
        //deshabilita roles superiores
    
        
       

    






    }

    const EnabledCheck = (e) => {
        var inputCheck = e

        if (e.target !== undefined) {
            inputCheck = e.target
        }

        if (inputCheck.checked) {
            document.getElementById(inputCheck.id + 'post').disabled = false
            document.getElementById(inputCheck.id + 'put').disabled = false
            document.getElementById(inputCheck.id + 'delete').disabled = false
        }
        else {
            document.getElementById(inputCheck.id + 'post').disabled = true
            document.getElementById(inputCheck.id + 'put').disabled = true
            document.getElementById(inputCheck.id + 'delete').disabled = true
            document.getElementById(inputCheck.id + 'post').checked = false
            document.getElementById(inputCheck.id + 'put').checked = false
            document.getElementById(inputCheck.id + 'delete').checked = false
        }
    }

    const defaultuserPermission = () => {
        document.querySelectorAll(".form-check-input").forEach(i => {
            i.checked = false
        });
    }

    const OnSubmitPermission = async (e) => {
        e.preventDefault();

        const array = {user: {
            access: document.getElementById('user').checked,
            PUT: document.getElementById('userput').checked,
            DELETE: document.getElementById('userdelete').checked,
            POST: document.getElementById('userpost').checked
        },
        companies: {
            access: document.getElementById('companies').checked,
            PUT: document.getElementById('companiesput').checked,
            DELETE: document.getElementById('companiesdelete').checked,
            POST: document.getElementById('companiespost').checked
        },
        employes: {
            access: document.getElementById('employes').checked,
            PUT: document.getElementById('employesput').checked,
            DELETE: document.getElementById('employesdelete').checked,
            POST: document.getElementById('employespost').checked
        },
            client: {
                access: document.getElementById('client').checked,
                PUT: document.getElementById('clientput').checked,
                DELETE: document.getElementById('clientdelete').checked,
                POST: document.getElementById('clientpost').checked
            },
            commercial: {
                access: document.getElementById('commercial').checked,
                PUT: document.getElementById('commercialput').checked,
                DELETE: document.getElementById('commercialdelete').checked,
                POST: document.getElementById('commercialpost').checked
            },
            logistic: {
                access: document.getElementById('logistic').checked,
                PUT: document.getElementById('logisticput').checked,
                DELETE: document.getElementById('logisticdelete').checked,
                POST: document.getElementById('logisticpost').checked
            },
            technical: {
                access: document.getElementById('technical').checked,
                PUT: document.getElementById('technicalput').checked,
                DELETE: document.getElementById('technicaldelete').checked,
                POST: document.getElementById('technicalpost').checked
            },
            leader: {
                access: document.getElementById('leader').checked,
                PUT: document.getElementById('leaderput').checked,
                DELETE: document.getElementById('leaderdelete').checked,
                POST: document.getElementById('leaderpost').checked
            },
            
            humanTalent: {
                access: document.getElementById('humanTalent').checked,
                PUT: document.getElementById('humanTalentput').checked,
                DELETE: document.getElementById('humanTalentdelete').checked,
                POST: document.getElementById('humanTalentpost').checked
            },
            manager: {
                access: document.getElementById('manager').checked,
                PUT: document.getElementById('managerput').checked,
                DELETE: document.getElementById('managerdelete').checked,
                POST: document.getElementById('managerpost').checked
            },
            admin: {
                access: document.getElementById('admin').checked,
                PUT: document.getElementById('adminput').checked,
                DELETE: document.getElementById('admindelete').checked,
                POST: document.getElementById('adminpost').checked
            },
            superAdmin: {
                access: document.getElementById('superAdmin').checked,
                PUT: document.getElementById('superAdminput').checked,
                DELETE: document.getElementById('superAdmindelete').checked,
                POST: document.getElementById('superAdminpost').checked
            },
        }

        const resUser = await getUserByIdF('IdUser_PK', IdUser_PK)
        const MyRollDecryp = decodeUserPermission(localStorage.getItem('maxRoll'), localStorage.getItem('IdUser_PK')).value
        const RollUserDecryp = decodeUserPermission(resUser.data.data[0].maxRoll, IdUser_PK).value

        if (MyRollDecryp > RollUserDecryp) {
            const Encryp = encodeUserPermission(array, IdUser_PK)
            const resPermission = await setPermissionF(Encryp, IdUser_PK)
            if (resPermission.data.status === 200) {
                toast.success(resPermission.data.msj)
                setModalRole(false)
            } else {
                toast.error(resPermission.data.msj)
                setModalRole(false)
            }
        } else {
            toast.error('No tiene permisos para esta acción')
            setModalRole(false)
        }
        getUsers()
    }

    const OnFilter = (e) => {
        let FilterText = e.target.value;
        setSearch(FilterText)
        setFilterindItems(users.filter(
            (user) => (
                user.IdUser_PK.includes(FilterText) ||
                user.UserName.toLowerCase().includes(FilterText.toLowerCase()) ||
                user.UserLastName.toLowerCase().includes(FilterText.toLowerCase()) ||
                user.UserEmail.toLowerCase().includes(FilterText.toLowerCase()) ||
                user.IdCompany_FK.toLowerCase().includes(FilterText.toLowerCase()) ||
                decodeUserPermission(user.maxRoll, user.IdUser_PK).name.toLowerCase().includes(FilterText.toLowerCase())
            )
        ))

        console.log(filterindItems)
    }

    const ClearSearch = () => {
        setSearch('')
        setFilterindItems(users)
    }


    const columns = [
        {
            name: 'Rol',
            cell: (row) => <div onClick={() => { ShowUser(row.IdUser_PK); setModalUser(true) }} data-tag="allowRowEvents">{decodeUserPermission(row.maxRoll, row.IdUser_PK).name}</div>,
            selector: row => row.maxRoll,
            sortable: true,
        },
        {
            name: 'Usuario',
            cell: (row) => <div onClick={() => { ShowUser(row.IdUser_PK); setModalUser(true) }} data-tag="allowRowEvents">{row.IdUser_PK}</div>,
            selector: row => row.IdUser_PK,
            sortable: true,
        },
        {
            name: 'Nombres',
            cell: (row) => <div onClick={() => { ShowUser(row.IdUser_PK); setModalUser(true) }} data-tag="allowRowEvents">{row.UserName}</div>,
            selector: row => row.UserName,
            sortable: true,
        },
        {
            name: 'Apellidos',
            cell: (row) => <div onClick={() => { ShowUser(row.IdUser_PK); setModalUser(true) }} data-tag="allowRowEvents">{row.UserLastName}</div>,
            selector: row => row.UserLastName,
            sortable: true,
        },
        {
            name: 'Empresa',
            cell: (row) => <div onClick={() => { ShowUser(row.IdUser_PK); setModalUser(true) }} data-tag="allowRowEvents">{row.IdCompany_FK}</div>,
            selector: row => row.IdCompany_FK,
            sortable: true,
        },
        {
            name: 'Correo Electrónico',
            cell: (row) => <div onClick={() => { ShowUser(row.IdUser_PK); setModalUser(true) }} data-tag="allowRowEvents">{row.UserEmail}</div>,
            selector: row => row.UserEmail,
            sortable: true,
            grow: 1.5
        },
        {
            name: 'Acciones',
            cell: (row) => <div className="tabla dropdown dropstart">
                <i className="bi bi-three-dots-vertical" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"></i>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link onClick={() => { UpdateUser(row.IdUser_PK); setModalUser(true) }} className={"dropdown-item text-center border-end" + (!put || row.IdUser_PK === localStorage.getItem('IdUser_PK') ? ' disabled' : "")} to="/users"><i className="bi bi-pen me-3 "></i>Editar</Link></li>
                    <li><Link className={"dropdown-item text-center border-end" + (!_delete || row.IdUser_PK === localStorage.getItem('IdUser_PK') ? ' disabled' : "")} to="/users" onClick={() => { setIdDelete(row.IdUser_PK); setModalDelete(true) }}><i className="bi bi-trash me-3"></i>Borrar</Link></li>
                    <li><Link onClick={() => { UserPermissions(row.IdUser_PK); setModalRole(true) }} className={"dropdown-item text-center" + (!put || row.IdUser_PK === localStorage.getItem('IdUser_PK') ? ' disabled' : "")} to="/users"><i className="bi bi-key me-3"></i>Roles</Link></li>
                </ul>
            </div>,
            button: true,
        },
    ];

    const Roles = [
        {
            id: 'user',
            name: 'Usuarios'
        },
        {
            id: 'companies',
            name: 'Empresas'
        },
        {
            id: 'employes',
            name: 'Empleado'
        },
        {
            id: 'client',
            name: 'Cliente'
        },  {
            id: 'commercial',
            name: 'Comercial'
        },
       
        {
            id: 'logistic',
            name: 'Logística'
        },
        {
            id: 'technical',
            name: 'Técnico'
        },
        {
            id: 'leader',
            name: 'Lider'
        },
       {
            id: 'humanTalent',
            name: 'Talento Humano'
        },
        {
            id: 'manager',
            name: 'Gerente'
        },
        {
            id: 'admin',
            name: 'Administrador'
        },
        {
            id: 'superAdmin',
            name: 'SuperAdmin'
        },
    ]

    return (
        <div className="page-content py-3">
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="text-center d-sm-block d-md-flex justify-content-between align-items-center">
                            <h5>Usuarios del Sistema</h5>
                            <Button variant="success" className="rounded-pill btn-sm ms-1" disabled={post ? false : true} onClick={() => { CreateUser(); setModalUser(true) }}><i className="bi bi-person-plus mx-2"></i>Crear Usuario</Button>
                        </Card.Header>
                        <Card.Body>
                            <Col className="d-flex">
                                <Form.Control
                                    type="text"
                                    id="search"
                                    placeholder="Búsqueda"
                                    aria-label="search input"
                                    value={search}
                                    onChange={OnFilter}
                                />
                                <Button data-tip="Limpiar Filtro" className="btn btn-success btn-sm" type="button" onClick={ClearSearch}>
                                    <i className="bi bi-arrow-counterclockwise"></i>
                                </Button>
                            </Col>
                            <Row>
                                <DataTable
                                    columns={columns}
                                    data={filterindItems}
                                    pagination
                                    responsive
                                    highlightOnHover
                                    pointerOnHover
                                    noDataComponent="No hay registros para mostrar"
                                    paginationComponentOptions={{
                                        rowsPerPageText: 'Filas por página:',
                                        rangeSeparatorText: 'de'
                                    }}
                                />
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={ModalUser} onHide={() => { setModalUser(false) }} centered>
                <Form onSubmit={OnSubmitUser}>
                    <Modal.Header closeButton>
                        <h5 className="modal-title" id="UserModalLabel">{Title}</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <FloatingLabel
                                    controlId="IdUser_PK"
                                    label="Identificación"
                                    className="mb-3">
                                    <Form.Control type="text"
                                        name="IdUser_PK"
                                        placeholder="Identificación"
                                        className="form-control"
                                        onChange={(e) => { setIdUser_PK(e.target.value) }}
                                        value={IdUser_PK}
                                        required
                                        disabled={IsEditing || isView ? true : false}>
                                    </Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <FloatingLabel controlId="IdCompany_FK"
                                    label="Empresa"
                                    className="mb-3">
                                    <Form.Select name="IdCompany_FK"
                                        onChange={(e) => { setIdCompany_FK(e.target.value) }}
                                        value={IdCompany_FK}
                                        disabled={isView ? true : false}>
                                        {
                                            companies.map(companie => {
                                                return (
                                                    <option
                                                        value={companie.IdEmpresa_PK}
                                                        key={companie.IdEmpresa_PK}>
                                                        {companie.IdEmpresa_PK}
                                                    </option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel controlId="UserName"
                                    label="Nombres"
                                    className="mb-3">
                                    <Form.Control name="UserName"
                                        placeholder="Nombres"
                                        className="form-control"
                                        onChange={(e) => { setUserName(e.target.value) }}
                                        value={UserName}
                                        required
                                        disabled={isView ? true : false}>
                                    </Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel controlId="UserLastName"
                                    label="Apellidos"
                                    className="mb-3">
                                    <Form.Control type="text"
                                        name="UserLastName"
                                        placeholder="Apellidos"
                                        className="form-control"
                                        onChange={(e) => { setUserLastName(e.target.value) }}
                                        value={UserLastName}
                                        required
                                        disabled={isView ? true : false}>
                                    </Form.Control>
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel controlId="UserEmail"
                                    label="Correo Electrónico"
                                    className="mb-3">
                                    <Form.Control type="email"
                                        name="UserEmail"
                                        placeholder="Correo Electrónico"
                                        className="form-control"
                                        onChange={(e) => { setUserEmail(e.target.value) }}
                                        value={UserEmail}
                                        required
                                        disabled={isView ? true : false}>
                                    </Form.Control>
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" style={{ display: isView ? 'none' : 'inline-block' }} variant="success">
                            <i className="bi bi-save me-2"></i>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={ModalRole} onHide={() => { setModalRole(false) }} centered size="lg">
                <Form onSubmit={OnSubmitPermission}>
                    <Modal.Header closeButton>
                        <h5>Administración de Roles</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <Table>
                            <thead>
                                <tr>
                                    <th style={{ width: '15%' }}>Acceso</th>
                                    <th style={{ width: '40%' }}>Perfil</th>
                                    <th style={{ width: '15%' }}>Crear</th>
                                    <th style={{ width: '15%' }}>Editar</th>
                                    <th style={{ width: '15%' }}>Borrar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Roles.map(item => (
                                        <tr key={item.id}>
                                            <td>
                                                <Form.Check
                                                    className="form-switch"
                                                    onChange={EnabledCheck}
                                                    type="checkbox" role="switch" id={item.id}
                                                />
                                            </td>
                                            <td>{item.name}</td>
                                            <td>
                                                <Form.Check
                                                    type="checkbox" id={item.id + 'post'}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    type="checkbox" id={item.id + 'put'}
                                                />
                                            </td>
                                            <td>
                                                <Form.Check
                                                    type="checkbox" id={item.id + 'delete'}
                                                />
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="success">
                            <i className="bi bi-save me-2"></i>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            <Modal show={ModalDelete} onHide={() => { setModalDelete(false) }} centered>
                <Modal.Header closeButton>
                    <h5>Eliminar Usuario</h5>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Realmente desea eliminar el usuario {idDelete}?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { setModalDelete(false) }}>
                        Cancelar
                    </Button>
                    <Button onClick={() => { InactiveUser(); setModalDelete(false) }} >
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
