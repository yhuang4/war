import { shuffleDeck, dealDeck, simulateGame } from './game.ts'
import { Queue } from '@datastructures-js/queue';

test('Shuffled deck should be different', () => {
    const arr = [1,2,3,4,5,6,7]
    const arrClone = [...arr]
    expect(shuffleDeck(arrClone)).not.toEqual(arr);
})

test('Cards dealt should be different each time', () => {
    let p1, p2, p3, p4;
    [p1, p2] = dealDeck();
    [p3, p4] = dealDeck();
    
    expect(p1.toArray()).not.toEqual(p3.toArray());
    expect(p2.toArray()).not.toEqual(p4.toArray());
})

test('Game simulation same hands', () => {
    let d1 = Queue.fromArray([1,2,3]);
    let d2 = Queue.fromArray([1,2,3]);
    expect(simulateGame(d1, d2)).toBe(0);
})

test('Game simulation 1 wins all', () => {
    let d1 = Queue.fromArray([3,4,5]);
    let d2 = Queue.fromArray([1,2,3]);
    expect(simulateGame(d1, d2)).toBe(1);
})

test('Game simulation no wars', () => {
    let d1 = Queue.fromArray([3,4,5]);
    let d2 = Queue.fromArray([1,6,7]);
    expect(simulateGame(d1, d2)).toBe(2);
})

test('Game simulation basic war', () => {
    let d1 = Queue.fromArray([1,2,3]);
    let d2 = Queue.fromArray([1,4,5]);
    expect(simulateGame(d1, d2)).toBe(2);
})

test('Game simulation extended war', () => {
    let d1 = Queue.fromArray([1,0,3,0,7]);
    let d2 = Queue.fromArray([1,0,3,0,2]);
    expect(simulateGame(d1, d2)).toBe(1);
})

test('Game simulation normal rounds and wars', () => {
    let d1 = Queue.fromArray([1,2,0,9]);
    let d2 = Queue.fromArray([2,2,0,7]);
    expect(simulateGame(d1, d2)).toBe(1);
})

test('Game simulation both out of cards during war', () => {
    let d1 = Queue.fromArray([1,2,3,4]);
    let d2 = Queue.fromArray([1,9,3,7]);
    expect(simulateGame(d1, d2)).toBe(0);
})