// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  dynamicFormBaseDevUrl: 'http://max:8080/smartsale/dist/',
  menuUrl: '../mcall?_ROUTINE=%25JMUJSON&_NS=CAV&_LABEL=ZZ',
  sessionInfoUrl: '../mcall?_NS=CAV&_ROUTINE=%25ZCAVWEB&_LABEL=SESSIONINFO',
  usernamePassword: '_USERNAME=AAA&_PASSWORD=4562'
};
