const COMMANDS_DIR = '../commands';

module.exports = {
  'check-domains': {
      module: require(`${COMMANDS_DIR}/CheckDomains`),
      description: 'Check domains names which not deleted and save results to DB'
  },
  'check-servers': {
      module: require(`${COMMANDS_DIR}/CheckServers`),
      description: 'Check servers ips which not deleted and save results to DB'
  },
  'check-whois': {
      module: require(`${COMMANDS_DIR}/CheckWhois`),
      description: 'Check domains for adding date of registration, their nameservers  and save results to DB'
  }
};