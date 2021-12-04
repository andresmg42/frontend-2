import axios from 'axios'
import ApiURL from '../../../services/apirest'

export const getUsersF = async () => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const res = await axios.get(ApiURL + 'user', config)
    return res
}

export const getCompaniesF = async () => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const res = await axios.get(ApiURL + 'companies', config)
    return res
}

export const getCompanieByIdF = async (id) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const res = await axios.get(ApiURL + 'companies/' + id, config)
    return res
}

export const deleteUserByIdF = async (id) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
        data: {
            IdUser_PK: id
        }
    }
    const res = await axios.delete(ApiURL + 'user/', config)
    return res
}

export const getUserByIdF = async (ColumnName, Value) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const data = {
        ColumnName: ColumnName,
        Value: Value
    }
    const res = await axios.post(ApiURL + 'user/getById', data, config)
    return res
}

export const EditingUserF = async (IdUser_PK, UserName, UserLastName, IdCompany_FK, UserEmail, avatar) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const data = {
        IdUser_PK: IdUser_PK,
        UserName: UserName,
        UserLastName: UserLastName,
        IdCompany_FK: IdCompany_FK,
        UserEmail: UserEmail,
        avatar: avatar,
    }
    const res = await axios.put(ApiURL + 'user', data, config)
    return res
}

export const CreateUserF = async (IdUser_PK, UserName, UserLastName, IdCompany_FK, UserEmail, avatar) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const data = {
        IdUser_PK: IdUser_PK,
        UserName: UserName,
        UserLastName: UserLastName,
        IdCompany_FK: IdCompany_FK,
        UserEmail: UserEmail,
        avatar: avatar,
    }
    const res = await axios.post(ApiURL + 'user', data, config)
    return res
}

export const setPermissionF = async (Encryp, IdUser_PK) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const data = {
        userPermission: Encryp,
        IdUser_PK: IdUser_PK
    }
    const res = await axios.put(ApiURL + 'user', data, config)
    return res
}

export const CreateCompanieF = async (IdEmpresa_PK, Razon_Social, Representante_Legal, Actividad_Economica, Persona_Contacto, Telefono_Contacto) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const data = {
        IdEmpresa_PK: IdEmpresa_PK,
        Razon_Social: Razon_Social,
        Representante_Legal: Representante_Legal,
        Actividad_Economica: Actividad_Economica,
        Persona_Contacto: Persona_Contacto,
        Telefono_Contacto: Telefono_Contacto,
    }
    const res = await axios.post(ApiURL + 'companies', data, config)
    return res
}

export const EditingCompanieF = async (IdEmpresa_PK, Razon_Social, Representante_Legal, Actividad_Economica, Persona_Contacto, Telefono_Contacto) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },
    }
    const data = {
        IdEmpresa_PK: IdEmpresa_PK,
        Razon_Social: Razon_Social,
        Representante_Legal: Representante_Legal,
        Actividad_Economica: Actividad_Economica,
        Persona_Contacto: Persona_Contacto,
        Telefono_Contacto: Telefono_Contacto,
    }
    const res = await axios.put(ApiURL + 'companies', data, config)
    return res
}

export const deleteCompanieByIdF = async (id) => {
    const config = {
        headers: { 'x-access-token': localStorage.getItem('TOKEN') },        
    }
    const res = await axios.delete(ApiURL + 'companies/'+id, config)
    return res
}