const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
// 转换成语法树
const traverse = require("@babel/traverse").default;

const babel = require("@babel/core"); // 把es6 -> es5

// 分析单个模块
function getModuleInfo(file) {
  // import

  //   1. 读取文件
  const body = fs.readFileSync(file, "utf-8");
  // 2. 转换语法树AST
  //   ref https://zzastexplorer.net
  const ast = parser.parse(body, {
    sourceType: "module",
  });
  //   console.log("ast", ast);
  //   3. 收集依赖
  const deps = {};
  traverse(ast, {
    // visitor
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file);
      const abspath = "./" + path.join(dirname, node.source.value);
      deps[node.source.value] = abspath;
    },
  });
  //   4. ES6->ES5
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  const moduleInfo = {
    file, //文件名
    deps, //依赖
    code, //加工完的代码
  };
  return moduleInfo;
}

// const info = getModuleInfo("./src/index.js");
// console.log("info", info);

/**
 * 模块解析
 * @param {*} file
 */
function parseModules(file) {
  const entry = getModuleInfo(file);
  const temp = [entry];
  const depsGraph = {};
  //   console.log("1", temp);
  getDeps(temp, entry); // 递归获取依赖的函数
  //   console.log("2", temp);

  temp.forEach((info) => {
    depsGraph[info.file] = {
      deps: info.deps,
      code: info.code,
    };
  });
  return depsGraph;
}

function getDeps(temp, { deps }) {
  Object.keys(deps).forEach((key) => {
    const child = getModuleInfo(deps[key]);
    temp.push(child); // 这里temp相当于个引用，此处的修改会对外部有影响
    getDeps(temp, child);
  });
}

// const content = parseModules("./src/index.js");
// console.log("content", content);

function bundle(file) {
  // 以后要用eval的，所以这里stringify了
  const depsGraph = JSON.stringify(parseModules(file));

  return `(function(graph){
	  function require(file){
		  function absRequire(relPath){
			  return require(graph[file].deps[relPath])
		  }
		  var exports = {};
		  (function(require,exports,code){
			  eval(code)
		  })(absRequire,exports,graph[file].code)
		  return exports;
	  }
	  require('${file}')
  })(${depsGraph})`;
}

const content = bundle("./src/index.js");
!fs.existsSync("./dist") && fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
