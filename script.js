var status_game_text = document.getElementById('status')
var jogador_atual_text = document.getElementById('Jogada')

var vitorias_x = 0
var vitorias_o = 0

let CurretPlayer = 'X'
jogador_atual_text.innerHTML = `Vez do jogador: <span id="Jogada-destaque"> ${CurretPlayer}</span>`

function marcar(indice) {
    var celula = document.querySelector('[data-index="' + indice + '"]')
    if (celula && celula.innerText == '') {
        celula.innerText = CurretPlayer
        if (CurretPlayer == 'X') {
            CurretPlayer = 'O'
            verificarVencedor()
        } else {
            CurretPlayer = 'X'
            verificarVencedor()
        }
    } else {
        console.log('Celula não encontrada')
    }
    jogador_atual_text.innerHTML = `Vez do jogador: <span id="Jogada-destaque"> ${CurretPlayer}</span>`
}

function Resetar() {
    var celula = document.querySelectorAll('.cell')
    if (celula) {
        for (var i in celula) {
            celula[i].innerText = ''
            console.log('Partida Resetada')
        }

    } else {
        console.log('ERRO 404 NOT FOUND | ' + celula)
    }
}

function verificarVencedor() {
    const colum1 = document.querySelectorAll('[colum="1"]')
    const colum2 = document.querySelectorAll('[colum="2"]')
    const colum3 = document.querySelectorAll('[colum="3"]')

    const linha1 = document.querySelectorAll('[linha="1"]')
    const linha2 = document.querySelectorAll('[linha="2"]')
    const linha3 = document.querySelectorAll('[linha="3"]')

    const colums = {
        'colum1': colum1,
        'colum2': colum2,
        'colum3': colum3
    }

    const linhas = {
        'linha1': linha1,
        'linha2': linha2,
        'linha3': linha3
    }

    // Verificar Colunas
    for (c = 1; c < 4; c++) {
        // Verificar X
        if (colums['colum' + c][0].innerText == 'X') {
            if (colums['colum' + c][1].innerText == 'X') {
                if (colums['colum' + c][2].innerText == 'X') {
                    console.log('Vitoria pelas colunas => X')
                    Resetar()
                    status_game('X')
                }
            }
        }
        // Verificar O
        if (colums['colum' + c][0].innerText == 'O') {
            if (colums['colum' + c][1].innerText == 'O') {
                if (colums['colum' + c][2].innerText == 'O') {
                    console.log('Vitoria pelas colunas => O')
                    Resetar()
                    status_game('O')
                }
            }
        }
    }

    // Verificar Linhas
    for (l = 1; l < 4; l++) {
        // Verificar X
        if (linhas['linha' + l][0].innerText == 'X') {
            if (linhas['linha' + l][1].innerText == 'X') {
                if (linhas['linha' + l][2].innerText == 'X') {
                    console.log('Vitoria Reta => X')
                    Resetar()
                    status_game('X')
                }
            }
        }
        // Verificar O
        if (linhas['linha' + l][0].innerText == 'O') {
            if (linhas['linha' + l][1].innerText == 'O') {
                if (linhas['linha' + l][2].innerText == 'O') {
                    console.log('Vitoria Reta => O')
                    Resetar()
                    status_game('O')
                }
            }
        }
    }

    // Verificar Diagonais 
    //#region Verificar Diagonais Superior - Inferiores \\
    // Verificar X 

    if (linhas['linha' + 1][0].innerText == 'X') {
        if (linhas['linha' + 2][1].innerText == 'X') {
            if (linhas['linha' + 3][2].innerText == 'X') {
                console.log('Vitoria Diagonal Superior => X')
                Resetar()
                status_game('X')

            }
        }
    }

    // verificar O
    if (linhas['linha' + 1][0].innerText == 'O') {
        if (linhas['linha' + 2][1].innerText == 'O') {
            if (linhas['linha' + 3][2].innerText == 'O') {
                console.log('Vitoria Diagonal Superior => O')
                Resetar()
                status_game('O')
            }
        }
    }
    //#endregion


    //#region Verificar Diagonais Inferiores - Superior \\
    if (linhas['linha' + 3][0].innerText == 'X') {
        if (linhas['linha' + 2][1].innerText == 'X') {
            if (linhas['linha' + 1][2].innerText == 'X') {
                console.log('Vitoria Diagonal Inferior => X')
                Resetar()
                status_game('X')
            }
        }
    }

    if (linhas['linha' + 3][0].innerText == 'O') {
        if (linhas['linha' + 2][1].innerText == 'O') {
            if (linhas['linha' + 1][2].innerText == 'O') {
                console.log('Vitoria Diagonal Inferior => O')
                Resetar()
                status_game('O')
            }
        }
    }
    //#endregion

    // Verificar Empate
    var num_celulas_cheias = 0
    for (c = 1; c < 4; c++) {
        for (cn = 1; cn < 4; cn++) {
            if (colums['colum' + c][0].innerText != '' && linhas['linha' + c][0].innerText != '') {
                if (colums['colum' + c][1].innerText != '' && linhas['linha' + c][1].innerText != '') {
                    if (colums['colum' + c][2].innerText != '' && linhas['linha' + c][2].innerText != '') {
                        num_celulas_cheias++
                    }
                }
            }
        }
    }

    if (num_celulas_cheias >= 5) {
        console.log('Empate')
        Resetar()
    }
}

document.querySelectorAll('.cell').forEach(item => {
    item.addEventListener('click', event => {
        var indiceDaCelula = event.target.getAttribute('data-index')
        marcar(indiceDaCelula)
    })
})

function status_game(vencedor = '') {
    if (vencedor == 'X') {
        vitorias_x++
    } else if (vencedor == 'O') {
        vitorias_o++
    } else {
        alert('404 NOT FOUND | Vencedor Não Encontrado')
    }

    status_game_text.innerText = 'X = ' + vitorias_x + ' | O = ' + vitorias_o
}
