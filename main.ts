function 강한_압력_나쁜자세 () {
    basic.showNumber(압력변화)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        # . . . #
        `)
    basic.pause(200)
    basic.clearScreen()
}
function 현재압력측정 () {
    현재압력값 = Math.round(pins.map(
    pins.analogReadPin(AnalogPin.P1),
    0,
    1023,
    0,
    10
    ))
}
function 압력변화측정 () {
    현재압력측정()
    압력변화 = Math.abs(현재압력값 - 평상시압력)
}
function 평상시압력값측정 () {
    평상시압력 = pins.map(
    pins.analogReadPin(AnalogPin.P0),
    0,
    1023,
    0,
    9
    )
}
function 압력_없음_좋은자세 () {
    basic.showNumber(압력변화)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # . . . #
        # # # # #
        `)
    basic.pause(200)
    basic.clearScreen()
}
function 약한_압력_보통자세 () {
    basic.showNumber(압력변화)
    basic.showLeds(`
        . . . . .
        . # . # .
        . . . . .
        # # # # #
        . . . . .
        `)
    basic.pause(200)
    basic.clearScreen()
}
function 기기표시 () {
    if (압력세기 == 0) {
        압력_없음_좋은자세()
    } else if (압력세기 == 1) {
        약한_압력_보통자세()
    } else {
        강한_압력_나쁜자세()
    }
}
function 압력세기분류 () {
    압력변화측정()
    if (압력변화 <= 1) {
        압력세기 = 0
    } else if (2 <= 압력변화 && 압력변화 <= 4) {
        압력세기 = 1
    } else {
        압력세기 = 2
    }
}
let 압력세기 = 0
let 평상시압력 = 0
let 현재압력값 = 0
let 압력변화 = 0
평상시압력값측정()
basic.forever(function () {
    압력세기분류()
    기기표시()
})
