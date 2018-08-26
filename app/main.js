const creepGen = require('creep.generator')

const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')

module.exports.loop = function () {
  const creepCount = {
    harvester: 0,
    upgrader: 0,
    builder: 0
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep)
      creepCount.harvester++
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep)
      creepCount.upgrader++
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep)
      creepCount.builder++
    }
  }

  const energy = Game.spawns['Pekkerwood'].energy
  console.log('energy', energy)
  if (energy >= 200) {
    if (creepCount.harvester <= creepCount.upgrader && creepCount.harvester <= creepCount.builder) {
      creepGen.createHarvester(`Harvester${creepCount.harvester}`)
    } else if (creepCount.builder < .33*creepCount.harvester && creepCount.builder <= creepCount.upgrader) {
      creepGen.createBuilder(`Harvester${creepCount.builder}`)
    } else if (creepCount.upgrader < .33 * creepCount.harvester && creepCount.upgrader <= creepCount.builder) {
      creepGen.createUpgrader(`Harvester${creepCount.upgrader}`)
    }
  }
}
