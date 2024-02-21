const process = require('process');
const { Z_ASCII } = require('zlib');
const commands = require('./commands/index.js');

function bash() {
   process.stdout.write("prompt > ")
   process.stdin.on("data", function (data) {
      const args = data.toString().trim()
      const [cmd, ...Arrtext] = args.split(" ")
      const text = Arrtext.join(" ");

      //? Si exisite el comando
      if (commands[cmd]) {
         commands[cmd](print, text)
      } else {
         print(`command not found: ${cmd}`)
      }
   })
}

function print(output) {
   process.stdout.write(output)
   process.stdout.write("\nprompt > ")

}
bash();
module.exports = {
   print,
   bash,
};
