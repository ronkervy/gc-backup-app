const usrProfile = process.env['USERPROFILE'];
const schema = {
   scheduleFormat: { type: 'array', items: { type: "object" }, default: [
      {
	 weekly : "0 16 */7 * *"
      },
      {
	 monthly: "0 16 */30 * *"
      },
      {
	 once_a_day: "0 16 * * *"
      }
   ]},
   schedule : { type: 'string', default: '0 16 */7 * *' },
   custom_sched: { type: 'string', default: '' },
   backupPath: { type: 'string', default: `${usrProfile}/Downloads` }
}

module.exports = schema;
