export class Controls {
    constructor(port) {
        this.port = port;
    }
    sendByte(bdata) {
        let b = new Buffer.allocUnsafe(1);
        b[0] = bdata;
        this.port.drain();
        this.port.write(b);
    }
    setJoyStick(lx, ly, rx, ry) {
        this.sendByte(0x20);
        this.sendByte(lx);
        this.sendByte(ly);
        this.sendByte(rx);
        this.sendByte(ry);
    }
    pushButton(btn) {
        this.sendByte(Number(btn) + 0x80);
    }
    releaseButton(btn) {
        this.sendByte(Number(btn) + 0x40);
    }
    pushHat(hat) {
        this.sendByte(Number(hat) + 0x10);
    }
    releaseHat() {
        this.sendByte(0x00);
    }


}
export const Button = {
    "Y": 1,
    "B": 2,
    "A": 3,
    "X": 4,
    "L": 5,
    "R": 6,
    "ZL": 7,
    "ZR": 8,
    "MINUS": 9,
    "PLUS": 10,
    "LCLICK": 11,
    "RCLICK": 12,
    "HOME": 13,
    "CAPTURE": 14,
    "NOTHING": 15,
    "NOTHING2": 16
}
export const Hat = {
    "UP": 0,
    "UP_RIGHT": 1,
    "RIGHT": 2,
    "RIGHT_DOWN": 3,
    "DOWN": 4,
    "DOWN_LEFT": 5,
    "LEFT": 6,
    "LEFT_UP": 7,
    "CENTER": 8
}