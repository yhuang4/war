import { playGame } from './game.ts'

test('playGame', () => {
    expect(
        playGame()
    ).toBe(1)
})