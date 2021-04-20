/**
 *
 *            Server specific settings
 *
 * *************************************************
 * * WARNING! Secrets should be read from env-vars *
 * *************************************************
 *
 */
const { getEnv, devDefaults, unpackLDAPConfig } = require('kth-node-configuration')
const { typeConversion } = require('kth-node-configuration/lib/utils')
const { safeGet } = require('safe-utils')

// DEFAULT SETTINGS used for dev, if you want to override these for you local environment, use env-vars in .env
const devPort = devDefaults(3000)
const devSsl = devDefaults(false)
const devUrl = devDefaults('http://localhost:' + devPort)
const devSessionKey = devDefaults('inspect-web.sid')
const devSessionUseRedis = devDefaults(true)
const devOidcIssuerURL = devDefaults('https://login.ref.ug.kth.se/adfs')
const devOidcConfigurationURL = devDefaults(`${devOidcIssuerURL}/.well-known/openid-configuration`)
const devOidcTokenSecret = devDefaults('tokenSecretString')
const prefixPath = devDefaults('/inspect')
const devOidcCallbackURL = devDefaults(`http://localhost:3000${prefixPath}/auth/login/callback`)
const devOidcCallbackSilentURL = devDefaults(`http://localhost:3000${prefixPath}/auth/silent/callback`)
const devOidcLogoutCallbackURL = devDefaults(`http://localhost:3000${prefixPath}/auth/logout/callback`)
// END DEFAULT SETTINGS

// These options are fixed for this application

module.exports = {
  hostUrl: getEnv('SERVER_HOST_URL', devUrl),
  useSsl: safeGet(() => getEnv('SERVER_SSL', devSsl + '').toLowerCase() === 'true'),
  port: getEnv('SERVER_PORT', devPort),
  ssl: {
    // In development we don't have SSL feature enabled
    pfx: getEnv('SERVER_CERT_FILE', ''),
    passphrase: getEnv('SERVER_CERT_PASSPHRASE', ''),
  },

  // Authentication
  oidc: {
    configurationUrl: getEnv('OIDC_CONFIGURATION_URL', devDefaults(devOidcConfigurationURL)),
    clientId: getEnv('OIDC_APPLICATION_ID', null),
    clientSecret: getEnv('OIDC_CLIENT_SECRET', null),
    tokenSecret: getEnv('OIDC_TOKEN_SECRET', devDefaults(devOidcTokenSecret)),
    callbackLoginUrl: getEnv('OIDC_CALLBACK_URL', devDefaults(devOidcCallbackURL)),
    callbackSilentLoginUrl: getEnv('OIDC_CALLBACK_SILENT_URL', devDefaults(devOidcCallbackSilentURL)),
    callbackLogoutUrl: getEnv('OIDC_CALLBACK_LOGOUT_URL', devDefaults(devOidcLogoutCallbackURL)),
  },

  // Cortina
  blockApi: {
    blockUrl: getEnv('SERVER_HOST_URL', devDefaults('https://www-r.referens.sys.kth.se/cm/')), // Block API base URL
  },

  // Logging
  logging: {
    log: {
      level: getEnv('LOGGING_LEVEL', 'debug'),
    },
    accessLog: {
      useAccessLog: getEnv('LOGGING_ACCESS_LOG', true),
    },
  },
  clientLogging: {
    level: 'debug',
  },
  // cache: {
  //   cortinaBlock: {
  //     redis: unpackRedisConfig('REDIS_URI', devRedis),
  //   },
  // },

  // Session
  sessionSecret: getEnv('SESSION_SECRET', devDefaults('1234567890')),
  session: {
    key: getEnv('SESSION_KEY', devSessionKey),
    useRedis: safeGet(() => getEnv('SESSION_USE_REDIS', devSessionUseRedis) === 'true'),
    sessionOptions: {
      // do not set session secret here!!
      cookie: {
        secure: safeGet(() => getEnv('SESSION_SECURE_COOKIE', false) === 'true'),
      },
      proxy: safeGet(() => getEnv('SESSION_TRUST_PROXY', true) === 'true'),
    },
    //redisOptions: unpackRedisConfig('REDIS_URI', devRedis),
  },
}
