const request = require('supertest')
const {URLS} = require('../../suporte/configEnv')
const { faker } = require('@faker-js/faker');
let idConteudoCadastrado;

describe('Validação da rota de cadastro de conteúdos.', ()=>{
    
    const payload_post_conteudos = {
        titulo: faker.lorem.words(10),
        descricao: faker.lorem.lines(10),
        tipoConteudo: faker.lorem.words(3),
        conteudo: faker.lorem.lines(12)
    };

    const payload_put_conteudos = {
        titulo: faker.lorem.words(7),
        descricao: faker.lorem.lines(5),
        tipoConteudo: faker.lorem.words(1),
        conteudo: faker.lorem.lines(8)
    };
    it('Cadastra um novo conteúdo e verificar retorno e statusCode', async ()=>{
        const response = await request(URLS.ROTA_ENDPOINT).post(`/${URLS.ROTA_CONTEUDOS}`).send(payload_post_conteudos)
        const { titulo, descricao, tipoConteudo, conteudo } = response.body;

        expect(titulo).toBe(payload_post_conteudos.titulo);
        expect(descricao).toBe(payload_post_conteudos.descricao);
        expect(tipoConteudo).toBe(payload_post_conteudos.tipoConteudo);
        expect(conteudo).toBe(payload_post_conteudos.conteudo);
        expect(response.status).toBe(201);
        idConteudoCadastrado = response.body.id
    })

    it('Consulta conteúdo e verificar retorno e dados', async ()=>{
        const response = await request(URLS.ROTA_ENDPOINT).get(`/${URLS.ROTA_CONTEUDOS}/${idConteudoCadastrado}`)

        expect(response.body.id).toBe(idConteudoCadastrado)
        expect(response.body.titulo).toBe(payload_post_conteudos.titulo)
        expect(response.body.descricao).toBe(payload_post_conteudos.descricao)
        expect(response.body.tipoConteudo).toBe(payload_post_conteudos.tipoConteudo)
        expect(response.body.conteudo).toBe(payload_post_conteudos.conteudo)
        expect(response.status).toBe(200)
    })

    it('Alterar conteúdo e verificar dados alterados', async ()=>{
        const response = await request(URLS.ROTA_ENDPOINT).put(`/${URLS.ROTA_CONTEUDOS}/${idConteudoCadastrado}`).send(payload_put_conteudos)

            expect(response.body.titulo).toBe(payload_put_conteudos.titulo)
            expect(response.body.descricao).toBe(payload_put_conteudos.descricao)
            expect(response.body.tipoConteudo).toBe(payload_put_conteudos.tipoConteudo)
            expect(response.body.conteudo).toBe(payload_put_conteudos.conteudo)
            expect(response.status).toBe(201)

            const secondResponse = await request(URLS.ROTA_ENDPOINT).get(`/${URLS.ROTA_CONTEUDOS}/${idConteudoCadastrado}`)

            expect(secondResponse.body.id).toBe(idConteudoCadastrado)
            expect(secondResponse.body.titulo).toBe(payload_put_conteudos.titulo)
            expect(secondResponse.body.descricao).toBe(payload_put_conteudos.descricao)
            expect(secondResponse.body.tipoConteudo).toBe(payload_put_conteudos.tipoConteudo)
            expect(secondResponse.body.conteudo).toBe(payload_put_conteudos.conteudo)
            expect(secondResponse.status).toBe(200)
    })
    it('Remover conteúdo', async ()=>{
        const response = await request(URLS.ROTA_ENDPOINT).delete(`/${URLS.ROTA_CONTEUDOS}/${idConteudoCadastrado}`)

        expect(response.status).toBe(200)
        
        const secondResponse = await request(URLS.ROTA_ENDPOINT).get(`/${URLS.ROTA_CONTEUDOS}/${idConteudoCadastrado}`)

        expect(secondResponse.status).toBe(404)
    })
})