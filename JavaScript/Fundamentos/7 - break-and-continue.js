for (let i = 1; i <= 100; i++) {
    if(i % 3 == 0 && i % 7 == 0) {
        break; // Finaliza o FOR
    } else if(i % 2 == 0) {
        continue; // Pula o resto da execução e passa para o próximo número no contador
    }
    console.log(`Número válido: ${i}`);
}