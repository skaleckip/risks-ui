import Keycloak from 'keycloak-js'

// noinspection SpellCheckingInspection
const keycloak = new Keycloak({
  url: import.meta.env.KEYCLOAK_URL ?? 'http://localhost:9090',
  realm: 'norman',
  clientId: 'risks-ui',
})

export default keycloak