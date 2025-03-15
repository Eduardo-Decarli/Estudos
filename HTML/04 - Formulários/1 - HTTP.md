# HTTP e seus métodos

- **HTTP (HyperText Transfer Protocol):** É o protocolo de comunicação usado na web para a transferência de dados entre clientes (como navegadores) e servidores. Ele define como as mensagens são formatadas e transmitidas, e como os servidores e navegadores devem responder a vários comandos.

- **HTTPS (HTTP Secure):** É a versão segura do HTTP, que utiliza criptografia SSL/TLS para proteger a comunicação entre o cliente e o servidor, garantindo que os dados transmitidos não sejam interceptados ou alterados.

## Métodos HTTP

Os métodos HTTP indicam a ação que o cliente deseja que o servidor execute. No contexto de formulários HTML, os métodos mais comuns são:

- GET: Recupera dados de um servidor. Os dados do formulário são anexados à URL como parâmetros de consulta, suas caracteristicas são: 
    - Os dados são visíveis na URL, o que pode ser uma preocupação de segurança.
    - Ideal para solicitações que não alteram o estado do servidor (operações idempotentes).
    - Limitação de tamanho de URL, o que pode restringir a quantidade de dados enviados.

- POST: Envia dados ao servidor para criar ou atualizar recursos. Os dados do formulário são enviados no corpo da solicitação HTTP. Suas caracteristicas são: Os dados não são visíveis na URL, oferecendo mais segurança para informações sensíveis. Não tem limitação de tamanho como o GET, permitindo o envio de grandes quantidades de dados. Usado para operações que alteram o estado do servidor.

## Outros métodos HTTP

- PUT: Usado para atualizar um recurso existente no servidor. Envia dados no corpo da solicitação, semelhante ao POST.

- DELETE: Usado para excluir um recurso no servidor.

- HEAD: Similar ao GET, mas solicita apenas o cabeçalho da resposta, sem o corpo. Útil para verificar se um recurso existe ou para obter metadados.

- OPTIONS: Retorna os métodos HTTP suportados pelo servidor para um recurso específico.