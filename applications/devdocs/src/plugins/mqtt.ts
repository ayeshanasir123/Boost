import { createPahoMqttPlugin } from 'vue-paho-mqtt';

const pahoMqttPlugin = createPahoMqttPlugin({
    PluginOptions: {
      autoConnect: true,
      showNotifications: false,
    },

    MqttOptions: {
      host: 'p-s01-mqtt-01.westbahr.net',
      port: 9001,
      useSSL: true,
      username: "nimpos",
      password: "Abcd9908K",
      clientId: `MyID-${Math.random() * 9999}`,
      mainTopic: 'qeeping'
    },
});

export default pahoMqttPlugin;