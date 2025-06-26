import { useRouter } from "next/compat/router";
import { signOut } from "@/features/actions/signout";
import styles from "./LogoutButton.module.css"
export const LogoutButton = () => {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await signOut();
            console.log(response.success);
            if(response.success) {
            router?.push('/signin');
            }

        } catch (error) {
            throw new Error('Failed to sign out');
        }
    };

    return <button
        onClick={handleLogout}
        className={styles.button}> Sign out </button>
}