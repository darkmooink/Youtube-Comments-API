import request from 'supertest'
import { app } from '../app'
import * as auth from '../services/authentication'
import { baseUrl } from '../routes/routes'

jest.mock('../services/authentication')

afterEach(() => {
    jest.clearAllMocks()
})

describe('authenicate api keys', () => {
    test('Returns a 2xx code with a good api key', async () => {
        // Arrange
        jest.spyOn(auth, 'authenticate').mockReturnValue(true)
        // Act
        const res = await request(app).get(`${baseUrl}/`)
        // Assert
        expect(res.statusCode).toBeGreaterThanOrEqual(200)
        expect(res.statusCode).toBeLessThan(300)
    })    
    test('Returns a 401 code with a bad api key', async () => {
        // Arrange
        jest.spyOn(auth, 'authenticate').mockReturnValue(false)
        // Act
        const res = await request(app).get(`${baseUrl}/`)
        // Assert
        expect(res.statusCode).toBe(401)
        expect(res.body).toBe('error')
    })

    
})
