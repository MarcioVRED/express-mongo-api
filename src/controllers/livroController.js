import livro from "../models/Livro.js";

class LivroController {
    static async listarLivros (req,res) {
        try {
            const listaLivros = await livro.find({});
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.statu(500).json({ message: `${erro.message} - Falha na requisição do Livro`})
        }
    }

    static async listarLivrosPorId (req,res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id);
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.statu(500).json({ message: `${erro.message} - Falha na requisição do Livro`})
        }
    }

    static async cadastrarLivro (req, res) {
        const novoLivro = req.body;
        try {
          const autorEncontrado = await autor.findById(novoLivro.autor);
          const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc }};
          const livroCriado = await livro.create(livroCompleto);
          res.status(201).json({ message: "criado com sucesso", livro: livroCriado });
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha ao cadastrar livro` });
        }
      }

    static async atualizarLivro (req,res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({ message: "Livro atualizado com sucesso!"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na atualização do Livro`});
        }
    }

    static async excluirLivro (req,res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            livro.splice(id, 1);
            res.status(200).json({ message: "Livro excluido com sucesso!"});
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na exclusão do Livro`})
        }
    }

    static async listarLivrosPorEditora (req,res) {
        const editora = req.query.editora;
        try{
            const livrosPorEditora = await livro.find({ editora: editora });
            res.status(200).json(livrosPorEditora);
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha na busca do Livro por Editora`})
        }
    }
};

export default LivroController;