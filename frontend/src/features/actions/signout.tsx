export const signOut = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });
    const responseData = response.json();
    if (!responseData) {
        throw new Error('Failed to sign out');
    }
    return {
        success: true,
        message: 'Sign out successful',
    }
}