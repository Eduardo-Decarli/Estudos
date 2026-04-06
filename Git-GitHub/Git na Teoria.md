# 📝 Git, GitHub e Git Bash

## 🚀 GIT

**Git** é um sistema de controle de versão que permite:

- Rastrear alterações em arquivos.
- Coordenar o trabalho em projetos entre várias pessoas.
- Armazenar versões do código em um repositório local.
- Voltar versões anteriores do projeto.
- Criar e mesclar ramificações para novos recursos.


Git é essencial para o desenvolvimento colaborativo, é muito utilizado no desenvolvimento de softwares para se manter o controle adequado do projeto.

---

## 🌐 GITHUB

**GitHub** é uma plataforma online que hospeda repositórios Git, permitindo que desenvolvedores:

- Armazenem e compartilhem seus repositórios remotamente.
- Usem controle de versão de maneira eficiente.

Além disso, o GitHub oferece ferramentas poderosas de colaboração, como:

- Revisão de código.
- Relatórios de problemas (issues).
- Integração contínua e implantação (CI/CD).

---

## 💻 Git Bash

Ao instalar o Git no dispositivo, é oferecida a instalação do **Git Bash**.

**Git Bash** é um aplicativo que fornece uma interface de linha de comando (CLI) para executar comandos Git. Além disso, ele inclui várias ferramentas Unix, como:

- `ls`
- `pwd`
- `ssh`
- `grep`

Essas ferramentas tornam a interação com o Git no **Windows** mais fácil e eficiente.

---

## 🌿 Branch (Ramificações)

No **Git**, uma **branch** (ou ramificação) é uma linha independente de desenvolvimento. Ao criar um branch, você está criando uma cópia do seu código em um ponto específico, permitindo que você faça mudanças sem afetar a branch principal (geralmente chamada de `main`).

**Principais vantagens de usar branches:**

- **Desenvolvimento de novos recursos**: Cada novo recurso ou correção de bug pode ser desenvolvido em sua própria branch, sem interferir no código principal.
- **Isolamento**: Permite que várias pessoas trabalhem em diferentes partes do projeto ao mesmo tempo, sem gerar conflitos.
- **Segurança**: Ao trabalhar em um branch separado, o código principal não será afetado até que as mudanças sejam testadas e aprovadas.
- **Facilidade de mesclagem**: Após finalizar o desenvolvimento ou correção na branch, é possível mesclar (merge) ela à branch principal, incorporando as mudanças.

---

## 📝 Sistema de Arquivos

O Git utiliza um sistema de arquivos de gerenciamento interno dispostos incialmente em sua pasta raiz

- gitconfig: É um arquivo específico, localizado no caminho ***[path]/etc/gitconfig***, onde podemos encontrar todas as configurações de comportamento do git, comportamentos esses que serão utilizados em todos os projetos do git (global)

--- 

## 📝 Editor Vim

O **Vim** é um editor de texto poderoso e eficiente utilizado frequentemente por desenvolvedores para editar arquivos diretamente no terminal. Aqui estão os comandos básicos para começar:

--- 

# 🔄 Rebase no Git

O **rebase** é uma forma de reorganizar os commits em uma branch, aplicando as mudanças de uma branch sobre outra. Ele é utilizado para manter o histórico linear e facilitar a compreensão da evolução do projeto.

---

## 📚 O que é o rebase?

O comando `git rebase` pega todos os commits da sua branch atual que não estão na branch de destino e os reaplica no topo da branch de destino, um por um. Isso é diferente do merge, que cria um commit de junção no histórico.

---

## 🆚 Diferença entre Rebase e Merge

- **Merge:** Une duas branches e cria um commit extra (merge commit), mantendo o histórico ramificado.
- **Rebase:** Reescreve o histórico, aplicando os commits da sua branch sobre a branch de destino, deixando o histórico linear.

Exemplo visual:

```
Antes do rebase:
main:    A---B---C
                 \
feature:           D---E

Após `git rebase main` na branch feature:
main:    A---B---C
                     \
feature:               D'--E'
```

---

📖 *Com Git e GitHub você tem um conjunto completo de ferramentas para versionamento de código e colaboração no desenvolvimento de software!*
