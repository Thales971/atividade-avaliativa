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
  const {
    titulo,
    categoria,
    origem,
    dataCriacao,
    popularidade,
    tags,
    formato,
    autor,
  } = req.body;

  const categoriasLista = ["classico", "viral", "Reacao", "brasileiro"];

  const tagsLista = [
    "confusao",
    "calculos",
    "pensativa",
    "brasileiro",
    "relacionamento",
    "ciumes",
    "escolha",
    "mau-humor",
    "gato",
    "reclamacao",
    "sarcasmo",
    "financas",
    "investimentos",
    "negocios",
    "erro",
    "caos",
    "negacao",
    "problemas",
    "calma",
    "discussao",
    "acusacao",
    "musica",
    "viral",
    "hit",
    "maranhense",
    "cachoro",
    "wow",
    "such meme",
    "muito-legal",
    "futebol",
    "viral",
    "familia",
    "cearense",
    "anime",
    "pergunta",
    "erro",
    "confusao",
  ];

  const formatoLista = ["imagem", "video", "gif"];

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
    if (!dataCriacao <= 0 || dataCriacao >= 2025) {
      return res.status(400).json({
        success: false,
        message: "O campo 'dataCriacao' é obrigatório para criar um meme!",
      });
    }
  }

  if (!popularidade)
    if (!popularidade <= 0 || popularidade >= 100) {
      return res.status(400).json({
        success: true,
        message: "O seu meme tem que ter a popularidade entre 0 e 100!",
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

  if (!formato || !formatoLista.includes(formato)) {
    return res.status(400).json({
      success: false,
      message: `O campo 'formato' é obrigatório e deve ser uma das opções: ${formatoLista.join(
        ", "
      )}!`,
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
    autor,
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

  const {
    titulo,
    categoria,
    origem,
    dataCriacao,
    popularidade,
    tags,
    formato,
    autor,
  } = req.body;

  const categoriasLista = ["classico", "viral", "Reacao", "brasileiro"];

  const tagsLista = [
    "confusao",
    "calculos",
    "pensativa",
    "brasileiro",
    "relacionamento",
    "ciumes",
    "escolha",
    "mau-humor",
    "gato",
    "reclamacao",
    "sarcasmo",
    "financas",
    "investimentos",
    "negocios",
    "erro",
    "caos",
    "negacao",
    "problemas",
    "calma",
    "discussao",
    "acusacao",
    "musica",
    "viral",
    "hit",
    "maranhense",
    "cachoro",
    "wow",
    "such meme",
    "muito-legal",
    "futebol",
    "viral",
    "familia",
    "cearense",
    "anime",
    "pergunta",
    "erro",
    "confusao",
  ];

  const formatoLista = ["imagem", "video", "gif"];

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
    if (popularidade <= 0 || popularidade >= 100) {
      return res.status(400).json({
        success: true,
        message: "O seu meme tem que ter a popularidade entre 0 e 100!",
      });
    }
  }

  if (categoria) {
    if (!categoriasLista.includes(categoria)) {
      return res.status(400).json({
        success: false,
        message: `O campo 'categoria' deve ser uma das opções: ${categoriasLista.join(
          ", "
        )}!`,
      });
    }
  }

  if (!titulo) {
    return res.status(400).json({
      success: false,
      message: "titulo não existe.",
    });
  }

  if (!origem) {
    return res.status(400).json({
      success: false,
      message: "origem não existe.",
    });
  }

  if (dataCriacao) {
    if (dataCriacao <= 0 || dataCriacao >= 2025) {
      return res.status(400).json({
        success: false,
        message: "  'dataCriacao' não existe.",
      });
    }
  }

  if (tags) {
    if (!tagsLista.includes(tags)) {
      return res.status(400).json({
        success: false,
        message: `O campo 'tags' é obrigatório e deve ser uma das opções: ${tagsLista.join(
          ", "
        )}!`,
      });
    }
  }
  if (formato) {
    if (!formatoLista.includes(formato)) {
      return res.status(400).json({
        success: false,
        message: `O campo formato é obrigatório e deve ser uma das opções: ${formatoLista.join(
          ", "
        )}!`,
      });
    }
  }

  if (!autor) {
    return res.status(400).json({
      success: false,
      message: "author não existe.",
    });
  }

  const memesAtualizados = memes.map((meme) => {
    return meme.id === id
      ? {
          ...meme,
          ...(titulo && {
            titulo,
          }),
          ...(categoria && {
            categoria,
          }),
          ...(origem && {
            origem,
          }),
          ...(dataCriacao && {
            dataCriacao,
          }),
          ...(popularidade && {
            popularidade,
          }),
          ...(tags && {
            tags,
          }),
          ...(formato && {
            formato,
          }),
          ...(autor && {
            autor,
          }),
        }
      : meme;
  });

  memes.splice(0, memes.length, ...memesAtualizados);

  const memeNovo = memes.find((meme) => meme.id === id);

  res.status(200).json({
    success: true,
    message: "Dados atualizados com sucesso",
    meme: memeNovo,
  });
};

export { getAllmemes, getMemesById, createMeme, deleteMeme, updateMeme };
