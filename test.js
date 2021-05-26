const ts = require('typescript')

function compile(roots, options) {
  const program = ts.createProgram(roots, options)
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });
  if (allDiagnostics.length > 0) {
    process.exitCode = 1
  }
}

compile(['./index.ts', './lib/dev.ts'], { target: ts.ScriptTarget.ES2020, lib: ['lib.es2020.full.d.ts', 'lib.webworker.d.ts'], module: ts.ModuleKind.CommonJS, esModuleInterop: true, skipLibCheck: true })

process.exit();