function Very_Cold () {
    while (Exercise_Setup == 0) {
        basic.showLeds(`
            # . # . #
            . # # # .
            . . # . .
            . # . # .
            . . . . .
            `)
        basic.showLeds(`
            . . . . .
            . . # . .
            . # # # .
            # . # . #
            . # . # .
            `)
    }
}
radio.onReceivedNumber(function (receivedNumber) {
    Outside_temp = receivedNumber
})
// When A, B, or A+B is pressed, the micro:bit will send a signal to the other micro:bit, which will check the temperature, and send it back to the first micro:bit. A is for Celsius, B is for Fahrenheit, and A+B is for Kelvins.
input.onButtonPressed(Button.A, function () {
    Exercise_Setup = 1
    Temp_unit = 1
    radio.sendString("Temp")
})
function Cold () {
    while (Exercise_Setup == 0) {
        basic.showLeds(`
            # . # . .
            . # # # .
            . . # . #
            . # . # .
            # . . . #
            `)
        basic.showLeds(`
            . . # . #
            . # # # .
            # . # . .
            . # . # .
            # . . . #
            `)
    }
}
function Warm () {
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . # . # .
        . # . # .
        `)
    while (Exercise_Setup == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            . . # . .
            . # . # .
            . # . . .
            `)
        basic.showLeds(`
            . . # . .
            . # # # .
            . . # . .
            . # . # .
            . . . # .
            `)
    }
}
input.onButtonPressed(Button.AB, function () {
    Exercise_Setup = 1
    Temp_unit = 3
    radio.sendString("Temp")
})
radio.onReceivedString(function (receivedString) {
    if (receivedString == "Temp") {
        radio.sendNumber(input.temperature())
    }
})
input.onButtonPressed(Button.B, function () {
    Exercise_Setup = 1
    Temp_unit = 2
    radio.sendString("Temp")
})
// When the micro:bit is shaken, it will have the other micro:bit check the temperature, and the first micro:bit will show a different exercise depending on what the temperature is.
input.onGesture(Gesture.Shake, function () {
    Exercise_Setup = 0
    radio.sendNumber(-303)
})
function Hot () {
    while (Exercise_Setup == 0) {
        basic.clearScreen()
        Playing_Ball.scrollImage(1, 500)
        basic.pause(1000)
    }
}
let Playing_Ball: Image = null
let Temp_unit = 0
let Exercise_Setup = 0
let Outside_temp = 0
Outside_temp = 0
radio.setGroup(1)
Exercise_Setup = 2
Temp_unit = 0
// Setting up the big image used in the playing ball exercise 
Playing_Ball = images.createBigImage(`
    . # . # . . . . # .
    # # # . . # . # # #
    . # . . . . # . # .
    # . # . . . . # . #
    # . # . . . . # . #
    `)
basic.forever(function () {
    while (Exercise_Setup == 1) {
        if (Temp_unit == 1) {
            basic.showNumber(Outside_temp)
        } else if (Temp_unit == 2) {
            basic.showNumber(Outside_temp * 1.8 + 32)
        } else if (Temp_unit == 3) {
            basic.showNumber(Outside_temp + 273.15)
        }
    }
    while (Exercise_Setup == 0) {
        if (Outside_temp < 0) {
            Very_Cold()
        } else if (Outside_temp >= 0 && Outside_temp < 15) {
            Cold()
        } else if (Outside_temp >= 15 && Outside_temp < 30) {
            Warm()
        } else if (Outside_temp >= 30) {
            Hot()
        }
    }
    while (Exercise_Setup == 2) {
        basic.clearScreen()
    }
})
