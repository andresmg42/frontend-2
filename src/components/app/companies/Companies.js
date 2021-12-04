import React, { useState, useEffect } from 'react'
import { deleteCompanieByIdF, getCompaniesF } from '../lib/request'
import { toast } from 'react-toastify'
import { sessionActive } from '../lib/functions'
import { Col, Row, Card, Modal, Button, Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Companies() {

    const [companies, setCompanies] = useState([]);
    const [ModalDelete, setModalDelete] = useState(false)
    const [idDelete, setIdDelete] = useState('')

    useEffect(() => {
        sessionActive();
        getCompanies();
    }, [])

    const getCompanies = async () => {
        //Obtener lista de Empresas
        const resCompanies = await getCompaniesF()
        if (resCompanies.data.status === 200) {
            setCompanies(resCompanies.data.data)
        } else {
            toast.error(resCompanies.data.msj)
        }
    }

    const deleteCompanie = async () => {
        const resDelete = await deleteCompanieByIdF(idDelete)
        if (resDelete.data.status === 200) {
            toast.success(resDelete.data.msj)
        } else {
            toast.error(resDelete.data.msj)
        }
        getCompanies()
    }

    return (
        <div className="page-content py-3">
            <Row>
                <Col>
                    <Card>
                        <Card.Header className="text-center d-sm-block d-md-flex justify-content-between align-items-center">
                            <h5>Lista de Empresas</h5>
                            <Link className="btn btn-success rounded-pill btn-sm" to="/companies/create" role="button"><i className="bi bi-building mx-2"></i>Nueva Empresa</Link>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {
                                    companies.map(companie => (
                                        <Col md={3} className="p-2" key={companie.IdEmpresa_PK}>
                                            <Card>
                                                <Card.Header className="d-flex align-items-center">
                                                    <h6 className="text-center w-100">{companie.Razon_Social}</h6>
                                                    <Dropdown>
                                                        <Dropdown.Toggle
                                                        as={'i'}
                                                        className="bi bi-three-dots-vertical"
                                                        >                                                                                                                        
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu as={"ul"}>
                                                            <Dropdown.Item as={"li"}>
                                                                <Link className="dropdown-item text-center" to={"/companies/edit/" + companie.IdEmpresa_PK}><i className="bi bi-pen me-3"></i>Editar</Link>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item as={"li"}>
                                                                <Link className="dropdown-item text-center" onClick={() => { setIdDelete(companie.IdEmpresa_PK); setModalDelete(true) }} to="/companies"><i className="bi bi-trash me-3"></i>Borrar</Link>
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </Card.Header>
                                                <Card.Body>
                                                    <p>
                                                        <span className="fw-bold">NIT: </span>
                                                        <span>{companie.IdEmpresa_PK}</span>
                                                    </p>
                                                    <p>
                                                        <span className="fw-bold">Representante Legal: </span>
                                                        <span>{companie.Representante_Legal}</span>
                                                    </p>
                                                    <p>
                                                        <span className="fw-bold">Persona Contacto: </span>
                                                        <span>{companie.Persona_Contacto}</span>
                                                    </p>
                                                    <p>
                                                        <span className="fw-bold">Telefono: </span>
                                                        <a className="text-black" href={"tel:" + companie.Telefono_Contacto}>{companie.Telefono_Contacto}</a>
                                                    </p>
                                                </Card.Body>                                               
                                            </Card>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>

                <Modal show={ModalDelete} onHide={() => { setModalDelete(false) }} centered>
                    <Modal.Header closeButton>
                        <h5>Eliminar Empresa</h5>
                    </Modal.Header>
                    <Modal.Body>
                        <p>¿Realmente desea eliminar la empresa {idDelete}?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => { setModalDelete(false) }}>
                            Cancelar
                        </Button>
                        <Button onClick={() => { deleteCompanie(); setModalDelete(false) }} >
                            Eliminar
                        </Button>
                    </Modal.Footer>
                </Modal>

            </Row>
        </div>
    )
}
