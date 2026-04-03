import ProfilInput from "../../../components/FieldInput/ProfilInput.jsx";

import UsersIcons from '../../../assets/icons/home/profil.svg?react';
import EmailIcons from '../../../assets/icons/profil/email.svg?react';
import LockIcons from '../../../assets/icons/profil/lock.svg?react';

function OngletInfo({user,onValid})
{
    return(
        <>
            <ProfilInput name={"Nom d'utilisateur"} icon={<UsersIcons />} value={user.username} onValid={(value) => onValid("username", value)}/>
            <ProfilInput name={"Adresse mail"} icon={<EmailIcons />} value={user.email} onValid={(value) => onValid("email", value)}/>
            <ProfilInput name={"Mot de passe"} icon={<LockIcons />} password={true} value={"votre_mot_de_passe"} onValid={(value) => onValid("password", value)}/>
        </>
    )
}

export default OngletInfo;