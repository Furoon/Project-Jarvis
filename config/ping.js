const pingConfig = {
  servers: [
    {
      ip: '192.168.178.116',
      hostname: 'AltbauHomy',
      online: false,
      ping: null,
      packetLoss: null,
      lastCheck: null
    },
    {
      ip: '192.168.178.48',
      hostname: 'FreeNas',
      online: false,
      ping: null,
      packetLoss: null,
      lastCheck: null
    },
    {
      ip: '192.168.178.59',
      hostname: 'DockerHost',
      online: false,
      ping: null,
      packetLoss: null,
      lastCheck: null
    },
    {
      ip: '192.168.178.78',
      hostname: 'Homy',
      online: false,
      ping: null,
      packetLoss: null,
      lastCheck: null
    },
    {
      ip: '192.168.178.108',
      hostname: 'OctoEnder',
      online: false,
      ping: null,
      packetLoss: null,
      lastCheck: null
    },
  ],
  timeout: "20",
  intervall: "900000"
};





module.exports = pingConfig;