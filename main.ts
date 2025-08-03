let score = 0
let runCount = 0
let aPressCount = 0
let bPressCount = 0
let hand = 0
input.onLogoEvent(TouchButtonEvent.LongPressed, function () {
    basic.clearScreen()
    music.stopAllSounds()
    score = 0
    runCount = 0
    aPressCount = 0
    bPressCount = 0
})
input.onButtonPressed(Button.A, function () {
    score += 1
    aPressCount += 1
})
input.onButtonPressed(Button.AB, function () {
    // count the game round
    runCount += 1
    hand = randint(1, 3)
    basic.showNumber(54321)
    if (hand == 1) {
        basic.showLeds(`
            . . . . .
            . # # # .
            . # # # .
            . # # # .
            . . . . .
            `)
    } else if (hand == 2) {
        basic.showLeds(`
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            # # # # #
            `)
    } else if (hand == 3) {
        basic.showIcon(IconNames.Scissors)
    }
    basic.pause(5000)
    basic.clearScreen()
    // Check if 5 runs are completed
    if (runCount == 5) {
        basic.clearScreen()
        music.stopAllSounds()
        if (aPressCount >= bPressCount) {
            music.play(music.stringPlayable("- - - - C5 C5 B C5 ", 301), music.PlaybackMode.UntilDone)
        } else {
            basic.showString("I lost")
            music.play(music.stringPlayable("- - - - C C D C ", 301), music.PlaybackMode.UntilDone)
        }
        // Reset everything for a new round
        score = 0
        runCount = 0
        aPressCount = 0
        bPressCount = 0
    }
})
input.onButtonPressed(Button.B, function () {
    score += -1
    bPressCount += 1
})
input.onGesture(Gesture.Shake, function () {
    basic.showString("ready?")
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    basic.showString("okay, press A+B")
})
