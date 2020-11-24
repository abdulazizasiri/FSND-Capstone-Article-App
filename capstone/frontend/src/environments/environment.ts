/* @TODO replace with your variables
 * ensure all variables on this page match your project
 */

export const environment = {
  production: false,
  apiServerUrl: 'http://127.0.0.1:5000', // the running FLASK api server url
  auth0: {
    url: 'blog-authentication-service.us', // the auth0 domain prefix
    audience: 'blogapp', // the audience set for the auth0 app
    clientId: 'c8vEs4OuU000G96I3U0gf64GIA5eXDG4', // the client id generated for the auth0 app
    callbackURL: 'http://localhost:4200', // the base url of the running ionic application.
  }
};
