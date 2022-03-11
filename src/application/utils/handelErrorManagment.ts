type ErrorTypes = 'fields empty' | 'already registered' | 'not authorized';

export function manageHandelError(errorMessage: ErrorTypes ) {
    let errorReturn;
    switch(errorMessage) {
        case 'fields empty':
            errorReturn = { errorMessage: 'fields empty', code: '001A' }
            break;
        case 'already registered':
            errorReturn = { errorMessage: 'already registered', code: '001B' }
            break;
        case 'not authorized':
            errorReturn = { errorMessage: 'not authorized', code: '001C' }
            break;
        default:
            errorReturn = { errorMessage: 'not found', code: '0000' }
    }
    return errorReturn;
}

// export class UserInputEmptyError extends Error {  
//     constructor (message: string) {
//         super(message)
//         this.name = this.constructor.name
//     }
// }