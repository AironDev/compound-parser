const {parse, flatten} = require('../src/molecular')
import test from 'ava';

test('parse simple compound', t => {
  let compound = 'NaOH'
  t.deepEqual(parse(compound), {Na: 1, O: 1, H: 1})
})

test('parse compound with groups', t => {
  let compound = 'CH3(CH2)3OH'
  t.deepEqual(parse(compound), {C: 4, H: 10, O: 1})
})

test('parse allow decimal', t => {
  let compound = 'CH0.2(CH0.1)0.3CH3'
  t.deepEqual(parse(compound), {C: 2.3, H: 3.23})
})

// test('groups return list of one item while no parentheses', t => {
test('flatten return same compound while no parentheses', t => {
  let compound = 'NaOH'
  t.is(flatten(compound), 'NaOH')
})

test('flatten compound while group', t => {
  let compound = 'CH3(CH2)3OH'
  t.is(flatten(compound), 'CH3C3H6OH')
})

test('flatten allow decimal', t => {
  let compound = 'CH0.2(CH0.1)0.3CH3'
  t.is(flatten(compound), 'CH0.2C0.3H0.03CH3')
})

test('flatten component with nested groups', t => {
  let compound = 'TiCl2-[(CH3)2P(CH2)2P(CH3)2]2'
  t.is(flatten(compound), 'TiCl2C4H12P2C4H8P2C4H12')
})

