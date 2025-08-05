
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

async function getRandomBlock(){
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
            result = "CURVA";
            break;    
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName}🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character1, character2){
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        //Sortear Bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)
        
        //ROLLING DICES
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //HABILITY TEST
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            //console.log(`${player1.NOME}🎲 rolou um dado de ${block} ${diceResult1}`);
            //console.log(`${player2.NOME}🎲 rolou um dado de ${block} ${diceResult2}`);

            await logRollResult(
                player1.NOME, 
                "Velocidade", 
                diceResult1, 
                character1.VELOCIDADE
            );

            await logRollResult(
                player2.NOME, 
                "Velocidade", 
                diceResult2, 
                character2.VELOCIDADE
            );

        } else if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                player1.NOME, 
                "Manobrabilidade", 
                diceResult1, 
                character1.MANOBRABILIDADE
            );

            await logRollResult(
                player2.NOME, 
                "Manobrabilidade", 
                diceResult2, 
                character2.MANOBRABILIDADE
            );

        } else if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME}🥊 confrontou com ${character2.NOME}🥊!`);

            await logRollResult(
                player1.NOME, 
                "Poder", 
                diceResult1, 
                character1.PODER
            );

            await logRollResult(
                player2.NOME, 
                "Poder", 
                diceResult2, 
                character2.PODER
            );

            character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 + console.log(`${character1.NOME} ganhou!\n 
                ${character2.NOME} perde ponto`) : 0;
            character1.PONTOS -= powerResult1 < powerResult2 && character1.PONTOS > 0 ? 1 + console.log(`${character2.NOME} ganhou!\n 
                ${character1.NOME} perde ponto`) : 0;
            console.log(
                powerResult1 === powerResult2
                ? "Confronto empatado, ninguém perde ponto!"
                : ""
            );

            /* if (powerResult1 > powerResult2) {
                console.log(`${character1.NOME} ganhou!`);
                if (character2.PONTOS > 0) {
                    console.log(`${character2.NOME} perde ponto`);
                    character2.PONTOS--;

                }
            } else if (powerResult1 < powerResult2) {
                console.log(`${character2.NOME} ganhou!`);
                if (character2.PONTOS > 0) {
                    console.log(`${character2.NOME} perde ponto`);
                    character1.PONTOS--;
                }
            } else if (powerResult1 === powerResult2) {
                console.log(`Confronto empatado, ninguém perde ponto!`);
            } */
        }

        // VERIFICANDO O VENCEDOR
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`${character2.NOME} marcou um ponto!`);
            character2.PONTOS++;
        } else if (totalTestSkill1 != 0 && totalTestSkill2 != 0) {
            console.log(`${character1.NOME} e ${character2.NOME} empataram!`);
            console.log("Ninguém marcou!");
        }

        console.log("----------------------------------------------------------------------------------------");
    }
}

//AUTO INVOKE, SEM CHAMADA 'MAIN();'
(async function main(){
    //await selectPlayer();    
    //console.log(`\nSelecionou ${racers[(p1)].NOME}`);
    //c1 = cpuPlayer();
    //setTimeout(function() {
        //EMOJI 'Windows + .'
        //console.log(`\n🏁 🚦 Corrida Entre ${racers[(p1)].NOME} e ${racers[(c1)].NOME} Começando...\n`);
    //}, 2000);

    console.log(`\n🏁 🚦 Corrida Entre ${player1.NOME} e ${player2.NOME} Começando...\n`);

    await playRaceEngine(player1, player2);
    
})();
