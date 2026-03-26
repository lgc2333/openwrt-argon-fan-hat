'use strict'
'require view'
'require form'
'require fs'
'require poll'

// @ts-ignore
return view.extend({
  load: function () {
    return Promise.all([
      fs.exec_direct('/sbin/logread', ['-e', 'argon_fan']).catch(function () {
        return ''
      }),
    ])
  },

  render: function (res) {
    var raw_log = res[0] || _('No log available.')
    var m, s, o

    m = new form.Map(
      'argon_fan',
      _('Argon Fan HAT Settings'),
      _(
        'Here you can configure the temperature thresholds, fan speeds, and view logs for your Argon Fan HAT.',
      ),
    )

    s = m.section(form.TypedSection, 'argon_fan', _('Temperature & Fan Speed Settings'))
    s.anonymous = true
    s.addremove = false

    s.tab('general', _('General Settings'))
    s.tab('log', _('Log'))

    o = s.taboption(
      'general',
      form.Value,
      'poll_interval',
      _('Polling Interval (s)'),
      _('How often to check the temperature (in seconds).'),
    )
    o.datatype = 'min(1)'
    o.default = '30'

    o = s.taboption(
      'general',
      form.Value,
      'cooldown_delay',
      _('Cooldown Delay (s)'),
      _(
        'Time to wait before allowing fan speed to drop.' +
          ' Set to 0 disables this function.' +
          ' Since the program only checks temperature at the fixed polling interval' +
          ', it is recommended to set this as a multiple of the polling interval.',
      ),
    )
    o.datatype = 'min(0)'
    o.default = '30'

    o = s.taboption(
      'general',
      form.Value,
      'temp_high',
      _('High Temperature (°C)'),
      _('Threshold for high fan speed.'),
    )
    o.datatype = 'uinteger'
    o.default = '65'

    o = s.taboption(
      'general',
      form.Value,
      'speed_high',
      _('High Speed (%)'),
      _('Speed when high temperature is reached (0-100).'),
    )
    o.datatype = 'range(0, 100)'
    o.default = '100'

    o = s.taboption(
      'general',
      form.Value,
      'temp_medium',
      _('Medium Temperature (°C)'),
      _('Threshold for medium fan speed.'),
    )
    o.datatype = 'uinteger'
    o.default = '60'

    o = s.taboption(
      'general',
      form.Value,
      'speed_medium',
      _('Medium Speed (%)'),
      _('Speed when medium temperature is reached (0-100).'),
    )
    o.datatype = 'range(0, 100)'
    o.default = '55'

    o = s.taboption(
      'general',
      form.Value,
      'temp_low',
      _('Low Temperature (°C)'),
      _('Threshold for low fan speed.'),
    )
    o.datatype = 'uinteger'
    o.default = '55'

    o = s.taboption(
      'general',
      form.Value,
      'speed_low',
      _('Low Speed (%)'),
      _('Speed when low temperature is reached (0-100).'),
    )
    o.datatype = 'range(0, 100)'
    o.default = '30'

    o = s.taboption(
      'general',
      form.Value,
      'speed_idle',
      _('Idle Speed (%)'),
      _('Speed when below low temperature threshold (0-100).'),
    )
    o.datatype = 'range(0, 100)'
    o.default = '0'

    // Log Tab
    o = s.taboption('log', form.DummyValue, '_log')
    o.rawhtml = true
    o.cfgvalue = function (section_id) {
      var escaped_log = String(raw_log)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')

      return (
        '<textarea id="argon_log_textarea" class="cbi-input-textarea' +
        ' readonly="readonly" wrap="off"' +
        ' style="width: 100%; height: 50vh; resize: none;' +
        ' font-family: monospace, sans-serif;">' +
        escaped_log +
        '</textarea>'
      )
    }

    poll.add(function () {
      return fs
        .exec_direct('/sbin/logread', ['-e', 'argon_fan'])
        .catch(function () {
          return ''
        })
        .then(function (log) {
          var tb = document.getElementById('argon_log_textarea')
          if (tb) {
            tb.value = log || _('No log available.')
          }
        })
    })

    return m.render()
  },
})
