import { app } from './app.js';
import { configuration } from './utils/configurations.js';
import { __prod__ } from './utils/constants.js';

const port = configuration.port;
app.listen(port, () => {
    console.log(`Server Started!`);
    if (!__prod__) {
        console.log(`**** VISIT: http://localhost:${port} ****`);
    }
});
