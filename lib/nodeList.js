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
      return handleIf(args);
    }
  }
]

function handleIf(args) {

  if(typeof(args) == "string") return handleIfString(args);

  let results = [];

  if(typeof(args) == "object") {
    results.push(...handleIfLogic(args));
  }

  return results;

}

function handleIfString(str) {
  if(/^!/.test(str)) return `execute unless ${str.replace(/^!/, '')} run `
  return `execute if ${str} run `
}

function handleIfLogic(args) {
  let results = []
  if(args.type.toLowerCase() == "or") {
    results.push(...handleIfOr(args.conds));
  }
  if(args.type.toLowerCase() == "and") {
    results.push(...handleIfAnd(args.conds));
  }
  return results;
}

function handleIfOr(conds) {
  let results = [];

  for(let cond of conds) {
    if(typeof(cond) == "string") results.push(handleIfString(cond))
    else if(typeof(cond) == "object") results.push(...handleIfLogic(cond))
  }

  return results;
}
function handleIfAnd(conds) {
  let results = [""];

  for(let cond of conds) {
    if(typeof(cond) == "string") results = results.map(e => e + handleIfString(cond))
    else if(typeof(cond) == "object")  {
      let returned = handleIfLogic(cond);
      let returns = [];
      for(let i in results) {
        for(let ii in returned) {
          returns.push(results[i] + returned[ii])
        }
      }
      results = returns;
    }
  }
  return results;
}
