const consoleStyles = require('./consoleStyles.js');

module.exports = [
  {
    type: "command",
    last: true
  },
  {
    type: "comment",
    last: true
  },
  {
    type: "newline",
    last: true
  },
  {
    type: "as",
    run: (args) => {
      if(typeof(args) == 'string') return "execute as " + args + " run "
      if(Array.isArray(args)) {
        let returns = [];
        for(let i in args) {
          returns.push("execute as " + args[i] + " run ")
        }
        return returns
      }
    }
  },
  {
    type: "at",
    run: (args) =>{
      if(typeof(args) == 'string') return "execute at " + args + " run "
      if(Array.isArray(args)) {
        let returns = [];
        for(let i in args) {
          returns.push("execute at " + args[i] + " run ")
        }
        return returns
      }}
  },
  {
    type: "asat",
    run: (args) => {
      if(typeof(args) == 'string') return "execute as " + args + " at @s run "
      if(Array.isArray(args)) {
        let returns = [];
        for(let i in args) {
          returns.push("execute as " + args[i] + " at @s run ")
        }
        return returns
      }
    }
  },
  {
    type: "align",
    run: (args) => {
      if(typeof(args) == 'string') return "execute align " + args + " run ";
      if(Array.isArray(args)) return "execute align " + args.join('') + " run ";
    }
  },
  {
    type: "anchored",
    run: (args) => "execute anchored " + args + " run "
  },
  {
    type: "facing",
    run: (args) => "execute facing " + args + " run "
  },
  {
    type: "in",
    run: (args) => "execute in " + args + " run "
  },
  {
    type: "positioned",
    run: (args) => "execute positioned " + args + " run "
  },
  {
    type: "rotated",
    run: (args) => "execute rotated " + args + " run "
  },
  {
    type: "store",
    run: (args) => "execute store " + args + " run "
  },
  {
    type: "if",
    run: (args) => {
      if(typeof(args) == 'string') {
        if(/^!/.test(args)) return "execute unless " + args.replace(/^!/, '') + " run ";
        return "execute if " + args + " run ";
      }
      if(Array.isArray(args)) {
        let returns = [];
        for(let arg of args) {
          if(typeof(arg) == 'string') {
            if(/^!/.test(arg)) returns.push("execute unless " + arg.replace(/^!/, '') + " run ");
            else returns.push("execute if " + arg + " run ");
          } else if(Array.isArray(arg)) {
            let combined = [];
            for(let i in arg) {
              if(/^!/.test(arg[i])) combined.push("execute unless " + arg[i].replace(/^!/, '') + " run ");
              else combined.push("execute if " + arg[i] + " run ");
            }
            returns.push(combined.join(''));
          }
        }
        return returns;
      }
    }
  }
]
