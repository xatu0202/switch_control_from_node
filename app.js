import {
    Controls,
    Button,
    Hat
} from './controls.js'
const SerialPort = require('serialport');
const fs = require('fs');

const gamepadButtonComponent = {
    props: ['label', 'value', 'controls'],
    data: function () {
        return {
            checked: false
        }
    },
    methods: {
        handleKey: function (btn, checked) {
            if (checked) this.controls.pushButton(btn);
            else this.controls.releaseButton(btn);
        }
    },
    template: `<div><input type="checkbox" v-model="checked" v-on:change="handleKey(value, checked)">{{label}}</input></div>`
}
const bvm = new Vue({
    el: '#buttons',
    data: {
        controls: null
    },
    methods: {
        log: function (d) {
            console.log(d);
        }
    },
    components: {
        'gamepad-button': gamepadButtonComponent
    }
})
const dvm = new Vue({
    el: '#devconnect',
    data: {
        bd: new Buffer(1),
        selected: '',
        options: []
    },
    methods: {
        updateOptions: function () {
            fs.readdir('/dev/', (err, files) => {
                const list = files.filter(name => name.indexOf('cu.u') != -1).map(n => '/dev/' + n);
                this.options = list
            });
        },
        connectDevice: function () {
            if (this.selected) {
                this.port = new SerialPort(this.selected, {
                    baudRate: 115200
                });
                bvm.controls = new Controls(this.port);
            }
        }
    }
});

dvm.updateOptions();