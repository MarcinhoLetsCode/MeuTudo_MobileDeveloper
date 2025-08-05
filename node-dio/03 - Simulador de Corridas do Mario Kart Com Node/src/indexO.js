/*console.log("A Corrida Está Começando!...");

setTimeout(function() {
    console.clear();
}, 2000); // Limpa após 2 segundos (2000 milissegundos)

setTimeout(function() {
    console.log("Selecione o Seu jogador");
}, 2000);

setTimeout(function() {
    console.clear();
}, 4000); */

p1 = 1;
async function selectPlayer() {
    return new Promise( async resolve => {
        //if (p1 < 0 || p1 >5){
        //await validaPlayer();
        while (p1 !== 0 ){
            console.log("erro");
            await validaPlayer();
        } //else {
            if(p1 === 0){

            //console.log("RESOLVE2");
            resolve();
            }
        //}
    }, 500);
}

async function validaPlayer() {
    return new Promise(resolve => {
        x=0;
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(`Escolha o Seu Personagem -> `, async num1 => {
                p1 = Number(num1-1)
                    //setTimeout(function() {
                    console.log(x)
                    x += 1;
                    //}, 100);
    
                    if (p1 === 0) {
                        readline.close();
                        console.log("RESOLVE");
                        resolve();
                    } else {
                        readline.close();
                        await selectPlayer();
                        resolve();
                    }
                    
                });
    });
  
}

(async function main(){
    await selectPlayer();
    console.log(`🏁 🚦 Corrida Entre  e  Começando...\n`);
})();
