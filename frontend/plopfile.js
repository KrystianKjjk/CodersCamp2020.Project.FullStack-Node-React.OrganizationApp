module.exports = plop => {
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
            message: 'What is your component name?'
        },
      ],
        actions: [
        {
          // Add a new file
          type: 'add',
          // Path for the new file
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          // Handlebars template used to generate content of new file
          templateFile: 'src/plop-templates/Component/Component.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
            templateFile: 'src/plop-templates/Component/Component.test.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/index.tsx',
            templateFile: 'src/plop-templates/Component/index.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.css',
            templateFile: 'src/plop-templates/Component/Component.css.hbs',
        },
      ],
    });

    plop.setGenerator('component-redux', {
        description: 'Create a component redux',
        prompts: [
        {
            type: 'input',
            name: 'name',
            message: 'What is your component name?'
        },
      ],
        actions: [
        {
          type: 'add',
          path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.tsx',
          templateFile: 'src/plop-templates/ComponentRedux/Component.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.test.tsx',
            templateFile: 'src/plop-templates/ComponentRedux/Component.test.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/index.tsx',
            templateFile: 'src/plop-templates/ComponentRedux/index.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/index.tsx',
            templateFile: 'src/plop-templates/ComponentRedux/index.hbs',
        },
        {
            type: 'add',
            path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.css',
            templateFile: 'src/plop-templates/ComponentRedux/Component.css.hbs',
        },
      ],
    });
  };