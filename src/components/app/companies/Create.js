import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { sessionActive } from '../lib/functions'
import { getCompanieByIdF, CreateCompanieF, EditingCompanieF } from '../lib/request'
import { Col, Row, FloatingLabel, Accordion, Button, Card, Form, ButtonGroup } from 'react-bootstrap'


export default function Create() {

    const [IsEditing, setIsEditing] = useState(false)
    const [IdEmpresa_PK, setIdEmpresa_PK] = useState('')
    const [Razon_Social, setRazon_Social] = useState('')
    const [Representante_Legal, setRepresentante_Legal] = useState('')
    const [Actividad_Economica, setActividad_Economica] = useState('')
    const [Persona_Contacto, setPersona_Contacto] = useState('')
    const [Telefono_Contacto, seTTelefono_Contacto] = useState('')
    const [Tittle, setTittle] = useState('Crear Nueva Empresa')

    useEffect(() => {
        sessionActive();
        getCompanie();
    }, [])

    const match = useRouteMatch({
        path: "/companies/edit/:id",
        strict: true,
        sensitive: true
    });

    const history = useHistory(
        
    )

    const getCompanie = async () => {
        if (match !== null) {            
            if (match.params.id) {
                const resCompanie = await getCompanieByIdF(match.params.id)
                setIsEditing(true)
                setIdEmpresa_PK(match.params.id)
                setRazon_Social(resCompanie.data.data[0].Razon_Social)
                setRepresentante_Legal(resCompanie.data.data[0].Representante_Legal)
                setActividad_Economica(resCompanie.data.data[0].Actividad_Economica)
                setPersona_Contacto(resCompanie.data.data[0].Persona_Contacto)
                seTTelefono_Contacto(resCompanie.data.data[0].Telefono_Contacto)
                setTittle('Modo Edición')
                toast.success(resCompanie.data.msj)
            }
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if (IsEditing) {
            const resCompanie = await EditingCompanieF(
                IdEmpresa_PK,
                Razon_Social,
                Representante_Legal,
                Actividad_Economica,
                Persona_Contacto,
                Telefono_Contacto
            )            
            if (resCompanie.data.status===200) {
                toast.success(resCompanie.data.msj)
            } else {
                toast.error(resCompanie.data.msj)
            }
        } else {
            const resCompanie = await CreateCompanieF(
                IdEmpresa_PK,
                Razon_Social,
                Representante_Legal,
                Actividad_Economica,
                Persona_Contacto,
                Telefono_Contacto
            )            
            if (resCompanie.data.status===200) {
                toast.success(resCompanie.data.msj)
            } else {
                toast.error(resCompanie.data.msj)
            }
        }
        history.push("/companies")       
    }

    return (
        <div className="page-content py-3">
            <Form onSubmit={onSubmit}>
                <Card>
                    <Card.Header className="text-center d-sm-block d-md-flex justify-content-between align-items-center">
                        <h5>{Tittle}</h5>
                        <ButtonGroup>
                            <Link to="/companies" className="btn btn-danger my-2 me-2 rounded-pill btn-sm">
                                <i className="bi bi-x-lg me-2"></i>
                                Cancelar
                            </Link>
                            <Button type="submit" className="btn btn-success my-2 rounded-pill btn-sm">
                                <i className="bi bi-save me-2"></i>
                                Guardar
                            </Button>
                        </ButtonGroup>
                    </Card.Header>
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>
                                    {'Información de la Empresa ' + Razon_Social}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId="IdEmpresa_PK"
                                                label="NIT"
                                                className="mb-3">
                                                <Form.Control type="text"
                                                    name="IdEmpresa_PK"
                                                    placeholder="NIT"
                                                    className="form-control"
                                                    required
                                                    value={IdEmpresa_PK}
                                                    disabled={IsEditing ? true : false}
                                                    onChange={(e) => { setIdEmpresa_PK(e.target.value) }}
                                                >
                                                </Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId="Razon_Social"
                                                label="Razón Social"
                                                className="mb-3">
                                                <Form.Control type="text"
                                                    name="Razon_Social"
                                                    placeholder="Razón Social"
                                                    className="form-control"
                                                    value={Razon_Social}
                                                    required
                                                    onChange={(e) => { setRazon_Social(e.target.value) }}
                                                >
                                                </Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId="Representante_Legal"
                                                label="Representante Legal"
                                                className="mb-3">
                                                <Form.Control type="text"
                                                    name="Representante_Legal"
                                                    placeholder="Representante Legal"
                                                    className="form-control"
                                                    value={Representante_Legal}
                                                    required
                                                    onChange={(e) => { setRepresentante_Legal(e.target.value) }}
                                                >
                                                </Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId="Actividad_Economica"
                                                label="Actividad Economica"
                                                className="mb-3">
                                                <Form.Control type="text"
                                                    name="Actividad_Economica"
                                                    placeholder="Actividad Economica"
                                                    className="form-control"
                                                    value={Actividad_Economica}
                                                    required
                                                    onChange={(e) => { setActividad_Economica(e.target.value) }}
                                                >
                                                </Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId="Persona_Contacto"
                                                label="Persona de Contacto"
                                                className="mb-3">
                                                <Form.Control type="text"
                                                    name="Persona_Contacto"
                                                    placeholder="Persona de Contacto"
                                                    className="form-control"
                                                    value={Persona_Contacto}
                                                    required
                                                    onChange={(e) => { setPersona_Contacto(e.target.value) }}
                                                >
                                                </Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                        <Col md={6}>
                                            <FloatingLabel
                                                controlId="Telefono_Contacto"
                                                label="Teléfono Contacto"
                                                className="mb-3">
                                                <Form.Control type="text"
                                                    name="Telefono_Contacto"
                                                    placeholder="Teléfono Contacto"
                                                    className="form-control"
                                                    value={Telefono_Contacto}
                                                    required
                                                    onChange={(e) => { seTTelefono_Contacto(e.target.value) }}
                                                >
                                                </Form.Control>
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
            </Form>
        </div>
    )
}
