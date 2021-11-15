module.exports = [
  {
    type: 'confirm',
    name: 'shortcut',
    message: 'Would you like to take the shortcut?',
    default: true
  },
  {
    type: 'confirm',
    name: 'dynapp-wc',
    message: 'Would you like to add DynApp Webcomponents plugin?',
    default: true,
    when: ({shortcut}) => shortcut
  },
  {
    type: 'confirm',
    name: 'dynapp',
    message: 'Would you like to add DynApp plugin?',
    default: true,
    when: ({shortcut}) => shortcut
  },
  {
    type: 'confirm',
    name: 'dynapp-patch',
    message: 'Would you like to add D-Patch?',
    default: true,
    when: ({shortcut}) => shortcut
  },
  {
    type: 'confirm',
    name: 'dync',
    message: 'Would you like to set this up as a Dync?',
    default: true,
    when: ({shortcut}) => shortcut
  },
  {
    type: 'input',
    name: 'dpatchId',
    message: 'D-Patch Id (Leave empty to use project name)',
    when: ({dync}) => dync
  }
]
