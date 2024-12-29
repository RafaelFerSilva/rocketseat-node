// middleware é um função que intercepta uma requisição. Sempre recebe o req e o res.

export async function json(req, res) {
    const buffers = []

    // Percorrer toda a stream e só seguir depois de captar todos os dados
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    try {
        req.body = JSON.parse(Buffer.concat(buffers).toString())
    } catch {
        req.body = null
    }

    res.setHeader('Content-type', 'application/json')
}