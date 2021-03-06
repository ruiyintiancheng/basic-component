// import stop from '@/assets/flowPng/stop.png'
import error from './flowPng/error.png'
import run from './flowPng/run.png'
// import threadWaiting from './flowPng/threadWaiting.png'
import reRun from './flowPng/reRun.png'
// import calculationWaiting from './flowPng/calculationWaiting.png'
// import reStart from './flowPng/reStart.png'
import noRecalculated from './flowPng/noRecalculated.png'
import noCalculated from './flowPng/noCalculated.png'
import success from './flowPng/success.png'
import start from './flowPng/start.png'
import end from './flowPng/end.png'
import java from './flowPng/java.png'
// import conditions from './flowPng/conditions.png'
import judge from './flowPng/join.png'
import load from './flowPng/load.png'

// 左下角 子任务图标
import jump from './flowPng/jump.png'
import subTask from './flowPng/subTask.png'
import stopHandler from './flowPng/stopHandler.png'
import ignore from './flowPng/ignore.png'

const shapePng = { '0': error, '1': noCalculated, '2': noRecalculated, '3': run, '4': reRun, '5': success }
const processMode = { '0': '', '2': stopHandler, '3': jump, '4': ignore }

export function registG6Shape() {
  window.G6.registerNode('startShape', {
    draw: function(cfg, group) {
      var keyShape
      keyShape = group.addShape('image', {
        attrs: {
          x: cfg.x - 30,
          y: cfg.y - 30,
          width: 60,
          height: 60,
          img: start
        }
      })
      group.addShape('text', { // 标题
        attrs: {
          x: cfg.x,
          y: cfg.y + 45,
          text: cfg.model.title,
          textBaseline: 'top',
          textAlign: 'center',
          fontSize: 16,
          fill: 'black'
        }
      })
      if (cfg.model.calStatus) {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: shapePng[cfg.model.calStatus]
          }
        })
      }
      if (cfg.model.subFlag && cfg.model.subFlag !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x - 40,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: subTask
          }
        })
      }
      if (cfg.model.processMode && cfg.model.processMode !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y - 35,
            width: 25,
            height: 25,
            img: processMode[cfg.model.processMode]
          }
        })
      }
      return keyShape
    },
    getAnchorPoints: function() { // 锚点位置
      return [
        [0.5, 1],
        [1, 0.5],
        [0, 0.5],
        [0.5, 0]
      ]
    }
  })
  window.G6.registerNode('endShape', {
    draw: function(cfg, group) {
      var keyShape
      keyShape = group.addShape('image', {
        attrs: {
          x: cfg.x - 30,
          y: cfg.y - 30,
          width: 60,
          height: 60,
          img: end
        }
      })
      group.addShape('text', { // 标题
        attrs: {
          x: cfg.x,
          y: cfg.y + 45,
          text: cfg.model.title,
          textBaseline: 'top',
          textAlign: 'center',
          fontSize: 16,
          fill: 'black'
        }
      })
      if (cfg.model.calStatus) {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: shapePng[cfg.model.calStatus]
          }
        })
      }
      if (cfg.model.subFlag && cfg.model.subFlag !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x - 40,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: subTask
          }
        })
      }
      if (cfg.model.processMode && cfg.model.processMode !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y - 35,
            width: 25,
            height: 25,
            img: processMode[cfg.model.processMode]
          }
        })
      }
      return keyShape
    },
    getAnchorPoints: function() { // 锚点位置
      return [
        [0.5, 1],
        [1, 0.5],
        [0, 0.5],
        [0.5, 0]
      ]
    }
  })
  window.G6.registerNode('conditionShape', {
    draw: function(cfg, group) {
      var keyShape
      keyShape = group.addShape('image', {
        attrs: {
          x: cfg.x - 30,
          y: cfg.y - 30,
          width: 60,
          height: 60,
          img: java
        }
      })
      group.addShape('text', { // 标题
        attrs: {
          x: cfg.x,
          y: cfg.y + 45,
          text: cfg.model.title,
          // text: 'compute',
          textBaseline: 'top',
          textAlign: 'center',
          fontSize: 16,
          fill: 'black'
        }
      })
      if (cfg.model.calStatus) {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: shapePng[cfg.model.calStatus]
          }
        })
      }
      if (cfg.model.subFlag && cfg.model.subFlag !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x - 40,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: subTask
          }
        })
      }
      if (cfg.model.processMode && cfg.model.processMode !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y - 35,
            width: 25,
            height: 25,
            img: processMode[cfg.model.processMode]
          }
        })
      }
      return keyShape
    },
    getAnchorPoints: function() { // 锚点位置
      return [
        [0.5, 1],
        [1, 0.5],
        [0, 0.5],
        [0.5, 0]
      ]
    }
  })
  window.G6.registerNode('judgeShape', {
    draw: function(cfg, group) {
      var keyShape
      keyShape = group.addShape('image', {
        attrs: {
          x: cfg.x - 30,
          y: cfg.y - 30,
          width: 60,
          height: 60,
          img: judge
        }
      })
      group.addShape('text', { // 标题
        attrs: {
          x: cfg.x,
          y: cfg.y + 45,
          text: cfg.model.title,
          // text: 'compute',
          textBaseline: 'top',
          textAlign: 'center',
          fontSize: 16,
          fill: 'black'
        }
      })
      if (cfg.model.calStatus) {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: shapePng[cfg.model.calStatus]
          }
        })
      }
      if (cfg.model.subFlag && cfg.model.subFlag !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x - 40,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: subTask
          }
        })
      }
      if (cfg.model.processMode && cfg.model.processMode !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y - 35,
            width: 25,
            height: 25,
            img: processMode[cfg.model.processMode]
          }
        })
      }
      return keyShape
    },
    getAnchorPoints: function() { // 锚点位置
      return [
        [0.5, 1],
        [1, 0.5],
        [0, 0.5],
        [0.5, 0]
      ]
    }
  })
  window.G6.registerNode('loadShape', {
    draw: function(cfg, group) {
      var keyShape
      keyShape = group.addShape('image', {
        attrs: {
          x: cfg.x - 30,
          y: cfg.y - 30,
          width: 60,
          height: 60,
          img: load
        }
      })
      group.addShape('text', { // 标题
        attrs: {
          x: cfg.x,
          y: cfg.y + 45,
          text: cfg.model.title,
          // text: 'compute',
          textBaseline: 'top',
          textAlign: 'center',
          fontSize: 16,
          fill: 'black'
        }
      })
      if (cfg.model.calStatus) {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: shapePng[cfg.model.calStatus]
          }
        })
      }
      if (cfg.model.subFlag && cfg.model.subFlag !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x - 40,
            y: cfg.y + 15,
            width: 25,
            height: 25,
            img: subTask
          }
        })
      }
      if (cfg.model.processMode && cfg.model.processMode !== '0') {
        group.addShape('image', {
          attrs: {
            x: cfg.x + 15,
            y: cfg.y - 35,
            width: 25,
            height: 25,
            img: processMode[cfg.model.processMode]
          }
        })
      }
      return keyShape
    },
    getAnchorPoints: function() { // 锚点位置
      return [
        [0.5, 1],
        [1, 0.5],
        [0, 0.5],
        [0.5, 0]
      ]
    }
  })
}

