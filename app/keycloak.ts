import Keycloak from 'keycloak-js'

// noinspection SpellCheckingInspection
const keycloak = new Keycloak({
  url: 'http://localhost:9090',
  realm: 'norman',
  clientId: 'risks-ui',
})

export default keycloak