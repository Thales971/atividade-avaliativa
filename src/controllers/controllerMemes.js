import dados from "../models/dados.js";
const { memes } = dados;

const getAllmemes = (req, res) => {
  res.status(200).json({
    total: memes.length,
    memes: memes,
  });
};

const getMemesById = (req, res) => {
    let id = parseInt(req.params.id);
  
    const meme = memes.find((c) => c.id === id);
  
    if (meme) {
      res.status(200).json({
        success: true,
        meme: meme,
      });
    }
  
    res.status(400).json({
      success: false,
      message: "Meme nao encontrado",
    });
  };

  const createMeme = (req, res) => {
    const {  titulo, categoria, origem, dataCriacao, popularidade, tags, formato, autor } = req.body;
  
    const categoriasLista = ["classico", "viral", "Reacao", "brasileiro"];

    const tagsLista = ["confusao","calculos","pensativa","brasileiro","relacionamento","ciumes","escolha","mau-humor","gato","reclamacao","sarcasmo","financas","investimentos","negocios","erro","caos","negacao","problemas","calma","discussao","acusacao","musica","viral","hit","maranhense","cachoro","wow","such meme","muito-legal","futebol","viral","familia","cearense","anime","pergunta","erro","confusao"];


    if (!titulo) {
        return res.status(400).json({
    success: false,
    message: "O campo 'titulo' é obrigatório para criar um meme!",
        });
    }

    if (!categoria || !categoriasLista.includes(categoria)) {
        return res.status(400).json({
          success: false,
          message: `O campo 'categoria' é obrigatório e deve ser uma das opções: ${categoriasLista.join(
            ", "
          )}!`,
        });
      }

      if (!origem) {
        return res.status(400).json({
    success: false,
    message: "O campo 'origem' é obrigatório para criar um meme!",
        });
    }

    if (!dataCriacao) {
        return res.status(400).json({
    success: false,
    message: "O campo 'dataCriacao' é obrigatório para criar um meme!",
        });
    }

    if (!popularidade) {
        return res.status(400).json({
    success: false,
    message: "O campo 'popularidade' é obrigatório para criar um meme!",
        });
    }

    if (!autor) {
        return res.status(400).json({
    success: false,
    message: "O campo 'autor' é obrigatório para criar um meme!",
        });
    }

    if (!tags || !tagsLista.includes(tags)) {
        return res.status(400).json({
          success: false,
          message: `O campo 'tags' é obrigatório e deve ser uma das opções: ${tagsLista.join(
            ", "
          )}!`,
        });
      }

      if (!formato) {
        return res.status(400).json({
    success: false,
    message: "O campo 'formato' é obrigatório para criar um meme!",
        });
    }

    const novoMeme = {
        id: memes.length + 1,
        titulo,
        categoria: categoria.toLowerCase(),
        origem,
        dataCriacao,
        popularidade,
        tags: tags.toLowerCase(),
        formato,
        autor
      };
    
      memes.push(novoMeme);
    
      res.status(201).json({
        success: true,
        message: "Meme criado com sucesso!",
        meme: novoMeme,
      });
    };

    const deleteMeme = (req, res) => {
        let id = parseInt(req.params.id);
        const memeParaRemover = memes.find((c) => c.id === id);
      
        if (!memeParaRemover) {
          return res.status(404).json({
            success: false,
            message: "Este meme nao existe",
          });
        }
      
        const memesFiltrados = memes.filter((meme) => meme.id !== id);
        memes.splice(0, memes.length, ...memesFiltrados);
        res.status(200).json({
          success: true,
          message: "Meme deletado com sucesso",
          memeRemovido: memeParaRemover,
        });
      };

      const updateMeme = (req, res) => {
        const id = parseInt(req.params.id);

        const {  titulo, categoria, origem, dataCriacao, popularidade, tags, formato, autor } = req.body;

        const categoriasLista = ["classico", "viral", "Reacao", "brasileiro"];

        const tagsLista = ["confusao","calculos","pensativa","brasileiro","relacionamento","ciumes","escolha","mau-humor","gato","reclamacao","sarcasmo","financas","investimentos","negocios","erro","caos","negacao","problemas","calma","discussao","acusacao","musica","viral","hit","maranhense","cachoro","wow","such meme","muito-legal","futebol","viral","familia","cearense","anime","pergunta","erro","confusao"];
    
 if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser um número válido",
    });
  }

  const memeExiste = memes.find((meme) => meme.id === id);

  if (!memeExiste) {
    return res.status(400).json({
      success: false,
      message: " Este meme não existe.",
    });
  }

  if (popularidade) {
    if (popularidade <= 80 || popularidade >= 100) {
      return res.status(400).json({
        success: true,
        message: "O seu meme tem 'Popularidade: Viral' esta entre 80 e 100!",
        else (popularidade <= 60 || popularidade >= 80) {
        success: false
        message: "O seu "
        }
      });
    }
  }
      

export { getAllmemes, getMemesById, createMeme, deleteMeme };
