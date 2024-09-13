const Biblioteca = require('../src/trabalho01Turma02');

describe('Biblioteca', () => {
  let biblioteca;

  beforeEach(() => {
    biblioteca = new Biblioteca();
  });

  test('Deve adicionar e listar um livro corretamente', () => {
    const livro = { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste', genero: 'Gênero Teste', ano: 2024 };
    biblioteca.adicionarLivro(livro);
    expect(biblioteca.listarLivros()).toContainEqual(livro);
  });

  test('Deve remover um livro corretamente', () => {
    const livro = { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste', genero: 'Gênero Teste', ano: 2024 };
    biblioteca.adicionarLivro(livro);
    biblioteca.removerLivro(1);
    expect(biblioteca.listarLivros()).not.toContainEqual(livro);
  });

  test('Deve emprestar e devolver um livro corretamente', () => {
    const livro = { id: 1, titulo: 'Livro Teste', emprestado: false };
    const membro = { id: 1, nome: 'Membro Teste' };
    biblioteca.adicionarLivro(livro);
    biblioteca.adicionarMembro(membro);

    // Empresta o livro
    expect(biblioteca.emprestarLivro(1, 1)).toBe(true);
    const livroEmprestado = biblioteca.buscarLivroPorId(1);
    expect(livroEmprestado.emprestado).toBe(true);

    // Devolve o livro
    expect(biblioteca.devolverLivro(1)).toBe(true);
    const livroDevolvido = biblioteca.buscarLivroPorId(1);
    expect(livroDevolvido.emprestado).toBe(false);
  });

  test('Deve contar livros e membros', () => {
    const livro = { id: 1, titulo: 'Livro Teste' };
    const membro = { id: 1, nome: 'Membro Teste' };
    biblioteca.adicionarLivro(livro);
    biblioteca.adicionarMembro(membro);

    expect(biblioteca.contarLivros()).toBe(1);
    expect(biblioteca.contarMembros()).toBe(1);
  });

  test('Deve listar livros por autor e gênero', () => {
    const livro1 = { id: 1, titulo: 'Livro Teste 1', autor: 'Autor Teste', genero: 'Gênero Teste', ano: 2024 };
    const livro2 = { id: 2, titulo: 'Livro Teste 2', autor: 'Outro Autor', genero: 'Outro Gênero', ano: 2023 };
    biblioteca.adicionarLivro(livro1);
    biblioteca.adicionarLivro(livro2);

    expect(biblioteca.listarLivrosPorAutor('Autor Teste')).toContainEqual(livro1);
    expect(biblioteca.listarLivrosPorGenero('Gênero Teste')).toContainEqual(livro1);
  });

  test('Deve atualizar informações do livro', () => {
    const livro = { id: 1, titulo: 'Livro Teste', autor: 'Autor Teste', genero: 'Gênero Teste', ano: 2024 };
    biblioteca.adicionarLivro(livro);
    biblioteca.atualizarInformacaoLivro(1, { titulo: 'Título Atualizado' });
    const livroAtualizado = biblioteca.buscarLivroPorId(1);
    expect(livroAtualizado.titulo).toBe('Título Atualizado');
  });

  test('Validação de erro ao adicionar livro', () => {
    const livroInvalido = { id: 1, titulo: '', autor: 'Autor Teste', genero: 'Gênero Teste', ano: 2024 };
    expect(() => {
      biblioteca.adicionarLivro(livroInvalido);
    }).toThrow('Erro ao adicionar livro');
  });
});
