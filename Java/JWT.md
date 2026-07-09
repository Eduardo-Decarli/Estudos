# JWT (JSON Web Token)

Dentro da internet, para que os sistemas possam se comunicar entre si, é necessário uma certa segurança nessa comunicação, e não apenas na criptografia, mas na autenticidade, e é isso que o JWT traz para nós, ele serve como uma forma de carteira de identidade ou RG, que demonstra que quem está falando realmente é quem diz ser.

Um token é entendido como uma **assinatura digital** ou chave única de acesso, e há vários algorítmos e padrões utilizados para transformar suas informações em um código de identidade de acesso a cada login. O JWT é um desses padrões que nos permite realizar essa autenticação na comunicação entre diferentes partes de sistema através de um **token assinado**.

O JWT é um padrão para autenticação segura definido pela RFC7519 e faz parte da faimília JOSE (JSON Object Signing and Encryption), e essa família é composta pelos seguintes integrantes:

- JWT (JSON Web Tokens) -> representa o token propriamente dito; 
- JWS (JSON Web Signature) -> representa a assinatura do token; 
- JWE (JSON Web Encryption) -> representa a assinatura para criptografia do token; 
- JWK (JSON Web Keys) -> representa as chaves para a assinatura; 
- JWA (JSON Web Algorithms) -> representa os algoritmos para assinatura do token.

Um JWT é composto por uma estrutura de 3 partes, separadas por ponto e são divididas como **header.payload.signature**. 

O header é formado por dois dados, o **alg** e o **typ**, o alg é utilizado para informar qual algorítmo foi usado para criar a assinatura e o typ informa o tipo de token (no nosso caso, um JWT). 
O Payload é onde localizamos um objeto JSON com as informações que o token quer transmitir, sendo muitas vezes um email, role, etc... Importante entendermos que o Payload é codificado em Base64 e que qualquer pessoa pode ler seu conteúdo depois de decodificado, o Token garante a autenticidade e não a confidencialidade. Por isso nunca se deve colocar dados sensíveis no Payload, como senhas ou dados importantes. 
Por fim temos o Signature que representa a codificação do Header e do Payload com uma chave secreta armazenada no servidor, utilizando tipo de algorítmo informado no cabeçalho. Isso faz o Signature corresponder matematicamente a cada caracter dentro do Header e do Payload. surgindo algo como 

``` java 

public String codificarEmHS256SHA25() {
    return HS256SHA256(Base64(header) + Base64(payload), secret_key);
}

```