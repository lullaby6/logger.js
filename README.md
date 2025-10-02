# Logger

Minimal logger with colors, timestamp, and stack trace.

![ss](https://raw.githubusercontent.com/lullaby6/logger.js/refs/heads/main/ss.png)

## Installation

### NPM

```bash
npm i @lullaby6/logger
```

```js
// CommonJS
const Logger = require("@lullaby6/logger");

// ES Modules
import Logger from "@lullaby6/logger";
```

### CDN

```html
<!-- UMD/Global -->
<script src="https://cdn.jsdelivr.net/gh/lullaby6/logger.js/logger.min.umd.js"></script>

<!-- Module -->
<script type="module">
	import Logger from "https://cdn.jsdelivr.net/gh/lullaby6/logger.js/logger.min.mjs.js";
</script>
```

### Download

<a href="https://cdn.jsdelivr.net/gh/lullaby6/logger.js/logger.min.umd.js" target="_blank">Click to download</a>

```html
<script src="/path/to/logger.min.umd.js"></script>
```

## Usage

```js
// Logs
Logger.log("Log");
Logger.info("Info");
Logger.warn("Warning");
Logger.error("Error");
Logger.success("Success");
Logger.debug("Debug");
Logger.trace("Trace");

// Disable timestamp
Logger.config.showTimestamp = false;

// Disable stack trace
Logger.config.showStackTrace = false;
```

## License

[MIT](https://github.com/lullaby6/logger.js/blob/main/LICENSE)
