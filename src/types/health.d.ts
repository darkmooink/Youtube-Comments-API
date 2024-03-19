// Nested JSON object to indicate status of each service
// the API relies on.
export type statusJSON = {
    status: string
    server: {
        status: string
        details?: string
    }
    database: {
        status: string
        details?: string
    }
    youTube: {
        status: string
        details?: string
    }
}

export type serverStatus = {
    uptime: number
    responseTime: BigInt
}
