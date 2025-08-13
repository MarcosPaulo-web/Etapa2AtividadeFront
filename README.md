Organizador de Tarefas
Requisitos Funcionais (RF)
RF-001: O sistema deve possuir campos de cadastro de tarefas com descrição e data limite.

RF-002: O sistema deve exibir todas as tarefas em cards.

RF-003: Toda tarefa deve exibir um botão para marcar a tarefa como concluída.

RF-004: A descrição de tarefas concluídas deve possuir animação simples de line-through.

RF-005: Todas as tarefas devem ser armazenadas no localStorage.

RF-006: As tarefas devem ser ordenadas por data limite.

RF-007: As listas de tarefas devem possuir filtros:

Todas: para exibir todas as tarefas cadastradas;

Pendentes: para exibir as tarefas ainda não concluídas;

Atrasadas: para exibir tarefas com o prazo de data limite vencida;

Concluídas: para exibir todas as tarefas concluídas.

RF-008: As tarefas atrasadas e concluídas devem exibir um badge informando o status da tarefa.

RF-009: O sistema deve permitir o cadastro de novos usuários com nome, e-mail e senha.

RF-010: O sistema deve armazenar as informações de cadastro de usuários no localStorage.

RF-011: O sistema deve permitir que um usuário faça login com seu e-mail e senha.

RF-012: Após o login, o sistema deve redirecionar o usuário para a página de tarefas.

Requisitos Não Funcionais (RNF)
RNF-001: O sistema deve ter design responsivo.

RNF-002: O sistema deve permitir a troca de tema da tela.

RNF-003: O sistema deve possuir uma interface simples e intuitiva.

RN-005: Um usuário não pode ser cadastrado se o e-mail já estiver em uso.

RN-006: A senha e o e-mail de login devem ser correspondentes a um usuário cadastrado para que o acesso seja permitido.

RN-007: Uma tarefa não pode ser adicionada com uma data limite que já passou.

Regras de Negócio (RN)
RN-001: A tarefa não pode ser inserida sem a data limite e a descrição.

RN-002: A tarefa atrasada é a que não foi concluída, mas passou da data limite.

RN-003: As tarefas devem ser ordenadas da mais antiga para a mais recente.

RN-004: No filtro “Todas”, as tarefas concluídas devem ser exibidas por último.

Lanchonete
Requisitos Funcionais (RF)
RF001: Carregar automaticamente o site com:

Destaques do cardápio no carrossel.

Lista completa do cardápio.

Tema salvo no localStorage.

RF002: Disponibilizar botões “Adicionar ao pedido” para cada item do cardápio.

RF003: Exibir banner/carrossel automático mostrando itens em destaque.

RF004: O banner deve ocupar 100% da largura da tela.

RF005: Possuir carrinho retrátil (oculto até clique no botão do carrinho).

RF006: O carrinho deve exibir:

Nome dos itens.

Imagem do produto.

Preço unitário.

Quantidade (mínimo 1, máximo 10).

Total do pedido.

RF007: Utilizar localStorage para manter o carrinho salvo mesmo após atualização da página.

RF008: O Botão “Finalizar compra” deve limpar o carrinho.

RF009: Mostrar feedback visual ao adicionar item (toast ou badge no botão do carrinho).

RF012: Página deve permitir login e cadastro na mesma interface:

Quando o formulário de login é exibido, o formulário de cadastro desaparece.

Quando o formulário de cadastro é exibido, o formulário de login desaparece.

RF013: Exibir toast de feedback:

Mensagem de erro se o cadastro ou login falhar (ex.: usuário já existente ou senha incorreta).

Mensagem de sucesso se cadastro ou login forem realizados corretamente.

Requisitos Não Funcionais (RNF)
RNF001: Implementar troca de tema (claro/escuro) com alteração de ícone e estilo.

RNF002: Uso obrigatório do Bootstrap e Bootstrap Icons.

RNF003: Layout responsivo que se adapte a diferentes tamanhos de tela.

RNF004: Carrossel implementado com Bootstrap Carousel.

RNF005: Interface agradável, com cores e espaçamentos consistentes.

Regras de Negócio (RN)
RN001: Cardápio deve conter no mínimo 18 itens.

RN002: Apenas os itens marcados como destaque aparecem no carrossel.

RN003: Intervalo de troca do carrossel deve ser de 5 segundos.

