# Logger

Minimal logger with colors, timestamps, and source info.

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
<script src="https://cdn.jsdelivr.net/gh/lullaby6/logger.js/logger.min.umd.js"></script>
```

You can aslo import the Module format:

```html
<script type="module">
	import Logger from "https://cdn.jsdelivr.net/gh/lullaby6/logger.js/logger.min.mjs.js";
</script>
```

### Download

<a href="https://cdn.jsdelivr.net/gh/lullaby6/logger.js/logger.min.umd.js" target="_blank">Download</a> and include the downloaded file in your project:

```html
<script src="/path/to/logger.min.umd.js"></script>
```

## Usage

```js
// Logs
Logger.info("Info");
Logger.warn("Warning");
Logger.error("Error");
Logger.success("Success");
Logger.debug("Debug");
Logger.trace("Trace");

// Disable show timestamp
Logger.config.showTimestamp = false;

// Disable stack trace
Logger.config.showSource = false;
```

## License

MIT
