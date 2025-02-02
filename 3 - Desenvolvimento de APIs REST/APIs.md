# O que é uma API?

API (Application Programming Interface) é um conjunto de regras que permite que diferentes sistemas de software se comuniquem entre si. Em termos simples, uma API age como um intermediário que facilita a troca de informações entre aplicações

## Como funciona uma API?

Uma API define um conjunto de métodos e protocolos que um sistema pode usar para solicitar e enviar dados a outro sistema. Esse processo geralmente segue estas etapas:

1. Requisição -> Um cliente(como um aplicativo ou site) faz uma solicitação a uma API.

2. Processamento -> A API interpreta a solicitação e busca os dados necessários.

3. Resposta -> A API retorna os dados solicitados em um formato estruturado (geralmente JSON ou XML).

Por exemplo, quando você usa um app de previsão do tempo, o aplicativo consulta uma API para obter os dados meteorológicos e exibi-los para você.

## Por que APIs são importantes?

- Facilitam a Integração: Permitem que diferentes serviços se comuniquem de maneira padronizada.

- Automatizam Processos: Empresas podem conectar sistemas internos sem necessidade de intervenção manual.

- Permitem Escalabilidade: Aplicações podem expandir funcionalidades rapidamente ao consumir APIs de terceiros.

- Segurança: As APIs podem ser protegidas com autenticação para garantir que apenas usuários autorizados acessem os dados.

# Disponibilidade e Controle de Acesso de APIs

As APIs podem ser classificadas com base em quem pode acessá-las e como seu uso é controlado. Essa distinção é importante para definir segurança, privacidade e integração de serviços.

**APIs Públicas (Open APIs):** São APIs abertas para qualquer desenvolvedor ou empresa, geralmente disponibilizadas por grandes plataformas para incentivar integrações. Essas APIs disponibilizam documentações públicas e acessíveis, Normalmente requerem uma chave de API para controle de uso e Facilitam a criação de aplicativos baseados em serviços de terceiros.

- Google Maps API -> Permite adicionar mapas interativos em sites e apps.

- Twitter API -> Usada para acessar tweets e interagir com a plataforma.

**APIs Privadas (Internal APIs):** Projetadas para uso excluisov dentro de uma organização. Elas permitem a comunicação entre sistemas internos sem exposição ao público. Elas são restritas a usuários e sistemas internos, melhoram a integração entre serviços da própria empresa e costumam ser protegidas por firewalls e autenticação robusta.

- API interna de um banco para processar transações entre diferentes departamentos.

- API de um e-commerce para atualizar o estoque entre diferentes setores.

**APIs de Parceiros (Partner APIs):** São APIs disponibilizadas apenas para parceiros comerciais ou clientes específicos, geralmente protegidas por autenticação e contrato de uso. Não são públicas, mas podem ser acessadas por terceiros autorizados, exigem autenticação rigorosa, como OAuth ou certificados digitais e normalmente envolvem acordos comerciais

- APIs de bancos que permitem integração com fintechs para serviços de pagamentos.

- APIs de sistemas de reserva de passagens aéreas usadas por agências de viagem.

Cada tipo de API tem um propósito e um nível de controle diferente. As APIs públicas facilitam a inovação aberta, enquanto as privadas garantem segurança dentro da empresa. Já as APIs de parceiros criam integrações estratégicas com controle de acesso.

# Arquiteturas de APIs

O estilo de arquitetura de uma API define como os dados são organizados, trocados e estruturados. Existem diferentes abordagens, cada uma com vantagens e desvantagens.

**REST (Representational State Transfer):** É o modelo mais utilizado atualmente para comunicações entre sistemas na web. É baseado em HTTP e faz uso dos métodos padrões (GET, POST, PUT, DELETE). Os dados geralmente retornam em tipos JSON ou XML.

**SOAP (Simple Object Access Protocol):** Protocolo mais antigo, ainda usado em sistemas que exigem segurança e confiabilidade, é completamente baseado em XML e suporta transações seguras (WS-Security), funciona sobre vários protocolos (HTTP, SMTP, etc.)

**GraphQL:** Criado pelo Facebook, permite que o cliente peça apenas os dados que precisa, reduzindo requisições desnecessárias. Faz uso apenas de um endpoint, o cliente define os dados que deseja receber e reduz o volume de dados transferidos