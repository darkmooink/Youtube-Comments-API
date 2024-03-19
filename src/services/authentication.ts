import { AuthToken } from '../models/authToken'

export async function authenticate(token: string): Promise<boolean> {
    let foundToken
    try {
        foundToken = await AuthToken.findOne({
            where: { token },
        })
    } catch {
        foundToken = false
    }

    return foundToken ? true : false
}
