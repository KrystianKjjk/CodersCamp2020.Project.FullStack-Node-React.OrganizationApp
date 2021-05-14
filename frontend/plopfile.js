module.exports = (plop) => {
  plop.setGenerator('component', {
    description: 'Create a component',
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: 'input',
        // Variable name for this input
        name: 'name',
        // Prompt to display on command line
        message: 'What is your component name?',
      },
      {
        // Which allows your plop file to be placed in the correct location
        type: 'input',
        name: 'destinationpath',
        message: 'What is destination path?',
        default: 'src/components',
      },
    ],
    actions: [
      {
        // Add a new file
        type: 'add',
        // Path for the new file
        path: '{{destinationpath}}/{{pascalCase name}}/{{pascalCase name}}.tsx',
        // Handlebars template used to generate content of new file
        templateFile: 'src/plop-templates/Component/Component.hbs',
      },
      {
        type: 'add',
        path:
          '{{destinationpath}}/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
        templateFile: 'src/plop-templates/Component/Component.test.hbs',
      },
      {
        type: 'add',
        path: '{{destinationpath}}/{{pascalCase name}}/index.ts',
        templateFile: 'src/plop-templates/Component/index.hbs',
      },
      {
        type: 'add',
        path:
          '{{destinationpath}}/{{pascalCase name}}/{{pascalCase name}}.module.css',
        templateFile: 'src/plop-templates/Component/Component.module.css.hbs',
      },
      {
        type: 'add',
        path:
          '{{destinationpath}}/{{pascalCase name}}/{{pascalCase name}}Slice.ts',
        templateFile: 'src/plop-templates/Component/ComponentSlice.hbs',
      },
      {
        type: 'add',
        path:
          '{{destinationpath}}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx',
        templateFile: 'src/plop-templates/Component/Component.stories.hbs',
      },
    ],
  })
}