RN004: Quantidade mínima de um item no carrinho é 1.

RN005: Quantidade máxima de um item no carrinho é 10.

RN006: Se a quantidade for reduzida a 0, o item deve ser removido do carrinho.

RN007: O badge no botão do carrinho deve mostrar a soma total de todas as unidades adicionadas.

RN008: Usuário só pode estar em um formulário por vez (login ou cadastro).

RN009: Cadastro deve validar se o usuário já existe.

RN010: Login deve validar se o usuário e senha correspondem a um registro existente.

RN011: Logout remove os itens do carrinho do localStorage.

Biblioteca
Requisitos Funcionais (RF)
RF01: Visualização do Acervo de Livros: O sistema deve exibir uma página principal com um acervo de livros.

RF02: Detalhes Essenciais do Livro: Cada livro listado no acervo deve apresentar, no mínimo, seu título, nome do autor e um botão de ação.

RF03: Adição de Livro à Estante Virtual: O usuário deve poder clicar em um botão para adicionar um livro do acervo à sua estante virtual pessoal.

RF04: Persistência de Dados da Estante: A estante virtual deve salvar a lista de livros do usuário de forma persistente entre as sessões do navegador.

RF05: Visualização da Estante Virtual: O sistema deve possuir uma página dedicada ("Minha Estante") que exiba todos os livros que o usuário adicionou.

RF06: Remoção de Livro da Estante: Na página da estante, o usuário deve ter a opção de remover um livro de sua coleção pessoal.

RF07: Contagem de Livros na Estante: O sistema deve exibir um contador que mostre a quantidade total de livros na estante.

RF08: Prevenção de Duplicidade na Estante: O sistema deve impedir que o mesmo livro seja adicionado mais de uma vez, notificando o usuário.

RF09: Busca de Livros: O sistema deve fornecer uma barra de busca para filtrar livros por título ou gênero em tempo real.

RF10: Marcação de Livro como Lido: Na estante virtual, o usuário deve poder marcar um livro como "lido".

RF11: Classificação por Gênero: O sistema deve permitir que o usuário filtre os livros por gênero.

Requisitos Não Funcionais (RNF)
RNF01: Usabilidade e Experiência do Usuário: A interface do sistema deve ser intuitiva, limpa e de fácil navegação. O sistema deve fornecer feedback visual imediato para as ações do usuário.

RNF02: Responsividade: A aplicação deve ser totalmente funcional e ter seu layout adaptado para diferentes tamanhos de tela, incluindo desktops, tablets e smartphones.

RNF03: Desempenho: A aplicação deve ter um carregamento rápido e as interações do usuário (adicionar, remover, buscar) devem ocorrer de forma instantânea, sem atrasos perceptíveis.

RNF04: Compatibilidade: O sistema deve ser compatível e funcionar corretamente nas versões mais recentes dos principais navegadores web (Google Chrome, Mozilla Firefox, Microsoft Edge).

RNF05: Manutenibilidade: O código-fonte deve ser organizado, legível e modular para facilitar futuras manutenções, correções e adições de funcionalidades.

RNF06: Estilo Visual: A aplicação deve seguir uma identidade visual consistente em todas as suas páginas.

RNF07: Robustez e Integridade dos Dados: O sistema deve ser robusto a falhas e garantir a integridade dos dados do usuário. A fonte de dados do catálogo de livros deve ser estável e separada dos dados da sessão do usuário.

RNF08: Alternância de Tema (Modo Escuro): O sistema deve permitir ao usuário alternar entre um tema visual claro e um escuro.

Regras de Negócio (RN)
RN01: Catálogo Mínimo: O acervo de livros disponível para o usuário deve conter, no mínimo, 12 obras.

RN02: Unicidade de Livros na Estante: Um mesmo livro não pode ser adicionado mais de uma vez à estante de um usuário.

RN03: Estado Padrão do Livro: Ao ser adicionado à estante, um livro deve assumir o estado padrão de "Não Lido".

RN04: Persistência de Preferências: As escolhas do usuário, como o tema visual (claro/escuro) e o estado de leitura dos livros, devem ser salvas e mantidas entre as visitas.

RN05: Integridade da Estante: Um livro só pode ser adicionado à estante se ele existir no acervo principal. Da mesma forma, um livro só pode ser removido da estante se já estiver nela.
