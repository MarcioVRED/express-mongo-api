import { autor } from "../models/Autor.js";

class AutorController {
    static async listarAutores (req,res) {
        try {
            const listaAutores = await autor.find({});
            res.status(200).json(listaAutores);
        } catch (erro) {
            res.statu(500).json({ message: `${erro.message} - Falha na requisição do Autor`})
        }
    }

    static async listaAutoresPorId (req,res) {
        try {
            const id = req.params.id;
            const autorEncontrado = await autor.findById(id);
            res.status(200).json(autorEncontrado);
        } catch (erro) {
            res.statu(500).json({ message: `${erro.message} - Falha na requisição do Autor`})
        }
    }

    static async cadastrarAutor (req, res) {
        try{
            const novoAutor = await autor.create(req.body);
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor});
        }catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha ao cadastrar Autor`});
        }
    }

    static async atualizarAutor (req,res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Autor atualizado com sucesso!"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização do Autor`});
        }
    }

    static async excluirAutor (req,res) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);
            autor.splice(id, 1);
            res.status(200).json({ message: "Autor excluido com sucesso!"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão do Autor`})
        }
    }
};

export default AutorController;