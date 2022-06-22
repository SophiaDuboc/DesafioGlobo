# DesafioGlobo

- pesquisei sobre encurtadores de URLs
- Pesquisei dicas de desenvolvimento de encurtadores
- Notei a necessidade de um banco de dados, como vi várias pessoas fazendo com mongo, noSql, mySql, etc. Optei por pesquisar as diferenças de performance entre (Mysql e MongoDD) para uma decisão.
Optei por MongoDB, visto que pode ser mais escalonável.

Decidi a linguagem praticamente assim que li o desafio. Ao mexer com APIs, sabia que Node.js seria bom. Em minhas pesquisas sobre encurtadores de URLs pude confirmar minha teoria.

- Pesquisei de forma mais específica, sobre o uso de sequelize com MongoDB e já comecei a brincar em subir o servidor do mongoDB, configurar o node.js com sequelize e fazer a conexão do código com o banco.

- A princípio fui seguindo um tutorial que achei bom para montar os primeiros passos do site.

- Finalmente pensando em como eu implementaria tudo o que foi requisitado, decidi algumas ordens de prioridade.
	1) MVP
	2) Diferencial
	3) Testes
	4) Melhoria Front
	5) Diferencial parte 2
	6) melhorias adversas


1) MVP:
- Entregar os requisitos mínimos: listar, criar, excluir URLs e contabilizar acessos. 
- Criar código de encurtador de hash (mesmo que um código simples a princípio)
- Ter um front funcional (mesmo que feio a princípio, inclusive por não ser algo que costumo ter muita habilidade e levaria mais tempo)
- Adicionar validações mínimas importantes para não ter um front facilmente quebrável
- make setup e make run funcionarem

2) Diferencial:
Meu primeiro diferencial se daria em pensar em uma arquitetura de código escalonável e desenvolvê-la.

3) Testes:
Os testes me ajudariam a não quebrar o código com as melhorias, eu teria controle da cobertura de testes do código e saberia identificar pontos de falha.

4) Melhoria front:
Design do front e talvez até um novo formato de recebimento de informações do back.

5) Diferencial parte 2:
"Ter observabilidade da aplicação é um diferencial".
Muito precisarei fazer nessa parte para poder ter observabilidade. Vou deixar pra quando chegar a hora.

6) Melhorias adversas:
Melhorias dos problemas identificados nos testes.
É possível melhorar ainda mais a arquitetura? Organização do código? Padronização de métodos? Aumentar testes? etc

Observação importante: A princípio, eu poderia ter feito de primeira um site escalável e bom, mas isso demandaria mais tempo para desenvolvimento dos requisitos mínimos.
Visto que tenho um curto prazo de entrega, acredito que não valeria muito a pena fazer algo extremamente robusto a princípio e deixar a desejar em muitas outras coisas que eu poderia fazer. Por isso defini um MVP e acrescentarei as melhorias que der tempo de produzir até o prazo final.

- Desenvolvimento do MVP.

- Antes tarde do que nunca? Fiz um trello pra controle das tarefas.

- "make setup e make run": Essa parte foi realmente um desafio para mim. A princípio eu dei uma estudada de como funciona o make e percebi que isso poderia se tornar algo bem difícil.
Como não sou tão boba, conversei com um amigo da área e ele disse que eu não precisaria configurar todas as dependências se eu suibsse o projeto num docker e apenas iniciasse o docker no arquivo makefile.

A partir daí comecei a tarefa de subir os dockers e configurar o docker-compose.

Meu aprendizado nessa parte foi: Eu poderia ter subido o mongo no docker desde o princípio. Não é tão difícil e me evita retrabalho de codar a conexão dele novamente.

Aprendizado 2: escrever 'sudo' cansa
Aprendizado 3: dokcer, sido, odcker não são comandos válidos

- Comecei a pensar em novas maneiras de criar hash e como poderia deixar escalonável

- Desenvolvi a minha nova maneira de criar hashs

- Adicionei algumas informações que podem vir a ser úteis no futuro do site, como data de último acesso e data de criação das URLs, mesmo que não use-as por agora.

- Fiz um teste integrado automatizado.
Para isso, mudei as respostas do back, para melhorar o teste e separei completamente o front do back, de forma que o back pudesse atual como uma API de verdade e o front apenas o consuma.

- A parte do front foi de longe a mais demorada para mim, não tenho muito costume e precisei quebrar a cabeça para resolver as coisas da forma como eu tinha algum conhecimento.
Não tentei aprender ferramentas novas, pois sabia que isso poderia me custar mais tempo e eu não conseguiria entregar o desafio, então optei por fazer um html puro com javascript e axios.

- Agora que estou escrevendo essa parte, penso que existe a possibilidade de eu entregar com um bug no front. Torçam para que eu consiga resolver a tempo!

- Arrumado o front, o back, o teste integrado, não pretendo mexer novamente nas respostas da API e a forma como ela se comporta, então vou começar a escrever os testes funcionais e unitários.

 
