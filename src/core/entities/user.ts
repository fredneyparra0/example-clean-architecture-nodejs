export function user(
    name: string,
    email: string,
    password: string,
    isDeleted: boolean,
    rol: string
) {
    return {
        getName: () => name,
        getEmail: () => email,
        getPassword: () => password,
        getIsDeleted: () => isDeleted,
        getRol: () => rol
    }
}