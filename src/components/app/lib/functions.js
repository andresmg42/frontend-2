import axios from "axios";
import crypto from "crypto-js";
import ApiURL from "../../../services/apirest";

export const encodeUserPermission = (JSONRoles, key) => {
    try {
        return crypto.AES.encrypt(JSON.stringify(JSONRoles), key).toString();        
    } catch (error) {
        localStorage.clear()
        window.location.reload()
    }
};

export const decodeUserPermission = (encryptedRoles, key) => {
    try {
        return JSON.parse(crypto.AES.decrypt(encryptedRoles.toString(), key).toString(crypto.enc.Utf8));        
    } catch (error) {
        localStorage.clear()
        window.location.reload()
    }
};

export const sessionActive = async ()=>{
    try {
        const config = {
            headers: { 'x-access-token': localStorage.getItem('TOKEN') },
        }
        const data = {
            IdUser_PK: localStorage.getItem('IdUser_PK'),   }    
    
        const res = await axios.post(ApiURL+'auth/isSignin',data,config)    
        
        if(res.data.status===200){
            return true
        }else{
            localStorage.clear()
            window.location.reload()
        }        
    } catch (error) {
        localStorage.clear()
        window.location.reload()
    }
}