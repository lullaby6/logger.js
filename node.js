class Logger {
    static config = {
        showTimestamp: true,
        showStackTrace: true,
    };

    static #buffer = [];
    static #flushing = false;

    static #resetStyle = '\x1b[0m'

    static #styles = {
        error: { node: '\x1b[37;41m', browser: 'color: white; background: red;' },
        warn: { node: '\x1b[30;43m', browser: 'color: black; background: yellow;' },
        info: { node: '\x1b[37;44m', browser: 'color: white; background: blue;' },
        success: { node: '\x1b[37;42m', browser: 'color: white; background: green;' },
        debug: { node: '\x1b[30;47m', browser: 'color: black; background: lightgray;' },
        trace: { node: '\x1b[35;47m', browser: 'color: purple; background: lavender;' },
        timestamp: { node: '\x1b[90m', browser: 'color: gray;' },
        stack: { node: '\x1b[33m\x1b[3m', browser: 'color: orange; font-style: italic;' },
    };

    static #formatBrowser(type) {
        const label = `[${type.toUpperCase()}]`

        const styles = [];

        if (type in this.#styles) {
            styles.push(this.#styles[type].browser)
        }

        let format = `%c${label}`;

        if (this.config.showTimestamp) {
            const timestamp = new Date().toLocaleString();
            format += `%c ${timestamp}`;
            styles.push(this.#styles.timestamp.browser);
        }

        if (this.config.showStackTrace) {
            const origin = this.#getCaller();
            format += `%c ${origin}`;
            styles.push(this.#styles.stack.browser);
        }

        return [format, ...styles];
    }

    static #formatNode(type, msg) {
        const label = `[${type.toUpperCase()}]`

        const timestamp = this.config.showTimestamp ? new Date().toLocaleString() : '';
        const stack = this.config.showStackTrace ? this.#getCaller() : '';

        const parts = [
            `${this.#styles[type].node}${label}${this.#resetStyle}`,
            timestamp ? `${this.#styles.timestamp.node}${timestamp}${this.#resetStyle}` : '',
            stack ? `${this.#styles.stack.node}${stack}${this.#resetStyle}` : '',
        ];

        return `${parts.filter(Boolean).join(' ')} ${msg.join(' ')} \n`;
    }

    static #getCaller() {
        const stack = new Error().stack?.split("\n");
        return stack?.[4]?.trim() || "unknown";
    }

    static #flush() {
        this.#flushing = true;

        setImmediate(() => {
            while (this.#buffer.length) {
                const { type, msg } = this.#buffer.shift();
                process.stdout.write(this.#formatNode(type, msg));
            }

            this.#flushing = false;

            if (this.#buffer.length > 0) {
                this.#flush();
            }
        });
    }

    static #enqueueLog(type, msg) {
        this.#buffer.push({ type, msg });
        if (!this.#flushing) this.#flush();
    }

    static #log(type, msg) {
        if (typeof process !== 'undefined' && process.stdout?.write && typeof setImmediate === 'function') {
            this.#enqueueLog(type, msg)
        } else {
            console.log(...this.#formatBrowser(type), ...msg)
        }
    }

    static log(...msg) {
        this.#log('log', msg);
    }

    static error(...msg) {
        this.#log('error', msg);
    }

    static warn(...msg) {
        this.#log('warn', msg);
    }

    static info(...msg) {
        this.#log('info', msg);
    }

    static success(...msg) {
        this.#log('success', msg);
    }

    static debug(...msg) {
        this.#log('debug', msg);
    }

    static trace(...msg) {
        this.#log('trace', msg);
    }
}

