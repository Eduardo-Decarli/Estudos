# Boas Práticas e Armadilhas a Evitar no Spring Security

Agora que cobrimos os conceitos fundamentais e configurações do Spring Security, vamos explorar boas práticas de segurança e armadilhas comuns que devem ser evitadas.

## Boas Práticas no Spring Security

1️⃣ **Sempre usar BCryptPasswordEncoder ou equivalente:** Senhas nunca devem ser armazenadas em texto plano. Sempre utilize um algoritmo seguro para hashing.
2️⃣ **Manter o SecurityContextHolder seguro:** O SecurityContextHolder armazena informações do usuário autenticado. É essencial protegê-lo para evitar roubo de sessão.
3️⃣ **Restringir permissões de endpoints sensíveis:** Evite deixar endpoints administrativos abertos ou acessíveis a qualquer usuário.
