class Logger {
    static config = {
        showTimestamp: true,
        showStackTrace: true,
    };

    static #format(label, color, bg) {
        const styles = [`color: ${color}; background: ${bg};`];
        let format = `%c${label}`;

        if (this.config.showTimestamp) {
            const timestamp = new Date().toLocaleString();
            format += `%c ${timestamp}`;
            styles.push("color: gray;");
        }

        if (this.config.showStackTrace) {
            const origin = this.#getCaller();
            format += `%c ${origin}`;
            styles.push("color: orange; font-style: italic;");
        }

        return [format, ...styles];
    }

    static #getCaller() {
        const stack = new Error().stack?.split("\n");
        return stack?.[4]?.trim() || "unknown";
    }

    static error(...msg) {
        console.log(...this.#format('[ERROR]', 'white', 'red'), ...msg);
    }

    static warn(...msg) {
        console.log(...this.#format('[WARN]', 'black', 'yellow'), ...msg);
    }

    static info(...msg) {
        console.log(...this.#format('[INFO]', 'white', 'blue'), ...msg);
    }

    static success(...msg) {
        console.log(...this.#format('[SUCCESS]', 'white', 'green'), ...msg);
    }

    static debug(...msg) {
        console.log(...this.#format('[DEBUG]', 'black', 'lightgray'), ...msg);
    }

    static trace(...msg) {
        console.log(...this.#format('[TRACE]', 'purple', 'lavender'), ...msg);
    }
}

