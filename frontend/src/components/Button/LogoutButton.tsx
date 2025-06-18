import { useRouter } from "next/compat/router";
import { signOut } from "@/features/actions/signout";
import styles from "./LogoutButton.module.css"
export const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await signOut();
        if(response.success){
            router?.push('/signin');
        }else{
            alert("Logout failed, please try again!")
        }
    };

    return <button 
    onClick={handleLogout}
    className={styles.button}> Sign out </button>
}