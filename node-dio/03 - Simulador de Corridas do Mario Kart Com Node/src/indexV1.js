
const player1 = {
    NOME : "Mário",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0,
};

const player2 = {
    NOME : "Peach",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 2,
    PONTOS : 0,
};

const player3 = {
    NOME : "Yoshi",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 4,
    PODER : 3,
    PONTOS : 0,
};

const player4 = {
    NOME : "Bowser",
    VELOCIDADE : 5,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0,
};

const player5 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0,
};

const player6 = {
    NOME : "Donkey Kong",
    VELOCIDADE : 2,
    MANOBRABILIDADE : 2,
    PODER : 5,
    PONTOS : 0,
};

const racers = [
    player1,
    player2,
    player3,
    player4,
    player5,
    player6
];

//SORTEIA OPONENTE
async function rollDice() {
    return cpu = Math.floor(Math.random() * 6) + 1;
    //console.log(Math.floor(Math.random() * 6) + 1);
    
}

//EVITA REPETIR OS CORREDORES 
async function noRepeat() {
    //console.log(`player ${p1}`);
    //console.log(`${c1}`);
    if (racers[p1].NOME!==racers[cpu-1].NOME){
        //console.log(cpu);
        //console.log(player1.NOME);
        //c1 = racers[cpu-1].NOME;
        c1 = cpu-1;
        //console.log(`Oponente ${c1}`);
        console.log(`Oponente ${racers[c1].NOME}`);
    }
        
}

x = 0;
p1 = -1;
c1 = -1;

//SORTEIA OPONENTE E VERIFICA SE ELE É DIFERENTE DO QUE O JOGADOR SELECIONOU
function cpuPlayer() {
    //console.log(`${p1} = p1`);
    while (p1===c1){
        rollDice();
        noRepeat();
    }
    //console.log(`${c1} = c1`);
    return c1;
}

//CHAMADA PARA ESCOLHA DO JOGADOR
async function selectPlayer() {
    return new Promise( async resolve => {
        while (p1 < 0 || p1 > 5){
            //console.log("erro");
            await validPlayer();
        }
        if(p1 >= 0 && p1 <= 5){
            //console.log("RESOLVE2");
            resolve();
        }
    }, 500);
}

//JOGADOR ESCOLHE + FEITA VERIFICACAO SE VALIDA
async function validPlayer() {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        if (x === 0) {
            readline.question(`
                1 - Mário
                2 - Peach
                3 - Yoshi
                4 - Bowser
                5 - Luigi
                6 - Donkey Kong\n
                Escolha o Seu Personagem ->`, async num1 => {
                x =+1;
                if (num1 === "") {
                    //console.log("VAZIO");
                    num1 = 1;
                    //console.log(p1);
                    p1 = 0;
                    //console.log(p1);
                } else {
                    //console.log(p1);
                    p1 = Number(num1-1);
                }
                //p1 = Number(num1-1)
    
                if (p1 >= 0 && p1 <= 5) {
                    readline.close();
                    //console.log("RESOLVE");
                    resolve();
                } else {
                    console.clear();
                    readline.close();
                    //await selectPlayer2();
                    await validPlayer();
                    resolve();
                }
                c1 = p1;
                //console.log(c1);
            });
        }
        //console.log("x");
        //console.log(x);
        if (x > 0){
            //console.log("oi");
            readline.question(`
                1 - Mário
                2 - Peach
                3 - Yoshi
                4 - Bowser
                5 - Luigi
                6 - Donkey Kong\n
                Selecione um jogador válido -> `, async num1 => {
            p1 = Number(num1-1)
                if (p1 >= 0 && p1 <= 5) {
                    readline.close();
                    //console.log("RESOLVE");
                    resolve();
                } else {
                    console.clear();
                    readline.close();
                    await selectPlayer();
                    resolve();
                }
            });
        }
    });
}

//AUTO INVOKE, SEM CHAMADA 'MAIN();'
(async function main(){
    await selectPlayer();    
    console.log(`\nSelecionou ${racers[(p1)].NOME}`);
    c1 = cpuPlayer();
    setTimeout(function() {
        //EMOJI 'Windows + .'
        console.log(`\n🏁 🚦 Corrida Entre ${racers[(p1)].NOME} e ${racers[(c1)].NOME} Começando...\n`);
    }, 2000);
    
})();
