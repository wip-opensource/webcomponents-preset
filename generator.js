const process = require('process');
const {exec} = require('child_process');

const promise_exec = (command, cwd) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Use a short timeout for output to come in correct order
      var subprocess = exec(command, {cwd, timeout: 60000}, (error) => {
        subprocess.stdout.removeListener('data', proxyOutput);
        subprocess.stderr.removeListener('data', proxyError);
        process.stdin.removeListener('data', proxyInput);
        process.stdin.pause();
        if (error) {
          reject();
        } else {
          resolve();
        }
      });

      var proxyInput = (data) => {
        subprocess.stdin.write(data);
      };

      var proxyOutput = (data) => {
        process.stdout.write(data);
      };

      var proxyError = (data) => {
        process.stderr.write(data);
      };

      subprocess.stdout.on('data', proxyOutput);
      subprocess.stderr.on('data', proxyError);
      process.stdin.resume();
      process.stdin.on('data', proxyInput);
    }, 10);
  });
}

const queue_exec = (commands, cwd) => {
  return new Promise((resolve, reject) => {
    var command = commands[0];
    if (!command) {
      resolve();
    } else {
      process.stdout.write(`\n${command} ...\n`);
      promise_exec(command, cwd).then(
        () => {
          queue_exec(commands.slice(1), cwd).then(resolve, reject);
        },
        () => {
          console.log(`Failed:\n${commands.map(c => '"'+c+'"').join('\n')}\n`);
          reject();
        }
      );
    }
  });

};

module.exports = (api, options, rootOptions) => {
  var optionals = [
    {
      id: 'dynapp-wc',
      devDependencies: {
        'vue-cli-plugin-dynapp-wc': 'wip-opensource/vue-cli-plugin-dynapp-wc'
      },
      commands: [
        'vue invoke dynapp-wc --replaceComponents=y',
      ]
    },
    {
      id: 'dynapp',
      devDependencies: {
        'vue-cli-plugin-dynapp': 'wip-opensource/vue-cli-plugin-dynapp'
      },
      commands: [
        'vue invoke dynapp'
      ]
    },
    {
      id: 'dynapp-patch',
      devDependencies: {
        'vue-cli-plugin-dynapp-patch': 'git+ssh://hg.wip.se//usr/local/lib/git/vue-cli-plugin-dynapp-patch.git'
      },
      commands: [
        'vue invoke dynapp-patch'
      ]
    },
    {
      id: 'dync',
      devDependencies: {
        'vue-cli-plugin-dync': 'git+ssh://hg.wip.se//usr/local/lib/git/vue-cli-plugin-dync.git'
      },
      commands: [
        `vue invoke dync --dpatchId="${options.dpatchId || rootOptions.projectName}"`
      ]
    }
  ];

  var dependencies = {};
  var devDependencies = {};
  var commands = [];
  optionals.forEach((optional) => {
    if (options[optional.id]) {
      if (optional.dependencies) {
        dependencies = {...dependencies, ...optional.dependencies};
      }
      if (optional.devDependencies) {
        devDependencies = {...devDependencies, ...optional.devDependencies};
      }
      if (optional.commands) {
        commands = commands.concat(optional.commands);
      }
    }
  });

  api.extendPackage({
    dependencies: dependencies,
    devDependencies: devDependencies,
    eslintConfig: {
      rules: {
        "vue/require-v-for-key": 'off',
        'no-unused-vars': api.makeJSOnlyValue(`process.env.NODE_ENV === 'development' ? 'off' : 'warn'`),
        'vue/no-unused-components': api.makeJSOnlyValue(`process.env.NODE_ENV === 'development' ? 'off' : 'warn'`),
      }
    }
  });

  api.onCreateComplete(() => {
    if (commands.length > 0) {
      queue_exec(commands, `./${rootOptions.projectName}`).then(
        () => {
          console.log('\nCompleted!');
        },
        () => {
          console.log('\nFailed');
        }
      );
    }
  });
}
