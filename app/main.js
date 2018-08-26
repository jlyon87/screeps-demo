var roleHarvester = require('./creep/harvester')
var roleUpgrader = require('./creep/upgrader')
var roleBuilder = require('./creep/builder')

module.exports.loop = function () {
  for (var name in Game.creeps) {
    var creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep)
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep)
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep)
    }
  }
}
